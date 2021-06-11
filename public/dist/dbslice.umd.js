(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('crossfilter'), require('mobx')) :
	typeof define === 'function' && define.amd ? define(['crossfilter', 'mobx'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.crossfilter, global.mobx));
}(this, (function (crossfilter, mobx) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var crossfilter__default = /*#__PURE__*/_interopDefaultLegacy(crossfilter);

	// Arrays
	function unique(d){		
		// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		} // unique
		
		return d.filter( onlyUnique )

	} // unique

	function arrayEqual(A, B){
		
		return arrayIncludesAll(A, B)
			&& arrayIncludesAll(B, A)
		
	} // arrayEqual

	function arrayIncludesAll(A,B){
		// 'arrayIncludesAll' checks if array A includes all elements of array B. The elements of the arrays are expected to be strings.
		
		// Return element of B if it is not contained in A. If the response array has length 0 then A includes all elements of B, and 'true' is returned.
		var f = B.filter(function(b){
			return !A.includes(b)
		});
		
		return f.length == 0? true : false
		
		
	} // arrayIncludesAll

	function setDifference(A, B){
		
		let a = new Set(A);
		let b = new Set(B);
		
		return { 
		  aMinusB: new Set([...a].filter(x => !b.has(x))),
		  bMinusA: new Set([...b].filter(x => !a.has(x)))
		}
	} // setDifference

	// Handle the erros within the files, and not within a separate object!!


	class dbsliceFile {
		constructor(file, requester){
			
			// How to load if file is an actual File object.
			if(file instanceof File){
				file = {
					url: URL.createObjectURL(file),
					filename: file.name,
				};
			} // if
			
			this.url = file.url;
			this.filename = file.filename;
			this.extension = file.filename.split(".").pop();
			this.promise = undefined;
			
			// Also log the requestor. If this was passed in then use the passed in value, otherwise the requestor is the user.
			this.requester = requester ? requester : "User";
			
			
			
			
			// Only dbslicefile interacts with errors. The errors are saved attached to the files that produced them. But they are saved separately in the library to both allow them to be reloaded when needed, and to be able to generate an error report for the user.
			this.errors = [];

			
			
			
		} // constructor
		
		load(){
			// Collect the data and perform input testing.
			let obj = this;
			
			// Based on the url decide how to load the file.
			let loader;
			switch(this.extension){
				
				case "csv":
					loader = function(url){ return d3.text(url).then(function(text){
						// Filter out any lines that begin with '#', and then parse the rest as csv.
						let text_ = text
						  .split("\n");
						  
						// Don't directly filter, but instead just remove lines until the first one without a '#'.
						for(let i=0; i<text_.length; i++){
							if(text_[0].startsWith("#")){
								text_.splice(0,1);
							} else {
								break;
							} // if
						} // for
						  
						text_ = text_
						  .join("\n");
						  
						  
						return d3.csvParse( text_ )

					}) };
					break;
				
				/*
				case "csv":
					loader = function(url){ return d3.csv(url) }
					break;
				*/
					
				case "json":
					loader = function(url){ return d3.json(url) };
					break;
					
				default:
					// Return a rejected promise as the file extension is wrong.
					
					loader = function(){
						return Promise.reject(new Error("LoaderError: Unsupported Extension"))
					};
					break;
			}		
			
			// Wrap in a larger promise that allows the handling of exceptions.
			
			let loadPromise = new Promise( (resolve, reject)=>{
								
				
				// If the URL points to a non-existing file the d3 loader will reject the promise and throw an error, but still proceed down the resolve branch!
				
				loader(obj.url)
				  .then(
					function(content){
						// Since d3 insists on running the resolve branch even though it doesn't find the file, handle missing contents here.
						
						// csv files are always read as strings - convert numbers to numbers. Should be done here. If it's done in a preceeding promise then the error is lost.
						
						obj.content = content;
						resolve(obj);
						
					},
					function(e){
						// 'e' is an error triggered during loading.
						
						// The two errors that can enter here are file missing, and a problem reading the file.
						
						// This routes any errors that d3 might have into hte new promise.
						reject(e);
					});

				
			})
			.then(this.format)
			.then(this.onload)
			.catch(function(e){
				// This catches all the rejects. 'e' is the field into which the error can be logged.
				delete obj.content;
				obj.errors.push(e);
				return obj
			});
			
			this.promise = loadPromise;
			
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
				
				let content_;
			
				// No differentiating between the structure or the content failing - the file classes are trying several different structures.
			
				// Try to use all different file structures possible.
				Object.getOwnPropertyNames( fileClass.structure ).every(function(name){
					try {
						content_ = fileClass.structure[name]( content );
						
						// Return false breaks the loop. This return is reached only if the test was successfully performed and passed.
						return content_ ? false : true
					} catch (e){
						// Keep looping
						content_ = undefined;
						return true
					} // try
					
				}); // forEach
				
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
			  let i = Math.floor( Math.random()*array.length );
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

	class line2dFile extends dbsliceFile {
			
		
		format(obj){
			
			let content = dbsliceFile.test.structure(line2dFile, obj.content);

			// Rename the variables to remove leading and trailing blanks.			
			obj.content = line2dFile.rename(content);
			
			return obj

		} // format
		
		
		// Structure should be testable outside as well, as it will have to be called bt onDemandFile when its trying to classify the files.
		static structure = {
			
			csv2lineFile: function(content){
				
				if(Array.isArray(content)){
					
					let content_ = {
						variables: content.columns,
						data: dbsliceFile.convertNumbers( content )
					};
					
					// Test the new contents.
					line2dFile.test.content(content_);
					
					// Structure test succeeded. Delete the columns that accompany the array object.
					delete content_.data.columns;
					
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
					};
					
					// Test the new contents.
					line2dFile.test.content(content_);
					
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
				let testrow = dbsliceFile.testrow(content.data);
				let areAllContentsNumeric = Object.getOwnPropertyNames(testrow.row).every(function(varName){
					let value = testrow.row[varName];
					return typeof(value) === 'number' && isFinite(value)
				});
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
				
				let newname = oldname.trim();
				
				if(oldname != newname){
					// Trimming changed something.
					let allnames = Object.getOwnPropertyNames(acc);
				
					let i = 0;
					while(allnames.includes(newname)){
						newname += "_";
						
						// Safety break
						i += 1;
						if(i > 10){break} // if
					} // while
					
					acc[oldname] = newname;	
					
				} // if
				
				return acc
			}, {}); // reduce
			
			
			// Rename the whole content.data array.
			let namestoreplace = Object.getOwnPropertyNames(renamemap);
			
			content.data.forEach(function(row){
				namestoreplace.forEach(function(oldname){
					let newname = renamemap[oldname];
					row[newname] = row[oldname];
					delete row[oldname];
				});
			});
			
			content.variables = Object.getOwnPropertyNames(content.data[0]);
			
			return content
			
			
		} // rename
		
	} // line2dFile

	class contour2dFile extends dbsliceFile {
			
			
		format(obj){
			
			obj.content = dbsliceFile.test.structure(contour2dFile, obj.content);
			return obj
			
		} // format
		
		static structure = {
			// This can now more easily handle different ways of specifying contours. Also convenient to implement the data structure conversion here, e.g. from points to triangles.
			
			json2contour2dFile: function(content){
				
				// Not supposed to be an array! It should contain a single surface. If content.surfaces IS an array, then just select the first one.
				let surface = Array.isArray(content.surfaces) ? content.surfaces[0] : content.surfaces;
				
				// In the content I expect an array called `y', `x', `v' (or others), and `size'. The first three must all be the same length, and the last one must have 2 numbers.
				
				let L = (surface.x.length == surface.y.length) && (surface.x.length > 3) ? surface.x.length : undefined;
				
					
				// Find all possible variables. The variables are deemed available if they are the same length as the x and y arrays. Also, they must contain only numeric values.
				let compulsory = ["x", "y", "size"];
				let variables = Object.getOwnPropertyNames(surface).filter(function(d){
					
					let L_;
					if(!compulsory.includes(d)){
						// This is a possible user variable. It fits if it is an array of the same length as the geometrical parameters, and if it has numeric values.
						let vals = surface[d];
						
						
						
						L_ = Array.isArray( vals ) && !vals.some(isNaN) ? vals.length : undefined;
					} else {
						L_ = undefined;
					} // if
					
					// The particular variable has to be an array of exactly the same length as `x' and `y'.
					
					return L_ == L
				});
				
				
				// Variables must have at least one option.
				let content_;
				if(variables.length > 0){
					content_ = {
						variables: variables,
						surface: surface
					};
				} else {
					throw(new Error("InvalidFile: Unsupported data structure")) 
				} // if
			
				// Hard-coded expected contents
				return content_
					
						
			}, // object
			
		} // structure
		
	} // contour2dFile

	// When implementing new file types, they have to have a separate file (which consists practically only of the testing procedures), and be entered here to be considered during the testing of the metadata variables.




	class onDemandFile extends dbsliceFile {
			
		onload(obj){
			
			// During the data formatting the format of the file is determined already. Here just report it onwards.
			return obj
			
		} // onload
		
		format(obj){
			// Here try all different ways to format the data. If the formatting succeeds, then check if the contents are fine.
			
			let availableFileClasses = [line2dFile, contour2dFile];
			
			// Here just try to fit the data into all hte supported data formats, and see what works.
			
			var format;
			availableFileClasses.every(function(fileClass){
				try {
					// The structure test will throw an error if the content cannot be handled correctly.
					dbsliceFile.test.structure(fileClass, obj.content);
					
					// This file class can handle the data.
					format = fileClass.name;
				} catch {
					return true
				} // if
			});
				
				
			// Output the object, but add it's format to the name.
			if( format ){
				obj.content.format = format;
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

	// Array comparison helpers.



	// Maybe move the tests outside?
	class metadataFile extends dbsliceFile {
		  
		onload(obj){
			// This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
			
			// Check if suitable categories have already been declared.
			let classificationPromise;
			if(!obj.content.categories){
				// Launch the variable classification.
				classificationPromise = obj.classify.all(obj);
			} else { 
				classificationPromise = Promise.resolve().then(d=>{return obj}); 
			
			}// if 
			
			// To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.
			return classificationPromise
			
		} // onload
	  
	  
		format(obj){
			
			// Restructure the data into an expected format
			obj.content = dbsliceFile.test.structure(metadataFile, obj.content);
			
			return obj
			
			
		} // format
	  

	  
	  
		static structure = {
		  
		  csv2metadataFile: function(content){
			  
			  let content_;
			  
			  // Data values need to be converted to numbers. Convert the 'variables' into objects?
			  content_ = {
				  variables: content.columns.map(function(d){
					  return {name: d, 
						  category: undefined,
							  type: undefined}
				  }),
				  data: dbsliceFile.convertNumbers( content ),
			  };
			  
			  
			  metadataFile.test.content(content_);
			  
			  delete content_.data.columns;
			  
			  return content_
		  }, // array
		  
		  json2metadataFile: function(content){
			  
			  let content_;
			  
			  
			  content_ = {
				  variables: Object.getOwnPropertyNames(dbsliceFile.testrow(content.data).row).map(function(d){
					  return {name: d, 
						  category: undefined,
							  type: undefined}
				  }),
				  data: content.data,
			  };
				  
			  // Check if declared variables contain all variables in the data.
			  let allVariablesDeclared = arrayEqual(
					metadataFile.cat2var(content.header).map(d=>d.name),
					content_.variables.map(d=>d.name)
			  );
			  
			  // All variables are declared, but have they been declared in the right categories??
			  
			  if(allVariablesDeclared){
				  // All variables have been declared. The categories can be assigned as they are.
				  content_.variables = metadataFile.cat2var(content.header);
				  
			  } // if
			  
			  metadataFile.test.content(content_);
			  
			  return content_
			  
		  }, // object
		  
		} // structure
	  
	  
	  // The testing suite for this file type.
	  static test = {
	  
		content: function(content){
			
			// Columns require a taskId property.
			// Declared categories must contain all variables.
			// All rows must be the same lenght
			// There must be some rows.
			// Data must be iterable
			
			
			// Check if the data is an array (has function length)
			let isThereAnyData = Array.isArray(content.data) 
							  && content.data.length > 0;
			

			// Test to make sure all rows have the same number of columns.
			let areRowsConsistent = true;
			let testrow = dbsliceFile.testrow(content.data).row;
			content.data.forEach(function(row){
				arrayEqual(
					Object.getOwnPropertyNames(testrow),
					Object.getOwnPropertyNames(row)
				);
			}); // forEach
			
			return isThereAnyData && areRowsConsistent
			
			
			
			
		}, // content
	  
	  } // test
	  
	  // Methods required for variable classification
	  classify = {
		  
		all: function(obj){
			// This already executes in a promise chain, therefore it's not needed to update the obj.promise. The promises created here will be resolved before the overhead promise resolves further.
			
			// Create all the testing promises.
			let testPromises = obj.content.variables.map(function(variable){
				// Check this column. Variable is now an object!
				return obj.classify.variable(obj, variable)
			});
			
			// Return the final promise.
			return Promise.all(testPromises)
				.then(function(variableClassification){
					// The promises update the variable classification into the file object directly.
					
					// obj.content.categories = variableClassification
					return obj
				})
				
			
			
			
			  
		  }, // all
		  
		variable: function(obj, variable){
			  
			// Retrieve an actual value already.
			let testrow = dbsliceFile.testrow(obj.content.data);
			let testval = testrow.row[variable.name];
			
		  
			// Split the testing as per the variable type received.
			let promise;
			switch( typeof(testval) ){
				case "string":
					// String can be a file too.
					variable.type = "string";
					promise = obj.classify.string(obj, variable, testval);
					
				  break;
				  
				case "number":
					variable.category = "ordinal";
					variable.type = "number";
					promise = variable;
					
				  break;
				  
				default:
					variable.category = "Unused";
					variable.type = undefined;
					promise = variable;
					
			} // switch
				
			return promise
		  
		}, // variable
	  
		string: function(obj, variable, testval){
			// If the string is a file, load it in to identify it's structure. It's not important which extension the file has, but what is it's internal structure.
			
			// 'obj' is needed to construct an on-load response, 'variable' and 'testval' to have the name value pair.  
			
			let promise;
			
			// Create a new onDemandFile to load in it's contents.
			
			
			switch( testval.split(".").pop() ){
				case "json":
				case "csv":
					// Try to classify the testval as a file. The requester is the metadata for which the variables are being classified.
					let testFile = new onDemandFile({url: testval, filename: testval}, obj.filename);
					
					promise = obj.classify.file(variable, testFile);
					
				  break;
				default:
					// Unsupported extension.
					variable.category = "categorical";
					promise = variable;
			} // switch
			
			
			return promise
		  
		}, // string
		
		file: function(variable, testFile){
			// Make a new generic on-demand file, and return a promise that will return the file type.
			
			testFile.load();
			
			// What can go wrong:
			// file is not found
			// file has wrong content
			
			// Below 'obj' represents 'testFile'.
			return Promise.all([testFile.promise]).then(function(obj){
				
				// It's possible that hte file was found and loaded correctly. In that case 'obj.content.format' will contain the name of the file type. Otherwise this field will not be accessible.
				try {
					// Category is the categorisation that will actually be used, and type cannot be changed.
					variable.category = obj[0].content.format;
					variable.type = obj[0].content.format;
					return variable
					
				} catch {
					// If the loading failed for whatever reason the variable is retained as a categorical.
					variable.category = "categorical";
					return variable
					
				} // try
			})
			
			
		}, // file
	  
		  
	  } // classify
	  

	  
	  // Where is this used??
	  static cat2var(categories){
		  // If categories are given, just report the categorisation. But do check to make sure all of the variables are in the categories!! What to do with label and taskId??
		  
		  let variables = [];
		  let declaredVariables;
		  
		  Object.getOwnPropertyNames(categories)
			.forEach(function(category){
			  if(categoryInfo.supportedCategories.includes(category)){
				  declaredVariables = categories[category].map(
					function(d){
						return {name: d, 
							category: category,
								type: categoryInfo.cat2type[category]}
					});
					
				  variables = variables.concat(declaredVariables);  
			  } // if
			  
			});
		  
		  // Check that all hte variables are declared!
		  
		  return variables
		  
	  } // category2variable
	  
	  

	  
	  
	} // metadataFile

	// General helpers


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



	// Make the datastore observe the metadata files loaded by the loader? And when it updates it should prompt the user. How do I introduce the user in here? With a button based action!


	// The metadata can be introduced as a reference bject, and then an autorun can be implemented inside. Ok, so then implement the file loader first.


	class metadatamanager {

		constructor(files){
			
			// The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.
			
			
			let obj = this;
			
			obj.files = files;
			
			
			// This is a mix of the crossfilter, it's dimensions, and some metadata about the metadata in the crossfilter. Untangle?
			let cf = crossfilter__default['default']([]);
			
			
			// Maybe this should be a separate state to control itself? It could be a helper class within here? So that it controls the filtering etc, there will be another class for user interactions.
			obj.data = {
				
				// Metadata about metadata.
				categoricalProperties: [],
				ordinalProperties: [],
				line2dProperties: [],
				contour2dProperties: [],
				
				
				// Crossfilter and the associated dimensions.
				cf: cf,
				categoricalDims: {},
				ordinalDims: {},
				taskDim : cf.dimension(d=>d.taskId),
				fileDim : cf.dimension(d=>d.filenameId),
				
				// Filters.
				filterSelected: [],
				histogramSelectedRanges: [],
				manuallySelectedTasks: [],
				
				// Precomputed values.
				categoricalUniqueValues: {},
			
			}; // cfData
			

			// Merging progressively stores the users inputs on how to merge the metadata.
			obj.merging = {}; 
			
			
			
			
			// Make the class observable.
			mobx.makeObservable(obj, {
				metadatafiles: mobx.computed
	        });
			
			
			
		} // constructor
		
		
		
		
		// Well, the metadata manager shouldn't update everytime the files update. But I guess this will update it every time. Will the observable down the line change if this computes the same state? I think so no?
		get metadatafiles(){
			let obj = this;
			
			// Find all correctly loaded metadata files.
			let valid = obj.files.filter( fileobj => { return fileobj instanceof metadataFile });
			// let valid = obj.files.filter( fileobj => true)
			return valid
		} // metadatafiles
		
		
		
		// Now every time the metadata files change we should call the UI, merge the metadata, and then continue.
		
		

		// This should be an action somehow no?
		// cfChange -> swapdata
		swapdata(metadata){
			// Handle the change to the metadata. Simply exchange all the internal data. But, I may need to retain the filter settings?
			let cf = this.data.cf;
			
			// Exchange the data.
			cf.remove();
			cf.add(metadata.data);
			
			// Resolve the differences between the old variables and the new variables.
			this.#resolveHeaderChange(metadata.header);
			// cfDataManager.resolve.cfData.headerChange(metadata.header)
			
			
		} // swapdata
		
		
		// Identify this as a private method to see if babel works.
		#resolveHeaderChange(newHeader){
			// `resolveHeaderChange' updates the data storage to match the provided `newHeader'. Only the properties of `newHeader' that are congruent with the data storage are changed, and others are ignored.
			
			let obj = this;
			
			// cfData -> data
			let data = this.data;
			
		
			
			// Go through the new header. The changes require also the crossfilter dimensions to be adjusted.
			Object.keys(newHeader).forEach(function(key){
				
				// Find the differences for this category that need to be resolved. 'diff' has items aMinusB (in current, but not in new) and bMinusA ( in new, but not in current)
				let diff = setDifference(data[key], newHeader[key]);
				
				switch(key){
					case "categoricalProperties":
					  
						// Dimensions first
						obj.#resolveDimensions(data.categoricalDims, diff);
					  
						// Metadata dimensions have precomputed unique values. Create these ones for new variables, and delete any unnecessary ones.
						obj.#resolveUniqueValues(data.categoricalUniqueValues, diff);
					  break;
					
					case "ordinalProperties":
					
						// Dimensions first
						obj.#resolveDimensions(data.ordinalDims, diff);
					  
						// Data dimensions have corresponding histogram ranges. Delete unnecessary ones, and create necessary ones.
						obj.#resolveHistogramRanges(data.histogramSelectedRanges, diff);
					  break;
					
				} // switch
				
				// Resolve the header.
				data[key] = newHeader[key];
				
			}); // forEach
			
			
			
			
			
		} // resolveHeaderChange
		
		
		

		
		
		#resolveDimensions(dims, diff){
			// `resolveDimensions' takes in an object `dims' that contains crossfilter dimensions, and updates it using the difference information supplied by an object `diff'.
			let cf = this.data.cf;
			
			// Those in A, but not in B, must have their cf dimensions removed.
			diff.aMinusB.forEach(function(varName){
			  delete dims[varName];
			}); // forEach
		  
			// Those in B, but not in A, must have cf dimensions created.
			diff.bMinusA.forEach(function(varName){
			  dims[varName] = cf.dimension(function (d){return d[varName];});
			}); // forEach
			
		} // resolveDimensions
		
		
		#resolveUniqueValues(vals, diff){
			let obj = this;
			
			obj.#resolveAttributes(vals, diff, function (varName){
				// Find all the unique values for a particular variable.
				return unique( 
				  obj.data.cf.all().map(function(d){return d[varName]})
				); // unique
			}); // resolveAttributes
			
		} // resolveUniqueValues
		
		#resolveHistogramRanges(vals, diff){
			let obj = this;
			
			obj.#resolveAttributes(vals, diff, function (varName){
				// Find the max range for the histogram.
				let tasks = dbsliceData.data.cf.all();
				return d3.extent(tasks, d=>d[varName])
			}); // resolveAttributes
			
		} // resolveHistogramRanges
		
		#resolveAttributes(vals, diff, populate){
			// Vals is an object of attributes that  needs to be resolved. The resolution of the attributes is given by diff. Populate is a function that states how that attribute should be populated if it's being created, and is passed in as it may need to be used multiple times.
					
			// Delete
			diff.aMinusB.forEach(function(varName){
				delete vals[varName];
			});
			
			// Variables that are in 'new', but not in 'old'.
			diff.bMinusA.forEach(function(varName){
				// If a populate function is defined, then create an entry, otherwise create an empty one.
				if(populate){
					vals[varName] = populate(varName);	
				} else {
					vals[varName] = [];
				} // if
			});
			
			
		} // resolveAttributes
			
	} // metadatamanager

	// Maybe it would be better to create an abstract library, and one that handles the specific needs of the app separately? It would make sense as different apps might have different needs? Or could the metadata management have a computed attribute, and just observe all the files??

	// On-demand plots provide the file manager with the type of file they are requesting. Maybe the session should be treated as a plot? So it prescribes the type of file it would like to have, and then that is passed to the file manager, which just loads and stores it? So filemanager would be a filelibrary?

	class filelibrary {
		constructor(){
			let obj = this;
			
			obj.files = [];
			obj.failed = [];
			
			// The library does not know the whole extent of the files that are currently required - it only knows what was requested of it. To let it know what is actively needed an array of filenames must be communicated to it.
			obj.required = [];
			
			
			// I don't want the files to be loaded over and over again. So maybe it's good to have a background storage that keeps all the files, and a frontend storage that computes itself based on hte background and the currently requested status? Maybe still good, because the unnecessary files are disposed of automatically.
			
			// Make the class observable.
			mobx.makeObservable(obj, {
	            single: mobx.action,
				updateactive: mobx.action,
				store: mobx.action,
				files: mobx.observable,
				required: mobx.observable,
	        });
			
			
			// It should keep updating itself to make sure that requested matches the files/failed.
			mobx.autorun(()=>{obj.update();});
			
		} // constructor
		
		

		
		
		// LOADING
		single(classref, filename){
			
			let obj = this;
			
			
			// Check if this file already exists loaded in. Only unique filenames are saved, so this should only return a single item in the array.
			let libraryEntry = obj.retrieveByFilenames( [filename] )[0];
			if(libraryEntry){
				return libraryEntry
			} else {	
				// Initiate loading. After loading if the file has loaded correctly it has some content and can be added to internal storage.
				let fileobj = new classref(filename);
				fileobj.load();
				obj.store(fileobj);
				return fileobj.promise;
			} // if
					
		} // single
		
		
		store(fileobj){
			let obj = this;
			
			fileobj.promise.then(function(fileobj){
				
				// Other files should be stored if they have any content.
				if( fileobj.content ){
					// Successfuly loaded files.
					obj.files.push(fileobj);
				} else {
					// Errors were incurred.
					obj.failed.push(fileobj);
				} // if
				
			}); // then
					
		} // store
		
		retrieveByFilenames(filenames){
			// If filenames are defined, then return specific files.
			
			let obj = this;
			return obj.files.filter(function(file){
				return filenames.includes(file.filename)
			}) // filter
				
		} // retrieve
		
		retrieveByClass(classref){
			// If filename is defined, then try to return that file. Otherwise return all.
			let obj = this;	
			return obj.files.filter(function(file){
				return file instanceof classref
			}) // filter
				
		} // retrieveByClass
		
		
		
		// UPDATING
		updateactive(filenames){
			// This is kept separate to allow autorun to perform updates without calling input parameters.
			let obj = this;
			obj.required = filenames;
		} // updateactive
		
		update(){
			// Actually, just allow the plots to issue orders on hteir own. The library update only collects the files that are not required anymore. So this checks to make sure that any files that are no longer needed get thrown out.
			
			// But for that it must have access to the filtered tasks, as well as the plots. Maybe there should just be a collection point into which the plots submit their requests, and the library then responds. And when the plots required files change, that would update.
			let obj = this;
			
			let filesForRemoval = obj.files.filter(function(file){
				return !obj.required.includes(file.filename)
			}); // filter
			
			
			// Failed loadings should also be removed if they're no longer needed. Maybe still keep everything in a background _files? And produce the failed and files based on that?
			obj.#remove( filesForRemoval );
			
		} // update
		
		
		
		
		
		
		

		// REMOVAL
		#removeByFilenames(filenames){
			// `filenames' is an array of string file names.
			let obj = this;
			obj.#remove( obj.retrieveByFilenames(filenames) );
		} // remove
		
		#removeByClass(classref){
			// `classref' is a class reference such that: new classref(inputs) instanceof classref.
			let obj = this;
			obj.#remove( obj.retrieveByClass(classref) );
		} // remove
		
		#remove(files){
			let obj = this;
			
			// For each of these find it's index, and splice it.
			files.forEach(function(file){
				let i = obj.files.indexOf(file);
				obj.files.splice(i,1);
			});
		} // removeFiles
			
	} // filelibrary

	// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.





	// For the file library now set some required extent, and then ask for some of the files.
	let testrequired = ["./data/m_c3s.csv"];
	let library = new filelibrary();
	library.required = testrequired;



	// The metadatamanager should observe the metadatafiles
	let manager = new metadatamanager(library.files);


	console.log(library, manager);



	// Print the content of the library now.
	console.log(library.files);


	/* Request a single metadata file. The input for files should be an object:
		file = {
			url: url,
			filename: filename
		}
	 */
	library.single(metadataFile, {url: "./data/m_c3s.csv", filename: "./data/m_c3s.csv"});


	console.log(library.files);


	console.log(manager.files);

})));
