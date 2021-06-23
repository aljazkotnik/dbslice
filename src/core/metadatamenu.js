
// `metadatamenu' controls the merging menu and the error report. These are merged together to save space in hte main view. The output of the `metadatamenu' is the merging information.

// We want the metadata to update every time new metadataFiles are added. This manager knows what kind of files to expect, therefore the access to the library is passed in, and when it sees that the metadata files have been changed it updates itself.
import metadataFile from "./supportedfiles/metadataFile.js"

// Reacitvity components
import {makeObservable, observable, computed, autorun, action} from "mobx";



// External module to handle the filtering.
import metadatamerger from "./metadatamerger.js";
import errorreport from "./errorreport.js";







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
	padding: 4px;
  `,
  
  cardTitle: `
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 40px;
  `
} // css





var template = `
<div style="${ css.fullscreenContainer }">
  
  <div style="${ css.cardTitle }">
	<button class="showerrorreport" style="${ css.btn + "float: right;" }">
	  <i class="fa fa-exclamation-triangle"></i>
	</button>
  </div>
  
  <div class="menu-body">
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


export default class metadatamenu {

	constructor(files){
		
		// The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.
		
		let obj = this;
		obj.files = files;
		
		
		
		
		// make the node that can be appended to the DOM.
		obj.node = html2element(template);
		obj.container = obj.node.querySelector("div.menu-body");
		
		
		// Make the modules that need access to the DOM.
		obj.merger = new metadatamerger([]);
		
		
		// But control hte button functionality from outside? Otherwise it's tricky to control the menu behavior.
		obj.merger.node.querySelector("button.submit").addEventListener("click", ()=>{ obj.submit() });
		
		obj.errorreport = new errorreport([]);
		
		
		// Add functionality to show/hide the error report.
		obj.node.querySelector("button.showerrorreport").addEventListener("click", ()=>{ obj.showerrorreport() });
		obj.errorreport.node.querySelector("button.submit").addEventListener("click", ()=>{ obj.hideerrorreport() });
		
		// Should it be controlled here??
		
		// Make the class observable.
		makeObservable(obj, {
			metadatafiles: computed,
			submit: action
        })
		
		
		autorun(()=>{obj.showmerging()})
		
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
	
	
	
	
	
	
	submit(){
		// The user has confirmed the metadata merging. Now collect the merging info, create teh metadata, and update the crossfilter. Hide the merging UI.
		let obj = this;
		
		let merginginfo = obj.merger.collectmerginginfo();
		console.log("Merge and update metadata", merginginfo);
		
		obj.hide();
	} // submit
	
	
	// Show hide the entire menu.
	show(){
		// Show when the metadata files change - new data was loaded. This should work on autorun too no? Most importantly, it should work on a button press.
		let obj = this;
		obj.node.style.display = "";
	} // show
	
	hide(){
		let obj = this;
		obj.node.style.display = "none";
	} // 
	
	
	// Show individual menu modules.
	showerrorreport(){
		// Toggle from the metadata merging to the error report.
		let obj = this;
		if( obj.container.firstElementChild == obj.merger.node ){
			obj.container.removeChild( obj.merger.node );
		} // if
		obj.container.appendChild( obj.errorreport.node );
	} // showerrorreport
	
	hideerrorreport(){
		// Toggle from the metadata merging to the error report.
		let obj = this;
		if( obj.container.firstElementChild == obj.errorreport.node ){
			obj.container.removeChild( obj.errorreport.node );
		} // if
		obj.container.appendChild( obj.merger.node );
	} // hideerrorreport
	
	// It does go into showmerging. Why does that one not update itself accordingly?? Maybe it can be untangled a bit?
	showmerging(){
		let obj = this;
		obj.merger.updatefiles( obj.metadatafiles );
		obj.hideerrorreport();
		obj.show();
	} // showmergingui
	
		
} // metadatamanager
	