import { unique } from "../helpers.js";

// Superclass
import filelibrary from "./filelibrary.js";

// File types that the library focuses on handling. `metadataFile' is needed so that an array containing all metadata files can be a mobx `computed' variable. `userFile' is needed to handle drag & drop events.
import userFile from "../supportedfiles/userFile.js";
import metadataFile from "../supportedfiles/metadataFile.js";


// Extend that library here so that it can also handle the drag-dropped events.

export default class dbslicefilelibrary extends filelibrary {
	constructor(){
		super()
	} // constructor
	
	
	updateactive(filenames){
		let obj = this;
		
		// Always keep the metadata files available.
		
		let allMetadataFilenames = obj.retrieveByClass(metadataFile).map(fileobj=>fileobj.filename);
		
		obj.required = allMetadataFilenames.concat( unique(filenames) );
		
	} // updateactive
	
	
	dragdropped(files){
		// Several files may have been dragged and dropped, and they may be of several types (metadata, session).
		let obj = this;		
		
		files.forEach(file=>{
			obj.single(userFile, file, "drag & drop")
		}) // forEach
		
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
	
} // dbslicefilelibrary