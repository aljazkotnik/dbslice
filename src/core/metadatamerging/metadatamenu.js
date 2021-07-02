
// `metadatamenu' controls the merging menu and the error report. These are merged together to save space in hte main view. The output of the `metadatamenu' is the merging information.

// We want the metadata to update every time new metadataFiles are added. This manager knows what kind of files to expect, therefore the access to the library is passed in, and when it sees that the metadata files have been changed it updates itself.
import metadataFile from "../supportedfiles/metadataFile.js";

// Reacitvity components
import {makeObservable, observable, computed, autorun, action} from "mobx";

// External module to handle the interactions.
import metadatamergingui from "./metadatamergingui.js";
import errorreport from "./errorreport.js";


import {unique, html2element} from "../helpers.js";

// Import the css.
import {css} from "./mergingcss.js";


/* REMOVE FILE BUTTON!!
For a proper implementation hte users action should trigger the removal of the file from the library straight away. So maybe the event should be attached here? Because only this module has access to the library...

*/

/* CAN FILES WITH THE SAME NAME BUT IN DIFFERENT FOLDERS BE DRAGGED AND DROPPED IN??
If I drag the same file in two times it will have the same filename (duuuh), but a different blob url. What is the way to compare them then? Or just say that the requirement is that the files are named differently?
*/



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





// Make the datastore observe the metadata files loaded by the loader? And when it updates it should prompt the user. How do I introduce the user in here? With a button based action!


// The metadata can be introduced as a reference bject, and then an autorun can be implemented inside. Ok, so then implement the file loader first.


export default class metadatamenu {

	constructor(library){
		
		// The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.
		
		let obj = this;
		// obj.files = files;
		obj.library = library;
		
		
		// make the node that can be appended to the DOM.
		obj.node = html2element(template);
		obj.container = obj.node.querySelector("div.menu-body");
		
		
		// Make the modules that need access to the DOM.
		obj.merger = new metadatamergingui([]);
		obj.merginginfo = [];
		
		// But control hte button functionality from outside? Otherwise it's tricky to control the menu behavior.
		obj.merger.node.querySelector("button.submit").addEventListener("click", ()=>{ obj.submit() });
		
		obj.errorreport = new errorreport([]);
		
		
		// Add functionality to show/hide the error report.
		obj.node.querySelector("button.showerrorreport").addEventListener("click", ()=>{ obj.showerrorreport() });
		obj.errorreport.node.querySelector("button.submit").addEventListener("click", ()=>{ obj.hideerrorreport() });
		
		// Should it be controlled here??
		
		// Make the class observable.
		makeObservable(obj, {
			submit: action,
			removemetadatafile: action,
			merginginfo: observable,
			mergedmetadata: computed,
        })
		
		
		autorun(()=>{obj.showmerging()})
		
	} // constructor
	
	get errors(){
		// Get the errors from hte files. All the files are available anyway.
		let obj = this;
		return [];
	} // errors
	
	
	
