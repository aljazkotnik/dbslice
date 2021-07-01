// Array comparison helpers.
import {arrayEqual, unique} from "../helpers.js";

// Superclass
import dbsliceFile from "./dbsliceFile.js";

// Abstract loader to help identifying which metadata variables provide specific on-demand plot data.
import onDemandFile from "./onDemandFile.js";

// Let's see if this works.
import {timeParse} from "d3-time-format";

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
				  break;
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
			testFile.load()
			
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
			variable.supportedTypes = ["number"]
			variable.supportedCategories = ["ordinal", "categorical"]
			return variable
		} // test
	}, // number
	
} // supportedVariableTypes



// Maybe I can even move the structure outside here, and remove the need for the static variable?




// Maybe move the tests outside?
export default class metadataFile extends dbsliceFile {
	  
	onload(obj){
		// This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
		
		// The classification is forced now, as categories data is not used anymore. To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.
		let classificationPromise = obj.classifyvariables();
		return classificationPromise
		
	} // onload
  
  
	format(obj){
		
		// Restructure the data into an expected format
		obj.content = dbsliceFile.test.structure(metadataFile, obj.content)
		
		return obj
		
		
	} // format
  

  
  
	static structure = {
	  
	  csv2metadataFile: function(content){
		  
		  let content_
		  
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
		  }
		  
		  
		  metadataFile.test.content(content_)
		  
		  delete content_.data.columns
		  
		  return content_
	  }, // array
	  
	  json2metadataFile: function(content){
		  
		  let content_
		  
		  
		  content_ = {
			  variables: Object.getOwnPropertyNames(dbsliceFile.testrow(content.data).row).map(function(d){
				  return {name: d, 
					  category: undefined,
						  type: undefined}
			  }),
			  data: content.data,
		  } // content_
		  
		  metadataFile.test.content(content_)
		  
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
		}) // map
		
		// Return the final promise.
		return Promise.all(testPromises)
			.then(function(variableClassification){
				// The promises update the variable classification into the file object directly.
				
				// If any variables have been identified as datetypes, then convert them all to datetypes here to save the hassle for later.
				obj.content.variables.forEach(variable=>{
					if(variable.supportedTypes.includes("datetime")){
						obj.content.data.forEach(row=>{
							row[variable.name] = supportedVariableTypes.string.string2datetime( row[variable.name] );
						}) // forEach
					} // if
				}) // forEach
				
				
				return obj
			})
		
	} // classifyvariables
	
	
	makeVariableClassificationPromise(filename, data, variable){
		
		// Retrieve an actual value already.
		let testrow = dbsliceFile.testrow(data)
		let testval = testrow.row[variable.name]
		
	  
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
						  && content.data.length > 0
		

		// Test to make sure all rows have the same number of columns.
		let areRowsConsistent = true
		let testrow = dbsliceFile.testrow(content.data).row
		content.data.forEach(function(row){
			areRowsConsistent && arrayEqual(
				Object.getOwnPropertyNames(testrow),
				Object.getOwnPropertyNames(row)
			)
		}) // forEach
		
		return isThereAnyData && areRowsConsistent
		
		
		
		
	} // content
  
  } // test
  
  

  
} // metadataFile
