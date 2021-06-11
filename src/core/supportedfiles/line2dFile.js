
// Superclass
import dbsliceFile from "./dbsliceFile.js";

export default class line2dFile extends dbsliceFile {
		
	
	format(obj){
		
		let content = dbsliceFile.test.structure(line2dFile, obj.content)

		// Rename the variables to remove leading and trailing blanks.			
		obj.content = line2dFile.rename(content)
		
		return obj

	} // format
	
	
	// Structure should be testable outside as well, as it will have to be called bt onDemandFile when its trying to classify the files.
	static structure = {
		
		csv2lineFile: function(content){
			
			if(Array.isArray(content)){
				
				let content_ = {
					variables: content.columns,
					data: dbsliceFile.convertNumbers( content )
				}
				
				// Test the new contents.
				line2dFile.test.content(content_)
				
				// Structure test succeeded. Delete the columns that accompany the array object.
				delete content_.data.columns
				
				return content_
			} else {
				return undefined
			} // if
			
		}, // array
		
		json2lineFile: function(content){
			
			if(Array.isArray(content.data)){
				
				
				let content_ = {
					variables: Object.getOwnPropertyNames(content.data[0]),
					data: content.data
				}
				
				// Test the new contents.
				line2dFile.test.content(content_)
				
				return content_
				
			} else {
				return undefined
			} // if
			
		}, // object
		
	} // structure
	
	// Also needed by onDemandFile
	static test = {
		
		content: function(content){
			
			if(content.variables.length < 2){
				throw( new Error("InvalidFile: No variable pair detected" ))
			} // if
			
			
			// All values MUST be numeric!
			let testrow = dbsliceFile.testrow(content.data)
			let areAllContentsNumeric = Object.getOwnPropertyNames(testrow.row).every(function(varName){
				let value = testrow.row[varName]
				return typeof(value) === 'number' && isFinite(value)
			})
			if(!areAllContentsNumeric){
				// There are non-numeric values in the data.
				throw( new Error("InvalidFile: Some variables include non-numeric values." ))
				
			} // if
			
			
			return true
		}, // content
		
	} // test
	
	
	static rename(content){
		// What happens if two names are the same after blanks have been trimmed? Retain the data, but add a modifier to the end.
		
		let renamemap = content.variables.reduce(function(acc, oldname){
			
			let newname = oldname.trim()
			
			if(oldname != newname){
				// Trimming changed something.
				let allnames = Object.getOwnPropertyNames(acc)
			
				let i = 0
				while(allnames.includes(newname)){
					newname += "_"
					
					// Safety break
					i += 1
					if(i > 10){break} // if
				} // while
				
				acc[oldname] = newname	
				
			} // if
			
			return acc
		}, {}) // reduce
		
		
		// Rename the whole content.data array.
		let namestoreplace = Object.getOwnPropertyNames(renamemap)
		
		content.data.forEach(function(row){
			namestoreplace.forEach(function(oldname){
				let newname = renamemap[oldname]
				row[newname] = row[oldname]
				delete row[oldname]
			})
		})
		
		content.variables = Object.getOwnPropertyNames(content.data[0])
		
		return content
		
		
	} // rename
	
} // line2dFile
