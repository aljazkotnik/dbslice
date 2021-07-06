(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3'), require('d3-time-format'), require('d3-drag'), require('d3-selection'), require('mobx')) :
	typeof define === 'function' && define.amd ? define(['d3', 'd3-time-format', 'd3-drag', 'd3-selection', 'mobx'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3$2, null, global.d3Drag, global.d3Selection, global.mobx));
}(this, (function (d3$2, d3TimeFormat, d3Drag, d3Selection, mobx) { 'use strict';

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

	var d3__namespace = /*#__PURE__*/_interopNamespace(d3$2);

	function html2element(html){
		let template = document.createElement('template'); 
		template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
		return template.content.firstChild;
	} // html2element





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

	function calculateExponent(val){
		// calculate the exponent for the scientific notation.
		var exp = 0;
		while( Math.floor( Math.abs( val ) / 10**(exp+1) ) > 0 ){ exp+=1; }
		
		// Convert the exponent to multiple of three
		return Math.floor( exp / 3 )*3

	} // calculateExponent

	// import {text as d3text, csv as d3csv, json as d3json, csvParse as d3csvParse} from "d3-dsv";
	let d3$1 = {
		text: d3$2.text,
		csv: d3$2.csv,
		json: d3$2.json,
		csvParse: d3$2.csvParse
	};

	// Handle the erros within the files, and not within a separate object!!


	class dbsliceFile {
		constructor(file, requester){
			
			// How to load if file is an actual File object.
			if(typeof(file) == "string"){
				file = {url: file, filename: file};
			} // if
			
			this.url = file.url;
			this.filename = file.filename;
			this.extension = file.filename.split(".").pop();
			this.promise = undefined;
			
			// Also log the requestor. If this was passed in then use the passed in value, otherwise the requestor is the user.
			this.requester = requester ? requester : "unknown";
			
			
			
			
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
					loader = function(url){ return d3$1.text(url).then(function(text){
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
						  
						  
						return d3$1.csvParse( text_ )

					}) };
					break;
				
				/*
				case "csv":
					loader = function(url){ return d3.csv(url) }
					break;
				*/
					
				case "json":
					loader = function(url){ return d3$1.json(url) };
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
				
				variable.supportedTypes = ["string"];
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
						let fileformat = fileobj[0].content.format;
						
						variable.category = fileformat;
						variable.type = fileformat;
						
						variable.supportedTypes = ["string", fileformat];
						variable.supportedCategories = testobj.supportedCategories[variable.category];
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
					
					variable.supportedTypes = ["number", "datetime"];
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
				variable.supportedTypes = ["number"];
				variable.supportedCategories = ["ordinal", "categorical"];
				return variable
			} // test
		}, // number
		
	}; // supportedVariableTypes



	// Maybe I can even move the structure outside here, and remove the need for the static variable?




	// Maybe move the tests outside?
	class metadataFile extends dbsliceFile {
		  
		onload(obj){
			// This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
			
			// The classification is forced now, as categories data is not used anymore. To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.
			let classificationPromise = obj.classifyvariables();
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
			  }; // content_
			  
			  metadataFile.test.content(content_);
			  
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
					
					// After teh classification is complete some other actions can be taken to ease interaction with the data further along the visualisation pipeline.
					obj.content.variables.forEach(variable=>{
						
						// If any variables have been identified as datetypes, then convert them all to datetypes here to save the hassle for later.
						if(variable.supportedTypes.includes("datetime")){
							obj.content.data.forEach(row=>{
								row[variable.name] = supportedVariableTypes.string.string2datetime( row[variable.name] );
							}); // forEach
						} // if
						
						
						
						// After the classification it is handy to have access to the extents of ordinal variables.
						if(variable.category == "ordinal"){
							variable.extent = d3.extent( obj.content.data, row=>row[variable.name] );
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
				
				variable.supportedTypes = [];
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
		constructor(wrapper, handle){
			// Allow both a handle and a wrapper nodes to be passed in? The handle is applied the draggable behaviour, and the wrapper has its position updated? If tehre is no wrapper the handle is the wrapper?
			let obj = this;
			
			if(!handle){
				handle = wrapper;
			} // if
			
			
			obj.node = wrapper;
			obj.d3handle = d3Selection.select(handle);
			obj.d3wrapper = d3Selection.select(wrapper);
			obj.d3wrapper
			  .style("position", "relative")
			  .style("left", 0 + "px")
			  .style("top", 0 + "px");
			
			// Container that will hold the mouse coordinates.
			obj.mouseorigin = {};
			
			obj.apply();
			
		} // constructor
		
		
		apply(){
			
			let obj = this;
			
			// Apply dragging to it. Store the movement data on the dragdiv object instead? So as to not pollute the actual object?
			let dragobj = d3Drag.drag()
				.on("start", function(event){
					obj.mouseorigin = obj.mouseposition(event);
					
					obj.onstart();
				})
				.on("drag", function(event){
					// let position = obj.position()
					let movement = obj.movement(event);
					
					// Rounding positions to full pixel value hasn't helped much. Maybe it's the css holding everything back?
					
					
					// Move the wrapper.
					obj.d3wrapper
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
			
			obj.d3handle.call(dragobj);
			
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

	let css = {

		card: `
	  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	  position: relative;
	  left: 0px;
	  top: 0px;
	  display: inline-block;
	`,
		
		cardHeader: `
	  width: 100%;
	  background-color: white;
	  cursor: grab;
	  display: inline-block;
	`,
		
		plotTitle: `
	  width: 80%;
      overflow: hidden; 
      white-space: nowrap; 
      text-overflow: ellipsis;
	  display: inline-block;
	  cursor: text;
	  margin: 8px 0px 0px 4px;
	`,
		
		
		// Buttons
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
	  
	    btnSubmit: `
	  background-color: mediumSeaGreen; 
	  color: white;
    `,
	  
	    btnDanger: `
	  background-color: crimson;
	  color: white;
	  float: right;
    `,
		
	}; // css

	// Even if the actual drawing is on a canvas the axes will still be drawn on an svg. Maybe just place the svg in the background? How should the interaction to change the space look like? The variables on hte axis also need to be changeable.
	let template$4 = `
	<div style="${ css.card }">
		<div class="card-header" style="${css.cardHeader}">
			<h4 class="card-title" spellcheck="false" contenteditable="true" style="${css.plotTitle}">This is a new plot.</h4>
			
			<button class="close" style="${css.btn + css.btnDanger}">x</button>
		</div>
		
		<div class="card-body">
		
		</div>
	</div>
`; // template



	class dbsliceCrossfilterPlot extends dragnode {
		constructor(configobj){
			/*
			- Should have access to the current crossfilter selection.
			- Access to the `variables' array.
			- Access to a uniform `color' object for coordination.
			
			To instantiate the template should be converted to node, the basic interactivity should be added.
			
			Ah, how should the drag work? It should work only when the header is grabbed. This allows other drag-and-drop gestures to be performed on hte plot, e.g. panning.
			
			The link between node and data should be maintained -> when I click on the remove plot it will need access to the background object to allow it to be removed from storage. Have a `isDeleted' flag to allow the `sessionManager' to remove unnecessary plots?
			
			The filtering interactions will also need to be mobx actions. The actions can then only be stored on the object itself. The `sessionManager' will have to listen to those objects at specific points (`filterSelection'?) and transfer that to the actual filter object. It should also transfer information from the filter to the plots - if we have two plots of the same variable, and the filter is updated by one the other should update also, right?
			
			Offspring classes will have to limit the variables they can plot. So the next level will be `dbsliceCategoricalPlot`, `dbsliceOrdinalPlot`, and `dbsliceOnDemandPlot`.
			
			For `dbsliceOnDemandPlot` a special data access functionality should be created - maybe we can get rid of relying on a button if the data is loaded in sequence. That should throttle the loading and maintain interactiveness.
			*/
			
			// Instantiate a completely new element.
			let wrapper = html2element(template$4);
			
			// The dragging should only be available through the header.
			super( wrapper, wrapper.querySelector("div.card-header") );
			let obj = this;
			
			
			// Title editing.	
			obj.titleElement.addEventListener("mousedown", evnt=>{evnt.stopPropagation();});
			
			
			// Flag to let a session manager know whether to keep this in the collection or not. It's possible that is the plots are chained together (as in Alistairs application), that subsequent plots will either have to be updated (maybe just to show that an input is missing - maybe by coloring hte axis label red?)
			obj.active = true;
			
			// Removal.
			obj.node.querySelector("button.close").addEventListener("click", ()=>{ obj.remove(); });
			
			
			
			
			// Setup with the user provided inputs.
			obj.config = configobj;
			
		
		
			
			// Declare the mobx observable stuff. active must be observable, and remove must be an action. Nothing else is requried here I think.
			mobx.makeObservable(obj, {
				active: mobx.observable,
				remove: mobx.action
			});
			
		} // constructor
		
		
		
		remove(){
			let obj = this;
			obj.active = false;
		} // remove
		
		
		get titleElement(){
			return this.node.querySelector("h4.card-title");
		} // titleElement
		
		set config(configobj){
			let obj = this;
			if(configobj){
				if( typeof( configobj.title ) == "string" ){
					obj.titleElement.innerText = configobj.title;
				} // if
			} // if
			
		} // config
		
		
		get config(){
			let obj = this;
			/*
				plot type
				title
				variables selected - not defined here!
			*/
			
			return {
				plottype: obj.constructor.name,
				title: obj.titleElement.innerText
			}
		} // config
		
	}

	/* I want to support:
	 - linear		: scaleLinear
	 - logarithmic	: scaleLog - must not cross 0!!
	 
	 And variable types:
	 - number       : can be used as is.
	 - datetime		: scaleTime() 
			.domain([new Date(2000, 0, 1), new Date(2000, 0, 2)])
			.range([0, 960]);
	scales
	*/

	let textattributes = `fill="black" font-size="10px" font-weight="bold"`;


	let exponenttemplate = `
<text class="linear" ${textattributes}>
	<tspan>
	  x10
	  <tspan class="exp" dy="-5"></tspan>
	</tspan>
</text>
`;

	let logtemplate = `
<text class="log" ${textattributes} display="none">
	<tspan>
	  log
	  <tspan class="base" dy="5">10</tspan>
	  <tspan class="eval" dy="-5">(x)</tspan>
	</tspan>
</text>
`;

	// text -> x="-8" / y="-0.32em"
	let template$3 = `
	<g class="graphic"></g>
	
	<g class="model-controls">
		${ exponenttemplate }
		${ logtemplate }
	</g>
	<g class="domain-controls">
		<text class="plus hover-highlight" ${textattributes}>+</text>
		<text class="minus hover-highlight" ${textattributes}>-</text>
	</g>
	<g class="variable-controls">
		<text class="label hover-highlight" ${textattributes} text-anchor="end">Variable name</text>
	</g>
`;


	// The exponent should be replaced with the logarithmic controls if the axis switches from linear to log.


	// Now I need to add in a label saying linear/log
	// DONE!! Maybe a plus/minus next to the axes to increase the axis limits - instead of dragging the labels.



	// The changing between the variables is done in the parent, and not in the axis. This is simply because this class only controls it's own node, and there isn't space to show all the options. Therefore the parent must allocate the space for the change of variables.


	// How to change between the scale interpretations? What should I click? Maybe the exponent text? But then it should always be visible. Let's try that yes. But how to differentiate between clicking on hte text, and editing the text??

	class ordinalAxis{
		
		type = "linear";
		supportedtypes = ["log", "linear"];
		
		// These margins are required to completely fit the scales along with their labels, ticks and domain lines onto the plot.
		margin = {top: 30, right: 30, bottom: 40, left: 40}
		
		constructor(axis, plotbox, initvariable){
			/* `axis' is a flag that signals whether it should be a vertical or horizontal axis, `svgbbox' allows the axis to be appropriately positioned, and therefore define the plotting area, and `ordinalvariable' is a dbslice ordinal variable which is paired with this axis. */
			let obj = this;
			
			// make the axis group.
			obj.d3node = d3__namespace.create("svg:g")
			  .attr("class", `${axis}-axis`)
			  .html(template$3);
			obj.node = obj.d3node.node();
			
			// Get rid of axis by abstracting?
			obj.axis = axis;
			obj.setplotbox(plotbox);
			
			// Set the variable.
			obj.variable = initvariable;
					
			
			
			// Add the functionality to the domain change.
			let controls = obj.d3node.select("g.domain-controls");
			controls.select("text.plus").on("click", ()=>{obj.plusdomain();});
			controls.select("text.minus").on("click", ()=>{obj.minusdomain();});
			
			// Add teh functionality to toggle the axis type.
			let exponent = obj.d3node.select("g.model-controls");
			exponent.on("click", ()=>{
				obj.toggleaxistype();
			});
			
			
			mobx.makeObservable(obj, {
				_variable: mobx.observable,
				domain: mobx.observable,
				plotbox: mobx.observable,
				type: mobx.observable,
				setplotbox: mobx.action,
				setdomain: mobx.action,
				plusdomain: mobx.action,
				minusdomain: mobx.action,
				toggleaxistype: mobx.action,
				variable: mobx.computed,
				range: mobx.computed,
				scale: mobx.computed,
				exponent: mobx.computed
			});
			
			
			mobx.autorun(()=>{obj.position();});
			mobx.autorun(()=>{obj.draw();});
			
		} // constructor
		
		
		// I want to be able to set the variable from outside, and have the axis refresh itself accordingly. `variable' was made a computed because mobx then treats the setter as an acion, and the getter as a computed.
		set variable(variable){
			// Set a new variable for the axis.
			let obj = this;
			
			// Change the variable name.
			let variableselect = obj.d3node.select("g.variable-controls");
			variableselect.select("text.label").html(variable.name);
			
			
			// Change the domain. Before setting the initial domain extend it by 10% on either side to make sure the data fits neatly inside.
			let domaindiff = 0*( variable.extent[1] - variable.extent[0] );
			obj.setdomain([
				variable.extent[0] - 0.1*domaindiff, 
				variable.extent[1] + 0.1*domaindiff
			]);
			
			// Need to sotre it under an anonymous name so it doesn't recursively call this function.
			obj._variable = variable;
		} // variable
		
		get variable(){
			// The the get variable can be a computed, and the variable will be observable anyway.
			// Why doesn't this one compute correctly??
			console.log(`compute variable for ${this.axis} axis`);
			return this._variable
		} // variable
		
		
		// Drawing of the svg axes.
		position(){
			// If the range changes, then the location of the axes must change also. And with them the exponents should change location.
			let obj = this;
			
			// Position the axis. This will impact all of the following groups that are within the axes group.
			let ax = obj.axis == "y" ? obj.margin.left : 0;
			let ay = obj.axis == "y" ? 0 : obj.plotbox.y[1] - obj.margin.bottom;
			obj.d3node.attr("transform", `translate(${ax}, ${ay})` );
			
			// Reposition hte exponent.
			let model = obj.d3node.select("g.model-controls");
			model.attr("text-anchor", obj.axis == "y" ? "start" : "end");
			let mx = obj.axis == "y" ? 0 + 6              : obj.range[1];
			let my = obj.axis == "y" ? obj.margin.top + 3 : 0 - 6;
			model.attr("transform", `translate(${mx}, ${my})`);
			
			// Reposition the +/- controls.
			let controls = obj.d3node.select("g.domain-controls");
			let cx = obj.axis == "y" ? 0 - 5               : obj.range[1] + 10;
			let cy = obj.axis == "y" ? obj.margin.top - 10 : 0 + 5;
			controls.attr("transform", `translate(${cx}, ${cy})`);
			
			// Reposition hte actual plus/minus.
			let dyPlus = obj.axis == "y" ?  0 : -5;
			let dxPlus = obj.axis == "y" ? -5 :  0;
			
			let dyMinus = obj.axis == "y" ? 0 : 5;
			let dxMinus = obj.axis == "y" ? 5 : 1.5;
				
			controls.select("text.plus").attr("dy", dyPlus);
			controls.select("text.plus").attr("dx", dxPlus);
			
			controls.select("text.minus").attr("dy", dyMinus);
			controls.select("text.minus").attr("dx", dxMinus);
			
			
			// Position the variable label.
			let labelgroup = obj.d3node.select("g.variable-controls");
			let label = labelgroup.select("text.label");
			
			// The text should be flush with the axis. To allow easier positioning use the `text-anchor' property.
			label.attr("writing-mode", obj.axis == "y" ? "tb" : "lr");
			
			let lx = obj.axis == "y" ? 30 : obj.range[1];
			let ly = obj.axis == "y" ? -obj.margin.top :  30;
			let la = obj.axis == "y" ? 180 : 0;
			labelgroup.attr("transform", `rotate(${la}) translate(${lx}, ${ly})`);
			
			
		} // position
		
		draw(){
			let obj = this;
			
			obj.d3node
				.selectAll("g.model-controls")
				.select("text")
				  .attr("fill", obj.exponent > 0 ? "black" : "black")
				.select("tspan.exp")
				  .html(obj.exponent);
				  
			// A different scale is created for drawing to allow specific labels to be created (e.g. for scientific notation with the exponent above the axis.)	
			let d3axis = obj.axis == "y" ? d3__namespace.axisLeft : d3__namespace.axisBottom;
			obj.d3node.select("g.graphic")
			  .call( d3axis( obj.scale ) );
			  
			// Control the ticks. Mak
			  
			obj.d3node
			  .select("g.graphic")
			  .selectAll("text")
			  .html(d=>{return obj.tickformat(d)});
			
		} // draw
		
		
		// MOVE ALL THESE SWITCHES SOMEWHERE ELSE. MAYBE JUST CREATE A SUPPORTED OBJECT OUTSIDE SO ALL THE SMALL CHANGES CAN BE HANDLED THERE.
		
		tickformat(d){
			// By default the tick values are assigned to all tick marks. Just control what appears in hte labels.
			let obj = this;
			
			let label;
			switch(obj.type){
				case "log":
				  // Only orders of magnitude. Keep an eye out for number precision when dividing logarithms!
				  let res = Math.round( Math.log(d) / Math.log(obj.scale.base()) *1e6 ) / 1e6;
				  
				  // Counting ticks doesn't work, because the ticks don't necessarily begin with the order of magnitude tick.
				  
				  label  = Number.isInteger(res) ? d : "";
				  break;
				case "linear":
				  // All of them, but adjusted by the common exponent. 
				  label = d/(10**obj.exponent);
				  break;
			} // switch
			
			
			return label
			
			
		} // tickformat
		
		getdrawvalue(d){
			// This is just implemented for more strict control of wht this axis can do. It's not strictly needed because the scale underneath is not being changed.
			
			// Needs the current object as it evaluates the incoming value using the current scale.
			let obj = this;
			
			// Return only the value of the current axis selection.
			return obj.scale( d[obj.variable.name] )
			
		} // getdrawvalue
		
		
		
		// Getting values required to setup the scales.
		get scale(){
			// Computed value based on hte selected scale type.
			let obj = this;
			
			let scale;
			switch(obj.type){
				case "log":
					scale = d3__namespace.scaleLog();
					break;
				case "linear":
				default:
					scale = d3__namespace.scaleLinear();
					break;
				
			} // switch
			
			
			// If the domain is below zero always Math.abs it to work with positive values.
			
			// The domain of this one  goes below zero... It's because the domain was extended there!! Ah, will this break the zooming and panning below zero?? Probably no? Logs aren't defined for negtive values anyway? So what do I do in those cases? Do I just add a translation in the data? For now just
			
			// Deal with the exponent. Will this require accessor functions?? This means that there should be another
			
			// I will want the axis configuration to be stored and communicated further to pass into a python module. How will I do that? For that I'll need to evaluate teh data passed into the module. So I should use an evaluator anyway. Where should this evaluator be present? It should be present in the plot. The axis should return the parameters required for the evaluation. But it also needs to return the scale to be used for drawing. Actually, it just needs to present the draw value given some input. So just have that exposed? And a general evaluator that can handle any combination of inputs?
			
			
			scale.range(obj.range).domain(obj.domain);
			
			return scale
			
		} // get scale
		
		get range(){
			// When initialising a new range - e.g. on plot rescaling, the scales need to change
			let obj = this;
			
			// When the axis is made the first tick is translated by the minimum of the range. Therefore the margin is only added when adjusting the `_range`. 
			
			if(obj.axis == "y"){
				// The browsers coordinate system runs from top of page to bottom. This is opposite from what we're used to in engineering charts. Reverse the range for hte desired change.
				let r = [obj.plotbox.y[0] + obj.margin.top, 
						 obj.plotbox.y[1] - obj.margin.bottom];
				return [r[1], r[0]]; 
			} else {
				return [obj.plotbox.x[0] + obj.margin.left,
						obj.plotbox.x[1] - obj.margin.right];
			} // if
			
		} // get range
		
		setplotbox(plotbox){
			
			// The vertical position of the axis doesn't actually depend on the range. The y-position for the x axis should be communicated from outside. The axis should always get the x and y dimesnion of the svg we're placing it on.
			
			this.plotbox = plotbox;
		} // plotbox
		
		
		// Domain changes
		setdomain(domain){
			this.domain = domain;
		} // domain
		
		plusdomain(){
			// Extend the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
			let obj = this;
			
			let currentdomain = obj.domain;
			let ticks = obj.scale.ticks();
			
			// Calculate the tick difference. If that fails just set the difference to 10% of the domain range.
			let tickdiff = ticks[ticks.length-1] - ticks[ticks.length-2];
			tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]);
			
			// Set the new domain.
			this.domain = [currentdomain[0], currentdomain[1] + tickdiff];
		} // plusdomain
		
		minusdomain(){
			// Reduce the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
			let obj = this;
			
			let currentdomain = obj.domain;
			let ticks = obj.scale.ticks();
			
			// Calculate the tick difference. If that fails just set the difference to 10% of the domain range.
			let tickdiff = ticks[ticks.length-1] - ticks[ticks.length-2];
			tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]);
			
			// Set the new domain.
			this.domain = [currentdomain[0], currentdomain[1] - tickdiff];
		} // minusdomain
		
		
		// Creating model variables.
		
		
		// This exponent should be reworked to just return the transformation configuration.
		
		// Difference between the tick labels, and the data for evaluation. For the evaluation whatever is displayed on hte axes should be passed to the model. But the exponent is just a cosmetic change.
		
		// Can also use the exponent to guess what space we should be viewing the data in? Maybe not. For example erroneous values.
		
		// Difference between a log scale transformation and a log scale axis. The log axis still shows the exact same values, whereas the transform will create new values. Do I want to differentiate between the two, or just apply a log transformation if the data is visualised with a log scale? Even if the data is in hte log scale the user may still want to use it as such?
		
		// Still connect both - what you see is what you get. But on hte log plot maybe still keep the original labels?? Let's see how it goes.
		
		// So if I have an exponent do I change the domain? But the exponent depends on the domain...Create a labelaxis just to draw the labels??
		
		
		
		
		get exponent(){
			let obj = this;
			
			if(obj.domain.length > 0){
				let maxExp = calculateExponent(obj.domain[1]);
				let minExp = calculateExponent(obj.domain[0]);
				
				// Which exponent to return? It has to be a multiple of three - guaranteed by calculateExponent.
				// -10.000 - 10.000 -> 3
				// 0 - 10.000 -> 3
				// 0 - 1.000.000 -> 3 - to minimize string length?
				// 
				// If the order of magnitude is a factor of 3 then return the maximum one. e.g. range of 100 - 100.000 go for 3 to reduce teh string length
				return (maxExp - minExp) >= 3 ? maxExp : minExp
			} else {
				return 0
			} // if
		} // exponent
		
		
		// Changing the scale type. Click on the exponent to change the 
		nexttype(type){
			// Sequence of axis types.
			let sequence = ["linear", "log"];
			
			let imax = sequence.length - 1;
			let inext = sequence.indexOf(type) + 1;
			
			let i = inext > imax ? inext-imax-1 : inext;
			
			return sequence[i];
		} // nexttype
		
		toggleaxistype(){
			// Toggle the axis type. How do I do that?? Ah, just change the type.
			let obj = this;
			
			let newtype = obj.nexttype(obj.type);
			
			
			// If the switch is to log the domain needs to be changed to be positive. So: don't allow the change to log. If the user wants to use a log transformation on the data they need to first et it in the right range.
			let extent = obj.variable.extent;
			let invalidExtent = extent[0]*extent[1] <= 0;
			if(newtype == "log" && invalidExtent){
				// Move to next type.
				newtype = obj.nexttype(newtype);
			} // if
			
			// Always switch back to the original domain.
			obj.setdomain(obj.variable.extent);
			
			// Switch between the model controls.
			let modelcontrols = obj.d3node.select("g.model-controls");
			modelcontrols.selectAll("text").attr("display", "none");
			modelcontrols.select("text." + newtype).attr("display", "");
			
			obj.type = newtype;
		} // toggleaxistype


	} // axis

	// A custom select menu to facilitate the variable selection in menus.

	let variablemenustyle = `
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  display: none; 
  position: absolute;
  max-height: 120px;
  overflow-y: auto;
`;

	let ulstyle = `
  list-style-type: none;
  font-size: 10px;
  font-weight: bold;
  padding-left: 4px;
  padding-right: 4px;
`;


	let template$2 = `
<div class="variable-select-menu" style="${variablemenustyle}">
  <ul style="${ulstyle}">
  </ul>
</div>
`;


	// Differentite between an x and a y one.

	class divSelectMenu{
		_variables = []
		_current = undefined
		
		constructor(axis){
			let obj = this;
			
			
			obj.node = html2element(template$2);
			
			
			// The position of the menu is fully set outside of this class.
			
			// enter().append() doesn't work for unattached elements. So what do? Make menu first, attach variables later? Make them as html elements and do the lookup for hte right data within the class?
			
			// Use d3 to create the options as that allows data to be bound to the HTML elements.
			mobx.makeObservable(obj, {
				_variables: mobx.observable,
				_current: mobx.observable,
				variables: mobx.computed,
				current: mobx.computed
			});
			
			mobx.autorun(()=>{obj.update();});
			
			
		} // constructor
		
		
		// Getters and setters to get an observable attributed that can be assigned as an action.
		set variables(variables){
			if(!this._current){
				this.current = variables[0];
			} // if
			this._variables = variables;
		} // set variables
		
		get variables(){
			return this._variables
		} // get variables
		
		
		set current(d){
			this._current = d;
		} // current
		
		get current(){
			return this._current;
		} // current
		
		
		
		update(){
			let obj = this;
			
			// First remove all li.
			let ul = obj.node.querySelector("ul");
			while (ul.lastChild) {
				ul.removeChild(ul.lastChild);
			} // while
			
			
			// Now add in the needed li objects.
			obj.variables.forEach(variable=>{
				let t = `<li class="hover-highlight">${variable.name}</li>`;
				let li = html2element(t);
				ul.appendChild(li);
				
				li.addEventListener("click", event=>{
					obj.current = variable;
					obj.hide();
				});
			});
		} // update
		
		
		
		
		show(){
			let obj = this;
			obj.node.style.display = "inline-block";
		} // show
		
		hide(){
			let obj = this;
			obj.node.style.display = "none";
		} // hide
		
	} // divSelectMenu

	/*
	A multipurpose scatterplot inset. This will be a first step towards developing separate `twoplotaxis' inset, and a redering inset that will actually draw.



	This one should define all the user interactions it needs. So it needs to know the variables.

	Children (scaterplot, line) should have lasso selection. In the case of the line the data comes from the loaded files, and not from hte metadata. So the plot containing them should update them.
	*/


	let template$1 = `
<div>
	<svg class="plot-area" width="400" height="400">
		
		<g class="background">
			<clipPath>
				<rect></rect>
			</clipPath>
			
			<rect class="zoom-area" fill="rgb(255, 255, 255)" width="400" height="400"></rect>
			
			<g class="tooltip-anchor">
				<circle class="anchor-point" r="1" opacity="0"></circle>
			</g>
		</g>
		
		<g class="data"></g>
		<g class="markup"></g>
		
		<g class="axes"></g>
		
		
	</svg>
	
	<div class="variable-select-menus"></div>
	
</div>
`;


	// The axis scale needs to have access to the data and to the svg dimensions. Actually not access to the data, but access to the data extent. This has been solved by adding calculated extents to the variable objects.


	// It's best to just pass all the variables to the axis, and let it handle everything connected to it. 


	// This class is a template for two interactive axes svg based plotting.


	// Handle the variable changing here!!!

	class twoInteractiveAxesInset{
		
		
		// Add some padding to the plot??
		
		
		// The width and height are added in the template to the svg and zoom area rect. clip path has not been implemented yet. In the end it's good to define actions to change the width and height if needed.
		width = 400
		height = 400
		
		
		
		constructor(variables){
			let obj = this;
			
			
			
			
			obj.node = html2element(template$1);
			
			
			// Add the menu objects.
			obj.ymenu = obj.addVariableMenu(variables);
			obj.xmenu = obj.addVariableMenu(variables);
			
			
			// Make the axis objects, and connect them to the menu selection.
			// `obj.plotbox' specifies the area of the SVG that the chart should be drawn to.
			obj.y = new ordinalAxis("y", obj.plotbox, obj.ymenu.current);
			obj.x = new ordinalAxis("x", obj.plotbox, obj.xmenu.current);
			
			let axisContainer = obj.node.querySelector("g.axes");
			axisContainer.appendChild(obj.y.node);
			axisContainer.appendChild(obj.x.node);
			
			
			
			// The zooming depends on the obj.y/x scales.
			obj.addZooming();
			
			
			// Conytol the appearance/disappearance of the variable selection menus.
			obj.addVariableMenuToggling();
			
			
			// Automatically
			mobx.autorun(()=>{obj.coordinateMenusWithAxes();});
			
		
		} // constructor
		
		
		coordinateMenusWithAxes(){
			let obj = this;
			
			// When the current in the menu changes the axis should be updated.
			obj.y.variable = obj.ymenu.current;
			obj.x.variable = obj.xmenu.current;
			
		} // coordinateMenusWithAxes
		
		
		get plotbox(){
			// Specify the area of the svg dedicated to the plot. In this case it'll be all of it. The margin determines the amount of whitespace around the plot. This whitespace will NOT include the axis labels etc.
			let obj = this;
			let margin = {top: 0, right: 0, bottom: 0, left: 0};
			
			// If the inset was not yet attached the getBoundingClientRect will return an empty rectangle. Instead, have this inset completely control the width and height of hte svg.
			// let svgrect = obj.node.getBoundingClientRect();
			let plot = {
				x: [margin.left, obj.width - margin.left - margin.right], 
				y: [margin.top , obj.height- margin.top  - margin.bottom]
			};
			return plot
			
		} // plotbox
		
		
		// Wrapper functions to show the menus are implemented to facilitate custom positioning. For the y-menu this can't be achieved through CSS as the menu is appended after the SVG (placing it to the right bottom), but it needs to be positioned at the top left. Therefore it must be offset by the SVG width and height.
		// Ah, but left/top and right/bottom are in respect to the parent!!
		xMenuShow(){
			let obj = this;
			
			obj.xmenu.node.style.right = "10px";
			obj.xmenu.node.style.bottom = "10px";
			
			obj.xmenu.show();
		} // xMenuShow
		
		yMenuShow(){
			let obj = this;
			
			obj.ymenu.node.style.left = "5px";
			obj.ymenu.node.style.top = "10px";
			
			obj.ymenu.show();
		} // xMenuShow
		
		
		addVariableMenu(variables){
			let obj = this;
			
			// Add the menu objects.
			let menuContainer = obj.node.querySelector("div.variable-select-menus");
			
			// Variable menu functionality;
			let menu = new divSelectMenu();
			menuContainer.appendChild(menu.node);
			menu.variables = variables;
			
			return menu
		} // addXVariableMenu
		
		
		addVariableMenuToggling(){
			// This could be abstracted further in principle.
			let obj = this;
			
			let xMenuToggle = obj.x.node
			  .querySelector("g.variable-controls")
			  .querySelector("text.label");
			let yMenuToggle = obj.y.node
			  .querySelector("g.variable-controls")
			  .querySelector("text.label");
			
			
			xMenuToggle.addEventListener("click", (event)=>{
			  event.stopPropagation();
			  obj.xMenuShow();
			});
			
			yMenuToggle.addEventListener("click", (event)=>{
			  event.stopPropagation();
			  obj.yMenuShow();
			});
			
			// If the user clicks anywhere else the menus should be hidden.
			obj.node.addEventListener("click", (event)=>{
				obj.xmenu.hide();
				obj.ymenu.hide();
			});
			
		} // addVariableMenuToggling
		
		
		// Maybe this can be an external module? But it depends directly on how the axis are specified - minimum reusability.
		addZooming(){
			let obj = this;
			
			// The current layout will keep adding on zoom. Rethink this for more responsiveness of the website.
			let zoom = d3__namespace.zoom().scaleExtent([0.01, Infinity]).on("zoom", zoomed);
		
			// Zoom operates on a selection. In this case a rect has been added to the markup to perform this task.
			d3__namespace.select( obj.node )
			  .select("g.background")
			  .select("rect.zoom-area")
			  .call(zoom);
			
			
			// As of now (23/03/2020) the default zoom behaviour (https://d3js.org/d3.v5.min.js) does not support independantly scalable y and x axis. If these are implemented then on first zoom action (panning or scaling) will have a movement as the internal transform vector (d3.event.transform) won't corespond to the image. 
			
			// The transformation vector is based on the domain of the image, therefore any manual scaling of the domain should also change it. The easiest way to overcome this is to apply the transformation as a delta to the existing state.
			
			// obj.viewtransform is where the current state is stored. If it is set to -1, then the given zoom action is not performed to allow any difference between d3.event.transform and obj.viewtransform due to manual rescaling of the domain to be resolved.
			obj.viewtransform = d3__namespace.zoomIdentity;
			
			function zoomed(event){
				
				// Get the current scales, and reshape them back to the origin.
				var t = event.transform;
				var t0= obj.viewtransform;
				
				// Check if there was a manual change of the domain
				if(t0 == -1){
					t0 = t;
				} // if
				
				// Hack to get the delta transformation.
				var dt = d3__namespace.zoomIdentity;
				dt.k = t.k / t0.k; 
				dt.x = t.x - t0.x; 
				dt.y = t.y - t0.y;
				
				obj.viewtransform = t;
				
				var xScaleDefined = obj.x.scale != undefined;
				var yScaleDefined = obj.y.scale != undefined;
				if(xScaleDefined && yScaleDefined){
					
					// dt is the transformation of the domain that should take place. So first we get the current range, we apply the view transformation, and then we convert that back to the domain.
					let xdomain = obj.x.scale.range()
					  .map(dt.invertX, dt)
					  .map(obj.x.scale.invert, obj.x.scale);
					obj.x.setdomain( xdomain );
					
					let ydomain = obj.y.scale.range()
					  .map(dt.invertY, dt)
					  .map(obj.y.scale.invert, obj.y.scale);
					obj.y.setdomain( ydomain );
				} // if
			} // zoomed
			  
		} // addZooming
		
		
		
	} // twoInteractiveAxesInset

	/* Alistairs application will require a scatter plot, so I'll make a scatter inset. That will be reusable when I make the AIDE application.
			
			
		Ordinal
		Scatter:
			both axis should have stretchable/scaleable axes + zoom
			should ideally be on a canvas.
			
		Histogram:
			only y axis should be scaleable
			
		Categorical
		Bar:
			only x axis should be scaleable
		
		On-demand
		Line: Same as scatter plot
		Small multiple( Contour 2D, 3D, Geometry 2D, 3D, image)
		
		
	*/



	// The template can now hold one inset per div let's say. Maybe here I want to include a modelInputVariableSelectionInset and a twoInteractiveAxesInset. The drawing on the svg should be implemented here.
	let template = `
<div>
	<div class="model-variable-selection"></div>
	<div class="scatterplot" style="position: relative;"></div>
</div>
`;


	// Since the axes manage all the interactivity with variables the plot must use them to access the data to plot.


	class dbsliceScatterPlot extends dbsliceCrossfilterPlot{
		constructor(content, configobj){
			// `content` still has both metadata in `data`, and variables in `variables`.
			super(configobj);
			let obj = this;
			
			
			// Temporary!!! Ultimaltely this will have to be connected to the filter.
			obj.content = content;
			
			
			// Append the scatter plot backbone.
			let container = obj.node.querySelector("div.card-body");
			container.appendChild(html2element(template));
			
			
			// Add a scatterplot inset. When initialising already pass in the size of the card.
			obj.svgobj = new twoInteractiveAxesInset(content.variables);
			container.querySelector("div.scatterplot").appendChild(obj.svgobj.node);
			
			
			mobx.autorun(()=>{obj.draw();});
			
			console.log(obj);
			
		} // constructor
		
		
		
		
		
		// It all works now!!
		draw(){
			// Draw all the tasks onto the plot.
			let obj = this;
			
			let xaxis = obj.svgobj.x;
			let yaxis = obj.svgobj.y;
			
			d3.select(obj.node)
			  .select("g.data")
			  .selectAll("circle")
			  .data( obj.content.data )
			  .join(
				enter => enter.append("circle")
				  .attr("r", 5)
				  .attr("fill", "cornflowerblue")
				  .attr("cx", d=>xaxis.getdrawvalue(d) )
				  .attr("cy", d=>yaxis.getdrawvalue(d) ),
				update => update
				  .attr("cx", d=>xaxis.getdrawvalue(d) )
				  .attr("cy", d=>yaxis.getdrawvalue(d) ),
				exit => exit.remove()
			  );
			
		} // draw
		
		
	} // dbsliceScatterPlot

	// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.


	let container = document.getElementById("plot-container");


	let datafile = new metadataFile("./_data/iris_data.csv");
	datafile.load();
	datafile.promise.then(fileobj=>{
		
		// Make an inset, and attach it to a plot.
		let plot = new dbsliceScatterPlot(fileobj.content);
		container.appendChild(plot.node);
		
		
		plot.draw();
	}); // then

})));
