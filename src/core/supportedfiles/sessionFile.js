

import dbsliceFile from "./dbsliceFile.js";
import {arrayIncludesAll} from "../helpers.js"


// This one is capable of loading in just about anything, but it's also not getting stored internally.
export default class sessionFile extends dbsliceFile {
		
		
	format(obj){
		
		obj.content = dbsliceFile.test.structure(sessionFile, obj.content)
		return obj
		
	} // format
	
	static structure = {
		// This can now more easily handle different ways of specifying contours. Also convenient to implement the data structure conversion here, e.g. from points to triangles.
		
		json2sessionFile: function(content){
			
			// Has to be an object, whose entries are valid categories. The entries of the categories are considered the variables after teh merge. Each of them must have the same exact properties (file names), the names must include all the already loaded files, and all the file variables must be present in those files. 
			
			
			
			// Expect two parts to hte file: the merging and session info.
			
			// What happens when there is no sessionInfo, or nop merging info? Shouldn't it just throw an error??
			
			// Prune away anything that is not in line with the expected structure. This means categories need to be established ahead of time.
			let mergingInfo = content.mergingInfo;
			
			
			// There are some attributes that the sessionInfo section must have:
			// title, plotRows.
			let sessionInfo = content.sessionInfo
			if( !arrayIncludesAll( Object.getOwnPropertyNames(sessionInfo), ["title", "plotRows"] ) ){
				throw( new Error("InvalidFile: Session title or rows not specified."))
			} // if
			
			
			
			return {
				merging: mergingInfo,
				session: sessionInfo
			}
		}, // object
		
	} // structure
		
	static test = {
		
		content: function(content){
			
			// The philosophy here is that if it can be applied it is valid.
			
			
			// Try to use it and see if it'll be fine.
			let fileobjs = dbsliceDataCreation.makeInternalData(fileManager.library.retrieve(metadataFile))
			
			fileobjs = dbsliceDataCreation.sortByLoadedMergingInfo(fileobjs, content)
			
			// No need to check if all the loaded files were declared for - just use the merge to do what is possible.
			
			// Maybe the same applies to variables too? Just use what you can?
			
			// Maybe I don't even need to find common file names??
			
			
			// If there's no metadata files loaded then assume they're metadata files.
			
			
			
			// At least some of the 
			return true
			
		}, // content
		
	} // test
	
} // sessionFile
