
// Loading framework.
import dbsliceFile from "./dbsliceFile.js";

// File types to mutate to:
import metadataFile from "./metadataFile.js";
import sessionFile from "./sessionFile.js";

// `userFile' supports the drag-and-drop functionality. The app has no way of knowing up-fron whether the dropped file is a metadata file or a session configuration file. It can test it to see which type it is, but for that the file needs to be loaded already. The `userFile' provides the initial loading infrastructure and the testing framework to identify the file types, and mutate the loaded files to the appropriate formats.

export class userFile extends dbsliceFile {
		
	onload(obj){
		
		// Mutate onload.
		var mutatedobj
		switch(obj.content.format){
			case "metadataFile":
				// Not easy to mutate, as the format of the content may not be correct.
				mutatedobj = new metadataFile(obj)
				
				mutatedobj.content = obj.content
				mutatedobj.promise = obj.promise
				
				// Also need to classify...
				mutatedobj = mutatedobj.classify.all(mutatedobj)
				
			  break;
			case "sessionFile":
				// Return the contents as they are.
				mutatedobj = new sessionFile(obj)
				
				mutatedobj.content = obj.content
				mutatedobj.promise = obj.promise
				
			  break;
		  } // switch
		
		return mutatedobj
		
	} // onload
	
	format(obj){
		// Here try all different ways to format the data. If the formatting succeeds, then check if the contents are fine.
		
		// SHOULD ALSO ACCEPT SESSION FILES.
		
		let availableFileClasses = [metadataFile, sessionFile]
		
		// Here just try to fit the data into all hte supported data formats, and see what works.
		
		var content_
		availableFileClasses.every(function(fileClass){
			try {
				// The structure test will throw an error if the content cannot be handled correctly.
				content_ = dbsliceFile.test.structure(fileClass, obj.content)
				
				// This file class can handle the data.
				content_.format = fileClass.name
			} catch {
				return true
			} // if
		})
			
			
		// Output the object, but add it's format to the name.
		if( content_.format ){
			obj.content = content_
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
	
	mutateToMetadata(obj){
		
		let mutatedobj = new metadataFile(obj)
		
		
		// Refactor the 
		
	} // mutateToMetadata
  
} // userFile
