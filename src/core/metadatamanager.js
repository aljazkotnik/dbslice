// General helpers
import {setDifference, unique} from "./helpers.js";

// Crossfilter accelerates array queries.
import crossfilter from "crossfilter";



// We want the metadata to update every time new metadataFiles are added. This manager knows what kind of files to expect, therefore the access to the library is passed in, and when it sees that the metadata files have been changed it updates itself.
import metadataFile from "./supportedfiles/metadataFile.js"

// Reacitvity components
import {makeObservable, observable, computed, autorun, action} from "mobx";


// Turn cfDataManager into a class. Make it reactive if needed. Make sure it uses the devDependency of crossfilter.


/* ARCHITECTURE CHANGE

import {sessionManager} from "./sessionManager.js";
import {color} from "./color.js";

// On cfChange the color options and the user interface need to be changed.
color.settings.options = dbsliceData.data.categoricalProperties
sessionManager.resolve.ui.dataAndSessionChange()

*/


// WORK IN PROGRESS

/* 1.) DIMENSION MANAGEMENT

How to handle the creation of dimensions? Maybe we should think about the pruning of values? For example: remove all variables that are the same for all of the entries?

*/


/* 2.) DATA FLOW 

	How should the data enter? The loading files should be taken care of by the library, the metadata combining by a combiner, and the data manipulations by the data holder.
	
	Metadata flow is: loader -> combiner -> datastore -> plots
	On-demand flow is: loader -> plots
	
	
	How will reactive plots access their data? How will plots in general access their data? For metadata this could be simple, the current selection could just be a computed value, and all other plots would just observe it. How do I pass in an observed value?
	
	How would on-demand plots get their data? Would they observe the storage to see if the loaded files match what they need? And maybe then they would draw one item at a time? Maybe experiment with this.
	
	
	Throttling the loading of the on-demand data to ensure interactivity. Instead of having the button let dbslice load the on-demand data needed on the fly (the library helps here enormously!), but only if there is sufficient time to do it.

*/




/* 3.) HANDLING DATETIME DATA */



/* 4.) INCLUDE THE FILTERING */



// Make the datastore observe the metadata files loaded by the loader? And when it updates it should prompt the user. How do I introduce the user in here? With a button based action!


// The metadata can be introduced as a reference bject, and then an autorun can be implemented inside. Ok, so then implement the file loader first.


export default class metadatamanager {

	constructor(files){
		
		// The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.
		
		
		let obj = this;
		
		obj.files = files;
		
		
		// This is a mix of the crossfilter, it's dimensions, and some metadata about the metadata in the crossfilter. Untangle?
		let cf = crossfilter([])
		
		
		// Maybe this should be a separate state to control itself? It could be a helper class within here? So that it controls the filtering etc, there will be another class for user interactions.
		obj.data = {
			
			// Metadata about metadata.
			categoricalProperties: [],
			ordinalProperties: [],
			line2dProperties: [],
			contour2dProperties: [],
			
			
			// Crossfilter and the associated dimensions.
			cf: cf,
			categoricalDims: {},
			ordinalDims: {},
			taskDim : cf.dimension(d=>d.taskId),
			fileDim : cf.dimension(d=>d.filenameId),
			
			// Filters.
			filterSelected: [],
			histogramSelectedRanges: [],
			manuallySelectedTasks: [],
			
			// Precomputed values.
			categoricalUniqueValues: {},
		
		}; // cfData
		

		// Merging progressively stores the users inputs on how to merge the metadata.
		obj.merging = {}; 
		
		
		
		
		// Make the class observable.
		makeObservable(obj, {
			metadatafiles: computed
        })
		
		
		
	} // constructor
	
	
	
	
	// Well, the metadata manager shouldn't update everytime the files update. But I guess this will update it every time. Will the observable down the line change if this computes the same state? I think so no?
	get metadatafiles(){
		let obj = this;
		
		// Find all correctly loaded metadata files.
		let valid = obj.files.filter( fileobj => { return fileobj instanceof metadataFile })
		// let valid = obj.files.filter( fileobj => true)
		return valid
	} // metadatafiles
	
	
	
	// Now every time the metadata files change we should call the UI, merge the metadata, and then continue.
	
	

