// When implementing new file types, they have to have a separate file (which consists practically only of the testing procedures), and be entered here to be considered during the testing of the metadata variables.



// Superclass
import dbsliceFile from "./dbsliceFile.js";

// Testing options.
import line2dFile from "./line2dFile.js";
import contour2dFile from "./contour2dFile.js";




export default class onDemandFile extends dbsliceFile {
		
	onload(obj){
		
		// During the data formatting the format of the file is determined already. Here just report it onwards.
		return obj
		
	} // onload
	
	format(obj){
		// Here try all different ways to format the data. If the formatting succeeds, then check if the contents are fine.
		
		let availableFileClasses = [line2dFile, contour2dFile]
		
		// Here just try to fit the data into all hte supported data formats, and see what works.
		
		var format
		availableFileClasses.every(function(fileClass){
			try {
				// The structure test will throw an error if the content cannot be handled correctly.
				dbsliceFile.test.structure(fileClass, obj.content)
				
				// This file class can handle the data.
				format = fileClass.name
			} catch {
				return true
			} // if
		})
			
			
		// Output the object, but add it's format to the name.
		if( format ){
			obj.content.format = format
			return obj
		} else {
			throw( new Error( "InvalidFile: Unsupported data structure" ))
		} // if
			
		
	} // format
	
  
	static test = {
		
		content: function(){
			// Any content that can be loaded and passes through the format testing is a valid on-demand file.
			return true
		}, // content
		
	} // test
  
} // onDemandFile