	get mergedmetadata(){
		// How to make sure this evaluates to the same thing if another metadata file has been loaded, but not merged by the user? We don't want an intermediate plot update without any data. 
		
		// Ah, because it should focus on the change of the merging info, not the change of the metadata files. Maybe just check if all the files are represented in hte merging info.
		
		let obj = this;
		
		let info = obj.merginginfo;
		let files = obj.library.metadatafiles;
		
		// Only do the merging for variables that are declared for all the metadata files.
		let mergedfilenames = info.map(d=>d.filename);
		let availablefilenames = files.map(d=>d.filename);
		let userMergedAllAvailableFiles = availablefilenames.every( filename=>mergedfilenames.includes(filename) );
		
		
		if(userMergedAllAvailableFiles){
			
			
			// Collecting the variables. Check to see if htey're all the same type.
			let allaliases = unique( info.map(d=>d.alias) );
			
			
			// A variable must be created for each alias.
			let allvariables = allaliases.map(alias=>{
				// Each merge item connects a single variable from a single file to a single alias. A single alias may have many merge items associated with it. Create a single variable replacing it.
				
				let aliasmergeinfo = info.filter(d=>d.alias == alias);
				
				// The category selected is the same for all the aliasmergeinfo anyway.
				let category = aliasmergeinfo[0].category;
				
				let aliasdict = aliasmergeinfo.reduce((dict, merge)=>{
					dict[merge.filename] = merge.variable;
					return dict
				},{}) // reduce
				
				// Find the corresponding variables across the files.
				let variables = files.map(fileobj=>{
					return fileobj.content.variables.filter(variable=>variable.name == aliasdict[fileobj.filename])[0]
				}) // map
				
				
				// Find all types and categories that support the merged variables.
				let aliasvariable = variables.reduce((a,variable)=>{
					// It should keep the alias name.
					if(!a.name){
						a.name = alias;
					} // if
					
					if(a.supportedCategories){
						a.supportedCategories = a.supportedCategories.filter(cat=>variable.supportedCategories.includes(cat));
					} else {
						a.supportedCategories = variable.supportedCategories;
					} // if
					
					if(a.supportedTypes){
						a.supportedTypes = a.supportedTypes.filter(cat=>variable.supportedTypes.includes(cat));
					} else {
						a.supportedTypes = variable.supportedTypes;
					} // if
					
					
					return a
				}, {
					name: undefined,
					category: category,
					n: undefined,
					nunique: undefined,
					supportedCategories: undefined,
					supportedTypes: undefined
				});
				
				return aliasvariable;
				
			}) // map
			
		
			// Collecting the rows
			let alltasks = [];
			files.forEach(fileobj=>{
				
				// Collect all the merge information for this file.
				let fileinfo = info.filter(d=>d.filename == fileobj.filename);
				
				let filetasks = fileobj.content.data.map(task=>{
					
					// Collect all the merged variables of this task and recast them under their alias.
					return fileinfo.reduce((task_, merge)=>{
						task_[merge.alias] = task[merge.variable]
						return task_
					}, {})
					
				}) // map
				
				alltasks = alltasks.concat(filetasks)
			}) // forEach
			
			
			
			// Calculate all the number of unique values for the variables, and also the extents for ordinal variables.
			allvariables.forEach(variable=>{
				let vals = alltasks.map(row=>row[variable.name]);
				variable.n = vals.length;
				variable.nunique = unique(vals).length;
				
				// Add extents to any ordinal variables.
				if(variable.category == "ordinal"){
					variable.extent = d3.extent( vals );
				} // if
			}) // forEach
			
			return {
				data: alltasks,
				variables: allvariables
			}
		} else {
			return {
				data: [],
				variables: []
			}
		} // if
		
	} // mergedmetadata 
	
	
	
	
	submit(){
		// The submit is here so that the whole menu can be hidden after submit is clicked.
		let obj = this;
		
		obj.merginginfo = obj.merger.collectmerginginfo();
		
		
		obj.hide();
	} // submit
	
	
	removemetadatafile(filename){
		// This is a separate function so that it can be declared as a mobX action. 
		let obj = this;
		obj.library.removeByFilenames([filenameToRemove]);
		console.log("Remove file")
	} // removemetadatafile
	
	updatemetadataremoval(){
		// To remove a metadata file it needs to be removed from the library. The `metadatamenu' object is the one that has access to the library, therefore this happens here.
		let obj = this;
		
		
		obj.node.querySelectorAll("button.remove-file").forEach(button=>{
			button.addEventListener(event=>{
				let filenameToRemove = event.target.parentElement.attributes.filename.value;
				
				obj.removemetadatafile( filenameToRemove );
			}) // addEventListener
		}) // forEach
		
		
	} // updatemetadataremoval
	
	
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
		obj.merger.updatefiles( obj.library.metadatafiles );
		obj.hideerrorreport();
		obj.show();
		
		// It seems that this is called before the ui is updated... WHY??
		obj.updatemetadataremoval();
	} // showmergingui
	
		
} // metadatamanager
	