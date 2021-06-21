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
			
			switch( testval.split(".").pop() ){
				case "json":
				case "csv":
					// Try to classify the testval as a file. The requester is the metadata file for which the variables are being classified.
					let testFile = new onDemandFile({url: testval, filename: testval}, filename)
					
					return this.testAsFile(variable, testFile)
				  break;
				default:
					// Unsupported extension.
					
					
					// Try to see if it's a date!
					
					
					return this.defaultclassification(variable)
			} // switch
		}, // test
		
		
		defaultclassification(variable){
			let testobj = this;
			variable.category = "categorical";
			variable.type = "string";
			variable.supportedCategories = testobj.supportedCategories["string"];
			return variable
		}, // defaultclassification
		
		
		testAsDate(variable, testval){
			
			// How to handle dates actually? categorical/ordinal, datetime/string - has to be specific format - `datetime'. The appropriate format will have to be identified and stored too. Or maybe we should just convert the data as it's loaded? Probably more sensible.
			
			let testobj = this;
			
			
			variable.category = "ordinal";
			variable.type = "datetime";
			variable.supportedCategories = testobj.supportedCategories["datetime"];
			return variable
			
			
		}, // testAsDate
		
		
		testAsFile(variable, testFile){
			// Return fully classified variable object.
			let testobj = this;
			
			testFile.load()
		
			// What can go wrong:
			// file is not found
			// file has wrong content
			
			// Why Promise.all ??
			
			// Below 'fileobj' represents 'testFile'.
			return Promise.all([testFile.promise]).then(function(fileobj){
				
				// It's possible that hte file was found and loaded correctly. In that case 'obj.content.format' will contain the name of the file type. Otherwise this field will not be accessible.
				try {
					// Category is the categorisation that will actually be used, and type cannot be changed.
					variable.category = fileobj[0].content.format
					variable.type = fileobj[0].content.format
					variable.supportedCategories = testobj.supportedCategories[variable.type];
					return variable
					
				} catch {
					// If the loading failed for whatever reason the variable is retained as a categorical.
					return testobj.defaultclassification(variable);
					
				} // try
			}) // Promise.all().then
			
			
		} // testAsFile
		
		
	}, // string
	
	
	number: {
		
		test: function(variable){
			variable.category = "ordinal"
			variable.type = "number"
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
				
				// obj.content.categories = variableClassification
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
