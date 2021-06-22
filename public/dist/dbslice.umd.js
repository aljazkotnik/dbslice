(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3-time-format'), require('mobx'), require('crossfilter'), require('d3')) :
	typeof define === 'function' && define.amd ? define(['d3-time-format', 'mobx', 'crossfilter', 'd3'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(null, global.mobx, null, global.d3$1));
}(this, (function (d3TimeFormat, mobx, crossfilter, d3$1) { 'use strict';

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () {
							return e[k];
						}
					});
				}
			});
		}
		n['default'] = e;
		return Object.freeze(n);
	}

	var d3__namespace = /*#__PURE__*/_interopNamespace(d3$1);

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
							if(text_[0].startsWith("#") || text_[0].startsWith(`\"#`)){
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

	// An object containing all the supported variable types, and the tests to properly classify them. The allowable types are those that can come from typeof(test_value). An implementation of a variable type must at least have a "test" function.
	var supportedVariableTypes = {
		
		string: {
			
			supportedCategories: {
				string: ["categorical"],
				datetime: ["categorical", "ordinal"],
				line2dFile: ["categorical", "line2dFile"],
				contour2dFile: ["categorical", "contour2dFile"]
			},
			
			test: function(variable, testval, filename){
				// `variable' needs to be the first input!
				// Return a promise or a fully classified variable.
				let testobj = this;
				
				switch( testval.split(".").pop() ){
					case "json":
					case "csv":
						// The requester is the metadata file for which the variables are being classified.					
						return testobj.testAsFile(variable, testval, filename)
					default:
						// Unsupported extension - treat as a regular string. A string could be a date.	
						return testobj.testAsDatetime(variable, testval);
				} // switch
			}, // test
			
			
			defaultclassification(variable){
				let testobj = this;
				variable.category = "categorical";
				variable.type = "string";
				variable.supportedCategories = testobj.supportedCategories["string"];
				return variable
			}, // defaultclassification
			
			
			testAsFile(variable, testval, requester){
				// Return fully classified variable object.
				let testobj = this;
				
				// Make a testfile object to load the content.
				let testFile = new onDemandFile({
					url: testval, 
					filename: testval
				}, requester);
				testFile.load();
				
				// Why Promise.all ??
				
				// Below 'fileobj' represents 'testFile'.
				return Promise.all([testFile.promise]).then(function(fileobj){
					
					// It's possible that hte file was found and loaded correctly. In that case 'obj.content.format' will contain the name of the file type. Otherwise this field will not be accessible.
					try {
						// Category is the categorisation that will actually be used, and type cannot be changed.
						variable.category = fileobj[0].content.format;
						variable.type = fileobj[0].content.format;
						variable.supportedCategories = testobj.supportedCategories[variable.type];
						return variable
						
					} catch {
						// If the loading failed for whatever reason the variable is retained as a categorical.
						return testobj.defaultclassification(variable);
						
					} // try
				}) // Promise.all().then
				
				
			}, // testAsFile
			
			
			testAsDatetime(variable, testval){
				// But for datetimes it's possible that the row will have mixed formats. In that case it's only fair to allow the variable to be used as a date if all the values can be converted no? Leave as is for now, the others should just return as null, and then that can be handled upon drawing.
				
				let testobj = this;
				
				let testdate = testobj.string2datetime(testval);
				
				if(testdate){				
					variable.category = "ordinal";
					variable.type = "datetime";
					variable.supportedCategories = testobj.supportedCategories["datetime"];
				} else {
					testobj.defaultclassification(variable);
				} // if
				
				return variable
			}, // testAsDatetime
			
			
			string2datetime(testval){
				
				/* FORMAT DESIGNATORS
				SECOND
					%f - microseconds as a decimal number [000000, 999999].
					%L - milliseconds as a decimal number [000, 999].
					%Q - milliseconds since UNIX epoch.
					%s - seconds since UNIX epoch.
					%S - second as a decimal number [00,61].

				MINUTE
					%M - minute as a decimal number [00,59].

				HOUR
					%H - hour (24-hour clock) as a decimal number [00,23].
					%I - hour (12-hour clock) as a decimal number [01,12].
					%p - either AM or PM.*

				DAY
					%a - abbreviated weekday name.*
					%A - full weekday name.*
					%j - day of the year as a decimal number [001,366].
					%d - zero-padded day of the month as a decimal number [01,31].
					%e - space-padded day of the month as a decimal number [ 1,31];
					%u - Monday-based (ISO 8601) weekday as a decimal number [1,7].
					%w - Sunday-based weekday as a decimal number [0,6].

				WEEK
					%U - Sunday-based week of the year as a decimal number [00,53].
					%W - Monday-based week of the year as a decimal number [00,53].
					%V - ISO 8601 week of the year as a decimal number [01, 53].

				MONTH
					%b - abbreviated month name.*
					%B - full month name.*
					%m - month as a decimal number [01,12].

				QUARTER
					%q - quarter of the year as a decimal number [1,4].

				YEAR
					%g - ISO 8601 week-based year without century as a decimal number [00,99].
					%G - ISO 8601 week-based year with century as a decimal number.
					%y - year without century as a decimal number [00,99].
					%Y - year with century as a decimal number, such as 1999.

				MISC
					%Z - time zone offset, such as -0700, -07:00, -07, or Z.
					%% - a literal percent sign (%).

					%c - the locale’s date and time, such as %x, %X.*
					%x - the locale’s date, such as %-m/%-d/%Y.*
					%X - the locale’s time, such as %-I:%M:%S %p.*
				*/
				
				
				// Four digit year format will successfully read a two digit year input string. Instead of setting bounds on the date just make sure the 2-digit-year format (%y) is tried before the 4-digit-year format (%Y).
				let supportedDatetimeFormats = ["%d/%m/%y", "%d-%m-%y", "%d.%m.%y", "%d/%m/%Y", "%d-%m-%Y", "%d.%m.%Y"];
				
				
				let datetime = null;
				
				// Can't break out of a forEach... Iterating for(let format in ...) returned the index instead of the string value...
				for(let i=0; i<supportedDatetimeFormats.length; i++){
					let format = supportedDatetimeFormats[i];
					
					let t = d3.timeParse(format);
					datetime = t(testval);
					
					// Dates that only have two digits to denote the year are automatically set to the latest year with those two ending digits by d3.timeParse.
					if(datetime){
						break;
					}
				} // for
				
				return datetime;
				
			} // string2datetime
			
			
		}, // string
		
		
		number: {
			
			test: function(variable){
				variable.category = "ordinal";
				variable.type = "number";
				variable.supportedCategories = ["ordinal", "categorical"];
				return variable
			} // test
		}, // number
		
	}; // supportedVariableTypes



	// Maybe I can even move the structure outside here, and remove the need for the static variable?




	// Maybe move the tests outside?
	class metadataFile$1 extends dbsliceFile {
		  
		onload(obj){
			// This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
			
			// The classification is forced now, as categories data is not used anymore. To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.
			let classificationPromise = obj.classifyvariables();
			return classificationPromise
			
		} // onload
	  
	  
		format(obj){
			
			// Restructure the data into an expected format
			obj.content = dbsliceFile.test.structure(metadataFile$1, obj.content);
			
			return obj
			
			
		} // format
	  

	  
	  
		static structure = {
		  
		  csv2metadataFile: function(content){
			  
			  let content_;
			  
			  // Data values need to be converted to numbers. Convert the 'variables' into objects?
			  content_ = {
				  variables: content.columns.map(function(d){
					  return {
						name     : d, 
						category : undefined,
						type     : undefined,
						nunique  : unique( content.map(row=>row[d]) ).length,
						n: content.length
					  }
				  }),
				  data: dbsliceFile.convertNumbers( content ),
			  };
			  
			  
			  metadataFile$1.test.content(content_);
			  
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
			  }; // content_
			  
			  metadataFile$1.test.content(content_);
			  
			  return content_
			  
		  }, // object
		  
		} // structure
		
		
		
		classifyvariables(){
			let obj = this;
			
			// This already executes in a promise chain, therefore it's not needed to update the obj.promise. The promises created here will be resolved before the overhead promise resolves further.
			
			// Create all the testing promises.
			let testPromises = obj.content.variables.map(function(variable){
				// Check this column. Variable is now an object!
				return obj.makeVariableClassificationPromise(obj.filename, obj.content.data, variable)
			}); // map
			
			// Return the final promise.
			return Promise.all(testPromises)
				.then(function(variableClassification){
					// The promises update the variable classification into the file object directly.
					
					// If any variables have been identified as datetypes, then convert them all to datetypes here to save the hassle for later.
					obj.content.variables.forEach(variable=>{
						if(variable.type == "datetime"){
							obj.content.data.forEach(row=>{
								row[variable.name] = supportedVariableTypes.string.string2datetime( row[variable.name] );
							}); // forEach
						} // if
					}); // forEach
					
					
					return obj
				})
			
		} // classifyvariables
		
		
		makeVariableClassificationPromise(filename, data, variable){
			
			// Retrieve an actual value already.
			let testrow = dbsliceFile.testrow(data);
			let testval = testrow.row[variable.name];
			
		  
			// Split the testing as per the variable type received.
			let testobj = supportedVariableTypes[typeof(testval)];
			if( testobj ){
				return testobj.test(variable, testval, filename);
			} else {
				// For any variables without dedicated support.
				variable.category = "unused";
				variable.type = undefined;
				variable.supportedCategories = [];
				return variable
			} // if
			
		} // makeVariableClassificationPromise
	  
	  
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
			
			
			
			
		} // content
	  
	  } // test
	  
	  

	  
	} // metadataFile

	// Formulate this as a class? The it can be called as:
	// A = new dragdiv() ...


	class dragnode {
		constructor(node){
			// Make a new div.
			let obj = this;
			
			
			obj.node = node;
			obj.d3node = d3__namespace.select(node);
			obj.d3node
			  .style("position", "relative")
			  .style("left", 0 + "px")
			  .style("top", 0 + "px");
			
			// Container that will hold the mouse coordinates.
			obj.mouseorigin = {};
			
		} // constructor
		
		
		apply(){
			
			let obj = this;
			
			// Apply dragging to it. Store the movement data on the dragdiv object instead? So as to not pollute the actual object?
			let dragobj = d3__namespace.drag()
				.on("start", function(event){
					obj.mouseorigin = obj.mouseposition(event);
					
					obj.onstart();
				})
				.on("drag", function(event){
					// let position = obj.position()
					let movement = obj.movement(event);
					
					// Rounding positions to full pixel value hasn't helped much. Maybe it's the css holding everything back?
					
					
					// Move the wrapper.
					obj.d3node
					  .style("left", (obj.position.x + movement.x) + "px")
					  .style("top", (obj.position.y + movement.y) + "px");
					  
					// Update the last mouse position
					obj.mouseorigin = obj.mouseposition(event);
					
					
					obj.ondrag();
				})
				.on("end", function(event){
					// The parent should update it's position automatically. How do I do that? Maybe the parent should listen to some action? Or maybe it's position should just be calculated when it's needed?
					
					obj.onend();
				});
			
			obj.d3node.call(dragobj);
			
		} // apply
		
		
		get position(){
			// Get the position of the dragdiv.
			let obj = this;
			
			return {
				x: parseInt( obj.node.style.left ),
				y: parseInt( obj.node.style.top ),
				w: obj.node.offsetWidth,
				h: obj.node.offsetHeight
			}
			
		} // position
		
		
		movement(event){
			// Get the delta of the movement from hte origin to the current mouse position.
			let obj = this;
			
			let origin = obj.mouseorigin;
			let current = obj.mouseposition(event);
			
			return {
				x: current.x - origin.x,
				y: current.y - origin.y
			}
			
		} // movement
		
		mouseposition(event){
			
			return {
				x: event.sourceEvent.clientX,
				y: event.sourceEvent.clientY
			}
			
		} // mouseposition
		
		
		// Dummy functionality.
		onstart(){
		} // onstart
		ondrag(){
		} // ondrag
		onend(){
		} // onend
		
		
		
	} // dragdiv

	/*
	When collecting the merge information:
		The data must be saved per category, and [filename, variable name, and variable alias] triplets. On a variable DOM level the variable and file names must be available. On a category DOM level the category name must be available.

	When interacting there are compatibility restrictions (e.g. an ordinal cannot be a url pointing to a 2d line file). Therefore at the variable DOM level the compatibility array for that variable must be accessible, as well as the category info for the categories the variable is being placed into.

	When using templates to create the DOM data objects cannot be bound to it using d3. Maybe have a split between the static and dynamic parts of the DOM?




	One thought is to also allow only comparable types to be merged. Thisis done by the categories already. Ordinals can only be numbers, for categoricals it doesn't matter, and on-demand variables can only be used for dedicated plots or as categoricals. Therefore it's not necessary to have an additional check.

	*/


	// Declare the necessary css here.
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
	  
	  btnPill: `
      border: none;
	  border-radius: 12px;
	  text-align: center;
	  text-decoration: none;
  `,
	  
	  btnLegend: `
	  display: inline-block;
	  cursor: default;
  `,
	  
	  btnDraggable: `
	  display: block;
	  cursor: pointer;
	  position: relative;
	  white-space: nowrap;
  `,
	  
	  btnGhost: `
	  display: block;
	  color: gainsboro;
	  background-color: gainsboro;
	  pointer: default;
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
	  margin-top: 40px;
	  padding: 4px;
  `,
	  

		
	  divFileColumn: `
	  display: table-cell;
	  vertical-align: top;
  `,
	  
	  
	  divCategoryWrapper: `
	  display: table-row; 
	  vertical-align: top;
  `,
	  
	  divCategory: `
	  display: table-cell; 
	  vertical-align: top; 
	  border-style: solid; 
	  border-radius: 15px;
	  border-width: 0px;
	  padding: 3px;
  `
	  
	}; // css



	// The html constructor
	class template{
		
		constructor(files, categories){
			let obj = this;
			
			// The files themselves need not be saved, but the variables they hold need to be. Furthermore, the file names need to be preserved. Maybe just leave it as is.
			obj.files = files;
			
			
			// Categories should include `unused';
			obj.categories = unique( categories.concat("unused") );

		
			obj.node = template.html2element(obj.backbone());
			obj.update();
		} // constructor
		
		
		update(){
			// The node should stay the same, but the interactive content should be redone.
			let obj = this;
			
			// Update the legend on top.
			let legend = obj.node.querySelector("div.legend");
			legend.lastChild.remove();
			legend.appendChild( template.html2element( obj.legend() ) );
			
			// Update the interactive body
			let body = obj.node.querySelector("div.body");
			body.lastChild.remove();
			body.appendChild( template.html2element( obj.interactivecontent() ) );
			
		} // update
		
		
		// The color scheme.
		get color(){
			let obj = this;
			
			let scheme = d3.scaleOrdinal(d3.schemePastel2)
			  .domain(obj.categories);
			  
			return function(category){
				return category == "unused" ? "gainsboro" : scheme(category)
			}
		} // color
		

		backbone(){
			return `
		<div style="${ css.fullscreenContainer + "display: none;"}">
		<div style="${ css.card }">
		  <div>
			<div>
			  
			  <div>
				<h2 style="display: inline;">Metadata merging:</h4>
				<button style="${ css.btn + "float: right;" }">
				  <i class="fa fa-exclamation-triangle"></i>
				</button>
			  </div>
			  
			  <div class="legend">
			    <div>
				</div>
			  </div>
			  
			</div>
		  </div>
		  
		  
		  <div class="body" style="overflow-y: scroll; overflow-x: scroll; height: 400px; width: ">
			<div></div>
		  </div>
		  
		  
		  
		  <div>
			<button class="submit" style="${ css.btn + "background-color: mediumSeaGreen; color: white;" }">Submit</button>
		  </div>
		  
		</div>
		</div>`
			
		} // app
		
		
		legend(){
			let obj = this;
			return `
		  <div>
			${ obj.categories.map(d=>obj.legendbutton(d)).join("") }
		  </div>
		`
		} // legend
		
		interactivecontent(){
			let obj = this;
			return `
		  <div>
			${obj.files.map(fileobj=>obj.filecolumn(fileobj)).join("")}
		  </div>`;
		} // interactivecontent
		
		filecolumn(fileobj){
			let obj = this;
			
			return `
		  <div class="file" style="${ css.divFileColumn }">
			<p style="text-align: center;">
			  <strong>${ fileobj.filename }</strong>
			</p>
		  
			${ obj.categories.map(category=>obj.category(fileobj, category)).join("") }
		  
		  </div>
		`
			
		} // filecolumn


		category(fileobj, category){
			let obj = this;
			
			let variables = fileobj.content.variables.filter(varobj=>varobj.category==category);
			
			return `
		  <div style="${ css.divCategoryWrapper }">
			<div class="category ${ category }" 
			     style="${ css.divCategory }"
				 ownerfile="${ fileobj.filename }"
			>
			  ${ variables.map(variableobj=>obj.draggablebutton(variableobj)).join("") }
			  
			  ${
				  template.ghostbutton(["ghost-endstop"])
			  }
			</div>
		  </div>
		`
			
		} // category




		static button(label, cssstyle, cssclassname, variablename){
			
			return `
		  <button class="${cssclassname}" style="${ cssstyle }" variable="${variablename}">
			<strong>${ label }</strong>
		  </button>
		`
		} // button


		draggablebutton(variableobj){
			let obj = this;
			
			let fractionunique = variableobj.nunique == variableobj.n ? "" : `,  ${variableobj.nunique} / ${variableobj.n}`;
			
			let label = `${ variableobj.name } (${variableobj.type + fractionunique})`;
			let cssstyle = css.btnPill + css.btnDraggable + `background-color: ${ obj.color(variableobj.category) };`;
			let cssclasses = variableobj.supportedCategories.concat("draggable").join(" ");
			return template.button(label, cssstyle, cssclasses, variableobj.name);
		} // draggableButton

		legendbutton(category){
			let obj = this;
			let cssstyle = css.btnPill + css.btnLegend + `background-color: ${ obj.color(category) };`;
			return template.button(category, cssstyle, "draggable");
		} // draggableButton

		static ghostbutton(classnames){
			let cssstyle = css.btnPill + css.btnGhost;
			let cssclass = classnames ? `ghost ${classnames.join(" ")}` : "ghost";
			return template.button("ghost", cssstyle, cssclass);		
		} // ghostButton
		
		
		static html2element(html){
			let template = document.createElement('template'); 
			template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
			return template.content.firstChild;
		} // html2element
		
		
	} // template






	// The functionality.

	// This is the dragging.
	class variabledrag extends dragnode{
		constructor(node, containers, parent, color){
			super(node);
			
			let obj = this;
			
			// Containers are specified to limit the number of divs the button can be moved to.
			obj.containers = containers;
			
			// The parent is required as the height of categories depends on other corresponding categories.
			obj.parent = parent;
			
			// The color cheme is needed to allow the button to change color when it is assigned to a new category.
			obj.color = color;
			
			obj.apply();
			
		} // constructor
		
		// Supercede the drag events.
		onstart(){
			
			// Don't raise - this pushes it to the end of the list. z-index?
			// obj.d3node.raise();
			
		} // onstart
		
		ondrag(){
			let obj = this;
			// Find which container the button is over, and if it's allowed to be there.
			
			// Make a preview. To highlight the position into which the variable can be dropped we reposition the target ghost.
			let current = obj.currentcontainer();
			obj.stylecontainers(current);
			
		} // ondrag
		
		onend(){
			let obj = this;
			
			let current = obj.currentcontainer();
			obj.reposition(current);
			obj.stylecontainers();
			
			// Make sure the categories of all files maintain consistent heights, and are as short as possible.
			obj.coordinateFileDivs();
			
			// Change the color of the variable to match its new category.
			obj.stylebutton();
			
		} // onend
		
		
		// Movement
		currentcontainer(){
			let obj = this;
			
			let current;
			obj.containers.forEach(container=>{
				
				let overlap = obj.calculateoverlap(obj.node, container);			
				if( overlap > 0 ){
				
					// Have to check compatibility also. How to encode this information to the variables already? That's where the categories come from. Should come from the file then, since the categories are hardcoded within it no? 
					if( obj.isContainerCompatible(container) ){
						current = container;
					} // if
						
				} // if
				
				return current
				
			}); // forEach
			
			if(!current){
				current = obj.node.parentElement;
			} // if
			
			return current
			
		} // currentcontainer
		
		isContainerCompatible(container){
			let obj = this;
			return obj.node.classList.contains(container.classList[1])
		} // isContainerCompatible
		
		calculateoverlap(a,b){
			// Calculate hte overlap between nodes `a' and `b'.
			let arect = a.getBoundingClientRect();
			let brect = b.getBoundingClientRect();
			
			// Note that top is top on screen, but bottom in coordinates.
			let upper = Math.min(arect.bottom, brect.bottom);
			let lower = Math.max(arect.top, brect.top);
			
			let overlap = (upper - lower) < 0 ? 0 : upper - lower;
			return overlap;
			
		} // calculateoverlap
		
		reposition(container){
			// I don't actually want the element to be moved between two elements. I only want to allow the user to put a variable into an empty spot. If the variable isn't dropped over an empty spot it should be added to the end.
			let obj = this;
			
			// Only find if the variable we're over is a ghost variable.
			
			let targetghost = null;
			container.querySelectorAll("button.ghost").forEach(node=>{
					
				// Check if the dragged node is over this one.
				let current = targetghost ? obj.calculateoverlap(obj.node, targetghost) : 0;
				let candidate = obj.calculateoverlap(obj.node, node);
				
				if(candidate > current){
					targetghost = node;
				} // if

			}); // forEach
			
			
			// In case no ghost is found:
			//  same container - keep position.
			// new container - append to the end.
			if(targetghost){
				// Append to ghost position.
				move(obj.node, container, targetghost);
			} else {
				// No ghost was found. If the container is the same, then don't move.
				if(obj.node.parentElement == container); else {
					move(obj.node, container, targetghost);
				} // if
			} // if
			
			function move(a,container,b){
				// Append a ghost node to the origin.
				let originghost = template.html2element(template.ghostbutton());
				a.parentElement.insertBefore(originghost, a);
				
				// Append to ghost position.
				a.parentElement.removeChild(a);
				container.insertBefore(a, b);
				
				// If the ghost isnt a ghost-endstop then remove it.
				let endstop = container.querySelector("button.ghost-endstop");
				if(b){
				  if(!b.classList.contains("ghost-endstop")){
					b.parentElement.removeChild(b);
				  } // if
				} else {
					// b was null, and was appended after the ghost-endstop. Detach and attach it so it's the last one.
					container.removeChild(endstop);
					container.appendChild(endstop);
				} // if
			} // move
			
			obj.node.style.left = 0;
			obj.node.style.top = 0;
			
			
		} // reposition
		
		
		// Coordinating the containers.
		stylebutton(){
			// Make sure that the button has the color it is supposed to have.
			let obj = this;
			
			
			// Where to get the color from?
			let currentcategoryname = obj.node.parentElement.classList[1];
			
			obj.node.style.backgroundColor = obj.color(currentcategoryname);
		} // stylebutton
		
		stylecontainers(current){
			// The current container should have its border highlighted, while all the others should have no border.
			let obj = this;
			
			obj.containers.forEach(container=>{
				container.style.borderWidth = "0px";
			});
			
			if(current){
				current.style.borderWidth = "2px";
			} // if
			
			
		} // stylecontainers
		
		trimcontainers(containers){
			
			containers.forEach(container=>{
				
				// Loop over the children backwards.
				let keep = false;
				for(let i=container.children.length-1; i>-1; i--){
					// The first button that is not a ghost triggers all the others to be kept.
					let testelement = container.children[i];
					let testclass = testelement.classList;
					
					// Don't test if it's the stopend.
					if( !testclass.contains("ghost-endstop") ){
						keep = testclass.contains("ghost") ? keep : true;
						if(!keep){
							container.removeChild(testelement);
						} // if
					} // if
				} // for
				
			}); // forEach
			
		} // trimcontainers
		
		coordinateFileDivs(){
			// All filedivs will have the same number of categories. Just make sure that all comparable categories have the same number of elements within them.
			
			let obj = this;
			
			
			// Get all the categories.
			let categorynames = [];
			obj.containers.forEach(category=>{
				categorynames = categorynames.concat( category.classList.value.split(" ") );
			});
			categorynames = unique( categorynames );
			
			 
			categorynames.forEach(categoryname=>{
				// Find all the categories among all the files that need to be coordinated.
				let categoriesToCoordinate = obj.parent.querySelectorAll(`div.${ categoryname }`);
				
				
				// First trim out all trailing blank spots.
				obj.trimcontainers( categoriesToCoordinate );
				
				
				// Find the maximum length
				let n = 0;
				categoriesToCoordinate.forEach(category=>{
					n = category.children.length > n ? category.children.length : n;
				}); // forEach
				
				
				// Now force them all to the same length by adding ghost elements in front of the ghost-endstop element.
				categoriesToCoordinate.forEach(category=>{
					let k = n - category.children.length;
					let endstop = category.querySelector("button.ghost-endstop");
					for(let i=0; i<k; i++){
						category.insertBefore(template.html2element(template.ghostbutton()), endstop);
					} // for
				}); // forEach
				
			}); // forEach
			
			
		} // coordinateFileDivs
		
	} // variabledrag








	// The coordination of merging.
	class metadatamerger {
		constructor(files){
			let obj = this;
			
			// It will need to keep track of the files. These will already be metadata files.
			obj.files = files;
					
			// It will need to keep track of the merging information. Maybe it should be a property of this object actually
			obj.merging = [];
			
			
			// Maje the html builder and get a node to attach to the html app.
			obj.builder = new template(obj.files, obj.categories);
			obj.node = obj.builder.node;
			
			
			// Apply the submit functionality.
			obj.node.querySelector("button.submit").addEventListener("click", ()=>obj.submit());
			
			
			
			mobx.makeObservable(obj, {
				files: mobx.observable,
				categories: mobx.computed,
				submit: mobx.action
			});
			
			
			mobx.autorun(()=>{
				obj.update();
				obj.show();
			});
			
		} // constructor
		
		update(){
			// This should really run automatically....
			console.log("Update mergerer");
			
			let obj = this;
			
			// Somehow uncouple the template more. All hte interactive content needs to be updated - including the legend.
			// Make the builder observe these itself??
			obj.builder.files = obj.files;
			obj.builder.categories = obj.categories;
			obj.builder.update();
			
			// Apply the draggable functionality. This should really be applied on a file by file basis.
			let body = obj.builder.node.querySelector("div.body");
			let filedivs = obj.builder.node.querySelectorAll("div.file");
			filedivs.forEach(filediv=>{
				let categories = filediv.querySelectorAll("div.category");
				let draggables = filediv.querySelectorAll("button.draggable");
				
				draggables.forEach(draggable=>{
					new variabledrag(draggable, categories, body, obj.builder.color);
				});
			}); // forEach
		} // update
		

		
		show(){
			let obj = this;		
			obj.node.style.display = "";
		} // show
		
		hide(){
			let obj = this;
			obj.node.style.display = "none";
		} // hide
		
		submit(){
			let obj = this;
			
			// Collect the classification from the ui.
			obj.merginginfo = obj.collectmerginginfo();
			
			obj.hide();
			
			// Redo the menu for the next appearance.
			// obj.sortByLoadedMergingInfo(obj.merginginfo);
			
		} // submit
		
		// How to keep track of the merging information. It should be redone everytime a new merging file is loaded. Otherwise it should keep track of what the user selected.
		
		
		
		get categories(){
			let obj = this;
			return unique( obj.files.reduce((acc, fileobj)=>{
				acc = acc.concat(fileobj.content.variables.map(v=>v.category));
				return acc
			}, []) )
		} // categories
		
		collectmerginginfo(){
			// Collect the merging info by looping over the identified categories and comparing the elements in the same position.
			let obj = this;
			
			// MAYBE IT SHOULDNT BE A MAP
			let info = obj.categories.reduce( (acc,category) => {
				// Collect the DOM containers.
				let categorydivs = obj.node.querySelectorAll(`div.${ category }`);
				
				// Compare the children. They should all have the same number of them. Calculate the minimum just in case.
				let n = Number.POSITIVE_INFINITY;
				categorydivs.forEach(node=>{
					n = node.children.length < n ? node.children.length : n;
				}); // forEach
				
				
				// Loop over children.
				let categoryInfo = [];
				for(let i=0; i<n; i++){
					
					let comparableVariables = obj.collectComparableVariableRow(categorydivs, i);
					
					// If the merging was valid, then attach it to the info object.
					if( comparableVariables ){
						// This now needs to store the file name, variable name, and the variable merged alias.
						let variableAlias = comparableVariables[0].name;
						
						comparableVariables.forEach(variableobj=>{
							variableobj.category = category;
							variableobj.alias = variableAlias;
						}); // forEach
						
						// Filenames can have `.` or `\` in the filename. How to store the merged information in that case? Special objects like: {filename: ``, variable}
						categoryInfo = categoryInfo.concat(comparableVariables);
					} // if
					
				} // for
				
				// Only do this if categoryInfo has some information.
				if( categoryInfo.length > 0 ){
					acc = acc.concat( categoryInfo );
				} // if
				
				return acc;
			}, []); // reduce
			
			return info;
			
		} // collectmerginginfo
		
		
		collectComparableVariableRow(categorydivs, i){
			
			// Collect children in comparable positions.
			let comparablevariables = [];
			
			// forEach does not allow a `break`.
			for( let categorynode of categorydivs ){
				
			  let variablenode = categorynode.children[i];
				
			  if(variablenode.classList.contains("ghost")){
				comparablevariables = undefined;
				break;
			  } else {
				comparablevariables.push( {
				  filename: categorynode.attributes.ownerfile.value,
					  name: variablenode.attributes.variable.value
				} );	
			  } // if
			  
			} // for
			
			return comparablevariables;
		} // collectComparableVariableRow
		
		
		
		// How to sort the variables given some merging data? They will have to be ordered in the data itself.
		
		sortByLoadedMergingInfo(mergingInfo){
			// Establish the order by sorting the variables within their fileobjects. Mismatched variables should just be put at the end? But what if several files have mismatching variables? Move them into unused?
			
			// Ok, but then first loop through all the keys of the merging info, find those that aren't decalred, change their category to unused, and then continue.
			
			
			// Loop over the files and check what has been declared. Anything undeclared is moved to unused.
			
			
			let obj = this;
			
			
			
			// Create an alias order object that can be used for ordering.
			let declaredAliases = unique( mergingInfo.map(mergeentry=>mergeentry.alias) );
			
			
			// Variable name to alias ->
			
			
			// How to make sure that only items that are fully declared are being used?? Filter out the things that are not needed??
			
			// Reorder the variables in the categories.
			obj.files.forEach(function(fileobj){
				
				
				let declaredVariables = mergingInfo.filter(mergeentry=>{
					return mergeentry.filename == fileobj.filename
				}); // filter
				
				
				// Create a variable2alias array.
				let variablename2alias = declaredVariables.reduce((a,variable)=>{
					a[variable.name] = variable.alias;
					return a
				},{}); // reduce
				
				
				// Loop over the variables and have those that are not declared moved to unused.
				fileobj.content.variables.forEach(variableobj=>{
					let declared = declaredVariables.filter(declaredobj=>declaredobj.name == variableobj.name);
					if( declared.length != 1 ){
						// Undeclared variables are considered unused.
						variableobj.category = "unused";
					} else {
						// Declared variables may have to be moved to a different category.
						variableobj.category = declared[0].category;
					} // if
				}); // forEach
				
				// Now sort by category name. How to find position within category?
				
				// Just
				
				fileobj.content.variables.sort(function (x, y) { 
					// Just sort them in here. First sort by category, and then sort by the prescribed order value.
					
					// The variables in content don't have aliases, because they don't need them. Aliases are just secondary names that allow connection of primary variable names.
					let categorysort = ("" + x.category).localeCompare(y.category);
					let variablesort = declaredAliases.indexOf(variablename2alias[x.name]) - declaredAliases.indexOf(variablename2alias[y.name]);
					
					return categorysort || variablesort ; 
				});
				
				
			}); // forEach
			
		} // sortByLoadedMergingInfo
		
			
	} // metadatamerger

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
				fileobj.promise.then(fileobj_ => obj.store(fileobj_));
				// obj.store(fileobj)
				return fileobj.promise;
			} // if
					
		} // single
		
		
		// THE ANONYMOUS FUNCTION MUST BE THE `ACTION'. REWORK
		store(fileobj){
			let obj = this;
			
			// fileobj.promise.then(function(fileobj){
				
				// Other files should be stored if they have any content.
				if( fileobj.content ){
					// Successfuly loaded files.
					obj.required.push(fileobj.filename);
					obj.files.push(fileobj);
				} else {
					// Errors were incurred.
					obj.failed.push(fileobj);
				} // if
				
			// }) // then
					
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

	// This one is capable of loading in just about anything, but it's also not getting stored internally.
	class sessionFile extends dbsliceFile {
			
			
		format(obj){
			
			obj.content = dbsliceFile.test.structure(sessionFile, obj.content);
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
				let sessionInfo = content.sessionInfo;
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
				let fileobjs = dbsliceDataCreation.makeInternalData(fileManager.library.retrieve(metadataFile));
				
				fileobjs = dbsliceDataCreation.sortByLoadedMergingInfo(fileobjs, content);
				
				// No need to check if all the loaded files were declared for - just use the merge to do what is possible.
				
				// Maybe the same applies to variables too? Just use what you can?
				
				// Maybe I don't even need to find common file names??
				
				
				// If there's no metadata files loaded then assume they're metadata files.
				
				
				
				// At least some of the 
				return true
				
			}, // content
			
		} // test
		
	} // sessionFile

	// `userFile' supports the drag-and-drop functionality. The app has no way of knowing up-fron whether the dropped file is a metadata file or a session configuration file. It can test it to see which type it is, but for that the file needs to be loaded already. The `userFile' provides the initial loading infrastructure and the testing framework to identify the file types, and mutate the loaded files to the appropriate formats.

	class userFile extends dbsliceFile {
			
		onload(obj){
			
			// Mutate onload.
			var mutatedobj;
			switch(obj.content.format){
				case "metadataFile":
					// Not easy to mutate, as the format of the content may not be correct.
					mutatedobj = new metadataFile$1(obj);
					
					mutatedobj.content = {
						data: obj.content.data,
						variables: obj.content.variables
					};
					mutatedobj.promise = mutatedobj.classifyvariables();
					
				  break;
				case "sessionFile":
					// Return the contents as they are.
					mutatedobj = new sessionFile(obj);
					
					mutatedobj.content = obj.content;
					mutatedobj.promise = obj.promise;
					
				  break;
			  } // switch
			
			return mutatedobj.promise
			
		} // onload
		
		format(obj){
			// Here try all different ways to format the data. If the formatting succeeds, then check if the contents are fine.
			
			// SHOULD ALSO ACCEPT SESSION FILES.
			
			let availableFileClasses = [metadataFile$1, sessionFile];
			
			// Here just try to fit the data into all hte supported data formats, and see what works.
			
			var content_;
			availableFileClasses.every(function(fileClass){
				try {
					// The structure test will throw an error if the content cannot be handled correctly.
					content_ = dbsliceFile.test.structure(fileClass, obj.content);
					
					// This file class can handle the data.
					content_.format = fileClass.name;
				} catch {
					return true
				} // if
			});
				
				
			// Output the object, but add it's format to the name.
			if( content_.format ){
				obj.content = content_;
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
			
			new metadataFile$1(obj);
			
			
			// Refactor the 
			
		} // mutateToMetadata
	  
	} // userFile

	// Extend that library here so that it can also handle the drag-dropped events.

	class dbslicefilelibrary extends filelibrary {
		constructor(){
			super();
		} // constructor
		
		
		updateactive(filenames){
			let obj = this;
			
			// Always keep the metadata files available.
			
			let allMetadataFilenames = obj.retrieveByClass(metadataFile$1).map(fileobj=>fileobj.filename);
			
			obj.required = allMetadataFilenames.concat( unique(filenames) );
			
		} // updateactive
		
		
		dragdropped(files){
			// Several files may have been dragged and dropped, and they may be of several types (metadata, session).
			let obj = this;		
			
			files.forEach(file=>{
				//obj.alwaysrequired.push(file.filename);
				obj.single(userFile, file);
			}); // forEach
			
		} // dragdropped
		
		
		
		ondrop(ev){
			let obj = this;
						
			// Prevent default behavior (Prevent file from being opened)
			  ev.preventDefault();

			  var files = [];
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
				files = ev.dataTransfer.files;
			  } // if
			  
			  obj.dragdropped(files); 
		} // ondrop
		
		ondragover(ev){	
			// Prevent default behavior (Prevent file from being opened)
			ev.preventDefault();
		} // ondragover
		
	} // dbslicefilelibrary
	 // dragOverHandler

	// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.





	// For the file library now set some required extent, and then ask for some of the files.
	let library = new dbslicefilelibrary();



	/* Request a single metadata file. The input for files should be an object:
		file = {
			url: url,
			filename: filename
		}
	 */
	/*
	library.single(metadataFile, {url: "./data/m_c3s_0.csv", filename: "./data/m_c3s_0.csv"});
	library.single(metadataFile, {url: "./data/m_c3s_1.csv", filename: "./data/m_c3s_1.csv"});
	*/
	console.log(library);


	// HERE IM ASSUMING ALL THE FILES IN THE LIBRARY ARE METADATA FILES!
	// Maybe this should be wrapped in hte metadataManager anyway. It's all in hte pipeline.
	let mergerer = new metadatamerger(library.files);
	document.getElementById("fullscreen-menu-container").appendChild(mergerer.node);


	document.getElementById("merging-show").addEventListener("click", ()=>{mergerer.show();} );





	// Should this be it's own store? And the library can respond to it? That means it needs to observe something, making it less flexible? But maybe thats the way it should handle the metadata anyway??

	// Dragging and dropping
	let target = document.getElementById("dragAndDrop");
	target.ondrop = (ev)=>{library.ondrop(ev);};
	target.ondragover = (ev)=>{library.ondragover(ev);};

})));
