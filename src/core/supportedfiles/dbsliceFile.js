


// Handle the erros within the files, and not within a separate object!!


export default class dbsliceFile {
	constructor(file, requester){
		
		// How to load if file is an actual File object.
		if(file instanceof File){
			file = {
				url: URL.createObjectURL(file),
				filename: file.name,
			}
		} // if
		
		this.url = file.url
		this.filename = file.filename
		this.extension = file.filename.split(".").pop()
		this.promise = undefined
		
		// Also log the requestor. If this was passed in then use the passed in value, otherwise the requestor is the user.
		this.requester = requester ? requester : "User"
		
		
		
		
		// Only dbslicefile interacts with errors. The errors are saved attached to the files that produced them. But they are saved separately in the library to both allow them to be reloaded when needed, and to be able to generate an error report for the user.
		this.errors = []

		
		
		
	} // constructor
	
	
	load(){
		// Collect the data and perform input testing.
		let obj = this
		
		// Based on the url decide how to load the file.
		let loader
		switch(this.extension){
			
			case "csv":
				loader = function(url){ return d3.text(url).then(function(text){
					// Filter out any lines that begin with '#', and then parse the rest as csv.
					let text_ = text
					  .split("\n")
					  
					// Don't directly filter, but instead just remove lines until the first one without a '#'.
					for(let i=0; i<text_.length; i++){
						if(text_[0].startsWith("#") || text_[0].startsWith(`\"#`)){
							text_.splice(0,1)
						} else {
							break;
						} // if
					} // for
					  
					text_ = text_
					  .join("\n")
					  
					  
					return d3.csvParse( text_ )

				}) }
				break;
			
			/*
			case "csv":
				loader = function(url){ return d3.csv(url) }
				break;
			*/
				
			case "json":
				loader = function(url){ return d3.json(url) }
				break;
				
			default:
				// Return a rejected promise as the file extension is wrong.
				
				loader = function(){
					return Promise.reject(new Error("LoaderError: Unsupported Extension"))
				}
				break;
		}; // switch
		
		
		// Wrap in a larger promise that allows the handling of exceptions.
		
		let loadPromise = new Promise( (resolve, reject)=>{
							
			
			// If the URL points to a non-existing file the d3 loader will reject the promise and throw an error, but still proceed down the resolve branch!
			
			loader(obj.url)
			  .then(
				function(content){
					// Since d3 insists on running the resolve branch even though it doesn't find the file, handle missing contents here.
					
					// csv files are always read as strings - convert numbers to numbers. Should be done here. If it's done in a preceeding promise then the error is lost.
					
					obj.content = content
					resolve(obj)
					
				},
				function(e){
					// 'e' is an error triggered during loading.
					
					// The two errors that can enter here are file missing, and a problem reading the file.
					
					// This routes any errors that d3 might have into hte new promise.
					reject(e)
				})

			
		})
		.then(this.format)
		.then(this.onload)
		.catch(function(e){
			// This catches all the rejects. 'e' is the field into which the error can be logged.
			delete obj.content
			obj.errors.push(e)
			return obj
		})
		
		this.promise = loadPromise
		
	} // load
	
	onload(obj){
	  return obj
	} // onload
  
	format(obj){
	  return obj
	} // format
	
	static test = {
		
		structure: function (fileClass, content){
			// This an abstract test director. When a file is loaded the file classes do not know exactly how to handle to contents. This test director tries different implemented approaches to reformat the data, and stops when a suitable approach is found. In the future this may be extended to the point where the test involves performing a dummy plotting operation, as the plotting is the last operation to be performed on the file data.
			
			let content_
		
			// No differentiating between the structure or the content failing - the file classes are trying several different structures.
		
			// Try to use all different file structures possible.
			Object.getOwnPropertyNames( fileClass.structure ).every(function(name){
				try {
					content_ = fileClass.structure[name]( content )
					
					// Return false breaks the loop. This return is reached only if the test was successfully performed and passed.
					return content_ ? false : true
				} catch (e){
					// Keep looping
					content_ = undefined
					return true
				} // try
				
			}) // forEach
			
			if(content_){
				// Restructuring succeeded.
				return content_
			} else {
				throw( new Error("InvalidFile: Unsupported data structure"))
			} // if
			
		}, // structure
		
	} // test
	
	// Maybe move these to helpers??
	static testrow(array){
	  
	  if(array.length > 0){
		  let i = Math.floor( Math.random()*array.length )
		  return {
			  i: i,
			row: array[i]
		  } // return
	  } else {
		  throw( new Error( "InvalidInput: Array without entries" ))
	  } // if
		  
	} // testrow
	
	static convertNumbers(array){
		
		return array.map(function(row){
			
			var r = {};
			for (var k in row) {
				r[k] = +row[k];
				if (isNaN(r[k])) {
					r[k] = row[k];
				} // if
			} // for
		  return r;
			
		})
		
		
	} // convertNumbers
	
} // dbsliceFile