	// This should be an action somehow no?
	// cfChange -> swapdata
	swapdata(metadata){
		// Handle the change to the metadata. Simply exchange all the internal data. But, I may need to retain the filter settings?
		let cf = this.data.cf;
		
		// Exchange the data.
		cf.remove()
		cf.add(metadata.data)
		
		// Resolve the differences between the old variables and the new variables.
		this.#resolveHeaderChange(metadata.header)
		// cfDataManager.resolve.cfData.headerChange(metadata.header)
		
		
	} // swapdata
	
	
	// Identify this as a private method to see if babel works.
	#resolveHeaderChange(newHeader){
		// `resolveHeaderChange' updates the data storage to match the provided `newHeader'. Only the properties of `newHeader' that are congruent with the data storage are changed, and others are ignored.
		
		let obj = this;
		
		// cfData -> data
		let data = this.data;
		
	
		
		// Go through the new header. The changes require also the crossfilter dimensions to be adjusted.
		Object.keys(newHeader).forEach(function(key){
			
			// Find the differences for this category that need to be resolved. 'diff' has items aMinusB (in current, but not in new) and bMinusA ( in new, but not in current)
			let diff = setDifference(data[key], newHeader[key])
			
			switch(key){
				case "categoricalProperties":
				  
					// Dimensions first
					obj.#resolveDimensions(data.categoricalDims, diff)
				  
					// Metadata dimensions have precomputed unique values. Create these ones for new variables, and delete any unnecessary ones.
					obj.#resolveUniqueValues(data.categoricalUniqueValues, diff)
				  break;
				
				case "ordinalProperties":
				
					// Dimensions first
					obj.#resolveDimensions(data.ordinalDims, diff)
				  
					// Data dimensions have corresponding histogram ranges. Delete unnecessary ones, and create necessary ones.
					obj.#resolveHistogramRanges(data.histogramSelectedRanges, diff)
				  break;
				  
				  
				// Nothing apart from the default change of the options in the header needs to be done.
				case "line2dProperties":
				case "contour2dProperties":
				  break;
				
			} // switch
			
			// Resolve the header.
			data[key] = newHeader[key]
			
		}) // forEach
		
		
		
		
		
	} // resolveHeaderChange
	
	
	

	
	
	#resolveDimensions(dims, diff){
		// `resolveDimensions' takes in an object `dims' that contains crossfilter dimensions, and updates it using the difference information supplied by an object `diff'.
		let cf = this.data.cf;
		
		// Those in A, but not in B, must have their cf dimensions removed.
		diff.aMinusB.forEach(function(varName){
		  delete dims[varName]
		}) // forEach
	  
		// Those in B, but not in A, must have cf dimensions created.
		diff.bMinusA.forEach(function(varName){
		  dims[varName] = cf.dimension(function (d){return d[varName];})
		}) // forEach
		
	} // resolveDimensions
	
	
	#resolveUniqueValues(vals, diff){
		let obj = this;
		
		obj.#resolveAttributes(vals, diff, function (varName){
			// Find all the unique values for a particular variable.
			return unique( 
			  obj.data.cf.all().map(function(d){return d[varName]})
			); // unique
		}) // resolveAttributes
		
	} // resolveUniqueValues
	
	#resolveHistogramRanges(vals, diff){
		let obj = this;
		
		obj.#resolveAttributes(vals, diff, function (varName){
			// Find the max range for the histogram.
			let tasks = dbsliceData.data.cf.all()
			return d3.extent(tasks, d=>d[varName])
		}) // resolveAttributes
		
	} // resolveHistogramRanges
	
	#resolveAttributes(vals, diff, populate){
		// Vals is an object of attributes that  needs to be resolved. The resolution of the attributes is given by diff. Populate is a function that states how that attribute should be populated if it's being created, and is passed in as it may need to be used multiple times.
				
		// Delete
		diff.aMinusB.forEach(function(varName){
			delete vals[varName]
		})
		
		// Variables that are in 'new', but not in 'old'.
		diff.bMinusA.forEach(function(varName){
			// If a populate function is defined, then create an entry, otherwise create an empty one.
			if(populate){
				vals[varName] = populate(varName)	
			} else {
				vals[varName] = []
			} // if
		})
		
		
	} // resolveAttributes
		
} // metadatamanager
	