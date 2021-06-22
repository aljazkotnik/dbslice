


// We want the metadata to update every time new metadataFiles are added. This manager knows what kind of files to expect, therefore the access to the library is passed in, and when it sees that the metadata files have been changed it updates itself.
import metadataFile from "./supportedfiles/metadataFile.js"

// Reacitvity components
import {makeObservable, observable, computed, autorun, action} from "mobx";



// External module to handle the filtering.
import filtermanager from "./filtermanager.js";
import metadatamerger from "./metadatamerger.js";
import errorreport from "./errorreport.js";


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




let css = {
	
  btn: `
	  border: none;
	  border-radius: 12px;
	  text-align: center;
	  text-decoration: none;
	  display: inline-block;
	  font-size: 20px;
	  margin: 4px 2px;
	  cursor: pointer;
  `,
	
  fullscreenContainer: `
	  position: fixed;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  background: rgba(90, 90, 90, 0.5);
  `,
  
  card: `
	  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	  transition: 0.3s;
	  border-radius: 5px;
	  background-color: gainsboro;
	  width: 80%;
	  max-height: 90%;
	  margin-left: auto;
	  margin-right: auto;
	  margin-top: 40px;
	  padding: 4px;
  `
} // css





var template = `
<div style="${ css.fullscreenContainer }">
  <div class="menu-card" style="${ css.card }">
  
    
	<div class="menu-header">
	  <h2 style="display: inline;">Metadata merging:</h2>
	
	  <button class="toggle" style="${ css.btn + "float: right;" }">
		<i class="fa fa-exclamation-triangle"></i>
	  </button>
	</div>
	
	
	<div class="menu-body"><div>
	
  </div>
</div>
`;


function html2element(html){
	let template = document.createElement('template'); 
	template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return template.content.firstChild;
} // html2element




// Make the datastore observe the metadata files loaded by the loader? And when it updates it should prompt the user. How do I introduce the user in here? With a button based action!


// The metadata can be introduced as a reference bject, and then an autorun can be implemented inside. Ok, so then implement the file loader first.


export default class metadatamanager {

	constructor(files){
		
		// The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.
		
		let obj = this;
		obj.files = files;
		
		// Make the class observable.
		makeObservable(obj, {
			metadatafiles: computed
        })
		
		
		// make the node that can be appended to the DOM.
		obj.node = html2element(template);
		let container = obj.node.querySelector("div.menu-body");
		
		// Make the modules that need access to the DOM.
		obj.merger = new metadatamerger([]);
		container.appendChild(obj.merger.node);
		
		console.log(obj.merger)
		
		obj.errorreport = new errorreport( obj.errors );
		
		
		
		// Should it be controlled here??
		
		
		autorun(()=>{obj.update()})
		autorun(()=>{obj.show()})
		
	} // constructor
	
	
	
	
	// Well, the metadata manager shouldn't update everytime the files update. But I guess this will update it every time. Will the observable down the line change if this computes the same state? I think so no?
	get metadatafiles(){
		let obj = this;
		
		// Find all correctly loaded metadata files.
		let valid = obj.files.filter( fileobj => { return fileobj instanceof metadataFile })
		
		return valid
	} // metadatafiles
	
	
	get errors(){
		// Get the errors from hte files. All the files are available anyway.
		let obj = this;
		return [];
	} // errors
	
	
	// When the metadata changes the merging UI should be called, and after the user clicks it the filtermanager should be updated.
	update(){
		let obj = this;
		
		// This should ONLY run when the merge info changes.
		
		
		
		// How to control the switch between the merging and the error reports? Always have the button available? But how can I just swap the contents in and out then? Turn hte button on and off? And switch the titles in here?
		
		console.log("Use merging info to create metadata and update crossfilter", obj.merger.merginginfo)
		
		
		
		// Hide the menu.
		obj.hide()
		
	} // update
	
	
	show(){
		// Show when the metadata files change - new data was loaded. This should work on autorun too no? Most importantly, it should work on a button press.
		let obj = this;
		
		
		obj.merger.updatefiles( obj.metadatafiles );
		
		
		obj.node.style.display = "";
	} // show
	
	hide(){
		let obj = this;
		obj.node.style.display = "none";
	} // 
	
	
	
		
} // metadatamanager
	