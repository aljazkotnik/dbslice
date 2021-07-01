import {makeObservable, computed} from "mobx";

import { unique } from "../helpers.js";

// Superclass
import fileLibrary from "./fileLibrary.js";

// File types that the library focuses on handling. `metadataFile' is needed so that an array containing all metadata files can be a mobx `computed' variable. `userFile' is needed to handle drag & drop events.
import userFile from "../supportedfiles/userFile.js";
import metadataFile from "../supportedfiles/metadataFile.js";


// Extend that library here so that it can also handle the drag-dropped events.

export default class dbsliceFileLibrary extends fileLibrary {
	constructor(){
		super()
		let obj = this;
		
		makeObservable(obj, {
			metadatafiles: computed
		})
	} // constructor
	
	// Is it because the reference to the computation is not the same as invoking the computation on hte prototype object?
	get metadatafiles(){
		let obj = this;
		return obj.retrieveByClass(metadataFile);
	} // metadatafiles
	
	
	updateactive(filenames){
		let obj = this;
		
		// Always keep the metadata files available.
		
		let allMetadataFilenames = obj.metadatafiles.map(fileobj=>fileobj.filename);
		
		obj.required = allMetadataFilenames.concat( unique(filenames) );
		
	} // updateactive
	
	
	dragdropped(files){
		// Several files may have been dragged and dropped, and they may be of several types (metadata, session).
		let obj = this;		
		
		let promises = files.map(file=>{
			return obj.single(userFile, file, "drag & drop");
		}) // forEach
		
		return promises
		
	} // dragdropped
	
	ondrop(ev){
		let obj = this;
					
		// Prevent default behavior (Prevent file from being opened)
		  ev.preventDefault();

		  var files = []
		  if (ev.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			  // If dropped items aren't files, reject them
			  if (ev.dataTransfer.items[i].kind === 'file') {
				files.push( ev.dataTransfer.items[i].getAsFile() );
			  } // if
			} // for
			
			
			
		  } else {
			// Use DataTransfer interface to access the file(s)
			files = ev.dataTransfer.files
		  } // if
		  
		  obj.dragdropped(files); 
	} // ondrop
	
	ondragover(ev){	
		// Prevent default behavior (Prevent file from being opened)
		ev.preventDefault();
	} // ondragover
	
} // dbsliceFileLibrary