import {html2element} from "../core/helpers.js";

// Plots need to be draggable. The `dragnode' class expects that the whole of the input node can be used to initiate the drag. For plots only the plot header should allow the dragging. An alternate implementation could use `dragnode', but then block the propagation of events to the underlying div.
import dragnode from "../core/dragnode.js";


// Maybe when the user clicks on the close button it should update a flag, and the session manager should observe that.
import {makeObservable, observable, action} from "mobx";


/*
Create a uniform backbone for all crossfilter plots.

 - Interactive axis must allow switching from linear to log space.
 - Axis vriables must be interactively changeable.
 - Automatically pick the most interesting variables based on what is already on-screen? Maybe in such a way as to increase the diversity of visible data?
 
 Stick to camelCase!!

*/

// Maybe move the width and height from the CSS into here?
import {css} from "./components/css.js";



// Even if the actual drawing is on a canvas the axes will still be drawn on an svg. Maybe just place the svg in the background? How should the interaction to change the space look like? The variables on hte axis also need to be changeable.
let template = `
	<div style="${ css.card }">
		<div class="card-header" style="${css.cardHeader}">
			<h4 class="card-title" spellcheck="false" contenteditable="true" style="${css.plotTitle}">This is a new plot.</h4>
			
			<button class="close" style="${css.btn + css.btnDanger}">x</button>
		</div>
		
		<div class="card-body">
		
		</div>
	</div>
`; // template



export default class dbsliceCrossfilterPlot extends dragnode {
	constructor(configobj){
		/*
		- Should have access to the current crossfilter selection.
		- Access to the `variables' array.
		- Access to a uniform `color' object for coordination.
		
		To instantiate the template should be converted to node, the basic interactivity should be added.
		
		Ah, how should the drag work? It should work only when the header is grabbed. This allows other drag-and-drop gestures to be performed on hte plot, e.g. panning.
		
		The link between node and data should be maintained -> when I click on the remove plot it will need access to the background object to allow it to be removed from storage. Have a `isDeleted' flag to allow the `sessionManager' to remove unnecessary plots?
		
		The filtering interactions will also need to be mobx actions. The actions can then only be stored on the object itself. The `sessionManager' will have to listen to those objects at specific points (`filterSelection'?) and transfer that to the actual filter object. It should also transfer information from the filter to the plots - if we have two plots of the same variable, and the filter is updated by one the other should update also, right?
		
		Offspring classes will have to limit the variables they can plot. So the next level will be `dbsliceCategoricalPlot`, `dbsliceOrdinalPlot`, and `dbsliceOnDemandPlot`.
		
		For `dbsliceOnDemandPlot` a special data access functionality should be created - maybe we can get rid of relying on a button if the data is loaded in sequence. That should throttle the loading and maintain interactiveness.
		*/
		
		// Instantiate a completely new element.
		let wrapper = html2element(template);
		
		// The dragging should only be available through the header.
		super( wrapper, wrapper.querySelector("div.card-header") );
		let obj = this;
		
		
		// Title editing.	
		obj.titleElement.addEventListener("mousedown", evnt=>{evnt.stopPropagation()});
		
		
		// Flag to let a session manager know whether to keep this in the collection or not. It's possible that is the plots are chained together (as in Alistairs application), that subsequent plots will either have to be updated (maybe just to show that an input is missing - maybe by coloring hte axis label red?)
		obj.active = true;
		
		// Removal.
		obj.node.querySelector("button.close").addEventListener("click", ()=>{ obj.remove(); })
		
		
		
		
		// Setup with the user provided inputs.
		obj.config = configobj;
		
	
	
		
		// Declare the mobx observable stuff. active must be observable, and remove must be an action. Nothing else is requried here I think.
		makeObservable(obj, {
			active: observable,
			remove: action
		})
		
	} // constructor
	
	
	
	remove(){
		let obj = this;
		obj.active = false;
	} // remove
	
	
	get titleElement(){
		return this.node.querySelector("h4.card-title");
	} // titleElement
	
	set config(configobj){
		let obj = this;
		if(configobj){
			if( typeof( configobj.title ) == "string" ){
				obj.titleElement.innerText = configobj.title;
			} // if
		} // if
		
	} // config
	
	
	get config(){
		let obj = this;
		/*
			plot type
			title
			variables selected - not defined here!
		*/
		
		return {
			plottype: obj.constructor.name,
			title: obj.titleElement.innerText
		}
	} // config
	
}; // dbsliceCrossfilterPlot







