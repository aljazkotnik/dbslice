// General helpers.
import {unique} from "./helpers.js";

// Crossfilter accelerates array queries.
import crossfilter from "crossfilter";


// Reacitvity components
import {makeObservable, observable, computed, autorun, action} from "mobx";





// This class handles all the filtering management that is required.

// It should also update itself if the required filters change. The session object will interact with it.


// The session manager will tell it which variables are still used in order to update the filters and so on.

export default class filtermanager {
	
	
	_categorical = []
	_ordinal = []

	constructor(){
		
		// The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.
		
		
		let obj = this;
		
		
		
		// This is a mix of the crossfilter, it's dimensions, and some metadata about the metadata in the crossfilter. Untangle?
		obj.cf = crossfilter([])
			
		// Crossfilter and the associated dimensions.
		obj.categoricalDims = {},
		obj.ordinalDims = {},
		obj.taskDim = obj.cf.dimension(d=>d.taskId),
		
		// Filters - these will have to be observable
		obj.categoricalFilter = {},
		obj.ordinalFilter = {},
		obj.manualFilter = [],
		

		

		// Make a computed state with the current selection.
				
		
		// Variables that are currently active - prescribed by the session.Should have getter and setter then.
		obj.active = [];
		
		
		
		
		makeObservable(obj, {
			_categorical: observable,
			_ordinal: observable,
			swapdata: action,
			activate: action,
			categoricalUniqueValues: computed,
			ordinalRanges: computed
		})
		
		
		
		autorun(()=>{obj.update()})
		
	} // constructor
	
	
	
	// MAKE THE INTERNAL STORAGE PRIVATE UNDER A NEW NAME?
	set categorical(properties){
		let obj = this;
		if(properties){
			obj._categorical = properties;
		} // if
	} // categoricalProperties
	
	get categorical(){
		return this._categorical
	} // categoricalProperties
	
	set ordinal(properties){
		let obj = this;
		if(properties){
			obj._ordinal = properties;
		} // if
	} // ordinalProperties
	
	get ordinal(){
		return this._ordinal
	} // ordinalProperties

	// This should be an action somehow - only set the raw metadata somewhere, and then let the computed state be made based on that.
	swapdata(metadata){
		// Handle the change to the metadata. Simply exchange all the internal data. But, I may need to retain the filter settings?
		
		// Exchange the data.
		this.cf.remove()
		this.cf.add(metadata.data)
		
		// Resolve the differences between the old variables and the new variables.
		
		this.categorical = metadata.header.categorical;
		this.ordinal = metadata.header.ordinal;
		
	} // swapdata
	
	
	// When plots are being deleted the session manager should be able to just give a list of active variables to the filtermanager, and it should figure out which dimensions to keep, and which to remove. Dimensions should be kept long term, therefore autorun should be used to update them instead of thm being computed.
	
	
	
	
	// Should be an action from outside - if the user creates a plot which allows filtering it will need a dimension. It's the responsibility of the session to state what is still active, and what isn't.
	activate(variables){
		// Check what kind of dimension can be created, and then make it.
		let obj = this;
		obj.active = variables;
	} // activate
	
	

	update(){
		// The dimensions are supposed to persist and therefore cannot be a computed value. Instead they should be updated in an autorun that fires anytime either the `header', or `active' is changed.
		let obj = this;
		
		// Update dimensions.
		obj.#resolveDimensions(obj.categorical, obj.categoricalDims)
		obj.#resolveDimensions(obj.ordinal, obj.ordinalDims)
		
	} // update
	
	#resolveDimensions(variables, dimensions){
		// `resolveDimensions' takes in an array of variable names `variables', and creates/keeps a crossfilter dimension for all active variables, while deleting non-active dimensions.
		let obj = this;
		
		variables.forEach(variable => {
			if( obj.active.includes(variable) ){
				// Dimension is needed. If it doesn't yet exist make it.
				if( !dimensions[variable] ){
					dimensions[variable] = obj.cf.dimension(d=>d[variable])
				} // if
			} else {
				// Variable is not active, therefore delete it.
				delete dimensions[variable];
			} // if
		}) // forEach
		
		
	} // #resolveDimensions
	
	
	
	// unique categorical values and ordinal number ranges should be computed - every time the data is changed. These are constant afterwards anyway.
	
	// Use computed for the unique values and ordinal ranges. They depend on hte header information, as that defines what can be accessed.
	get categoricalUniqueValues(){
		let obj = this;
		
		return obj.#calculateVariableProperty( obj.categorical, unique )
		
	} // categoricalUniqueValues
	

	get ordinalRanges(){
		let obj = this;
		
		return obj.#calculateVariableProperty( obj.ordinal, d3.extent )
	} // ordinalRanges
	
	
	#calculateVariableProperty(variables, reducer){
		// `calculateVariableProperties' takes an array of variable names `properties', and calculates a value for each by applying the `reducer' function to an array of values for that variable in hte crossfilter.
		let obj = this;
		
		let alltasks = obj.cf.all();
		
		return variables.reduce((a, variable) => {
			a[variable] = reducer( alltasks.map(task => task[variable]) );
			return a
		}, {})
		
	} // calculateVariableProperties

		
} // metadatamanager