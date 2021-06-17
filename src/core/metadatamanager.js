


// We want the metadata to update every time new metadataFiles are added. This manager knows what kind of files to expect, therefore the access to the library is passed in, and when it sees that the metadata files have been changed it updates itself.
import metadataFile from "./supportedfiles/metadataFile.js"

// Reacitvity components
import {makeObservable, observable, computed, autorun, action} from "mobx";



// External module to handle the filtering.
import filtermanager from "./filtermanager.js";



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
		
		
		obj.filter = new filtermanager();
		

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
		return valid
	} // metadatafiles
	
	
	
	// When the metadata changes the merging UI should be called, and after the user clicks it the filtermanager should be updated.
	update(){
		
		
		
		
		
	} // update
	
	
	
		
} // metadatamanager
	