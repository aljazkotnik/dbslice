// Array comparison helpers.
import {arrayEqual} from "../helpers.js";

// Superclass
import dbsliceFile from "./dbsliceFile.js";

// Abstract loader to help identifying which metadata variables provide specific on-demand plot data.
import onDemandFile from "./onDemandFile.js";



// Maybe move the tests outside?
export default class metadataFile extends dbsliceFile {
	  
	onload(obj){
		// This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
		
		// Check if suitable categories have already been declared.
		let classificationPromise
		if(!obj.content.categories){
			// Launch the variable classification.
			classificationPromise = obj.classify.all(obj)
		} else { 
			classificationPromise = Promise.resolve().then(d=>{return obj}); 
		
		}// if 
		
		// To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.
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
				  return {name: d, 
					  category: undefined,
						  type: undefined}
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
		  }
			  
		  // Check if declared variables contain all variables in the data.
		  let allVariablesDeclared = arrayEqual(
				metadataFile.cat2var(content.header).map(d=>d.name),
				content_.variables.map(d=>d.name)
		  )
		  
		  // All variables are declared, but have they been declared in the right categories??
		  
		  if(allVariablesDeclared){
			  // All variables have been declared. The categories can be assigned as they are.
			  content_.variables = metadataFile.cat2var(content.header)
			  
		  } // if
		  
		  metadataFile.test.content(content_)
		  
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
		})
		
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
		let testrow = dbsliceFile.testrow(obj.content.data)
		let testval = testrow.row[variable.name]
		
	  
		// Split the testing as per the variable type received.
		let promise
		switch( typeof(testval) ){
			case "string":
				// String can be a file too.
				variable.type = "string"
				promise = obj.classify.string(obj, variable, testval)
				
			  break;
			  
			case "number":
				variable.category = "ordinal"
				variable.type = "number"
				promise = variable
				
			  break;
			  
			default:
				variable.category = "Unused"
				variable.type = undefined
				promise = variable
				
		} // switch
			
		return promise
	  
	}, // variable
  
	string: function(obj, variable, testval){
		// If the string is a file, load it in to identify it's structure. It's not important which extension the file has, but what is it's internal structure.
		
		// 'obj' is needed to construct an on-load response, 'variable' and 'testval' to have the name value pair.  
		
		let promise
		
		// Create a new onDemandFile to load in it's contents.
		
		
		switch( testval.split(".").pop() ){
			case "json":
			case "csv":
				// Try to classify the testval as a file. The requester is the metadata for which the variables are being classified.
				let testFile = new onDemandFile({url: testval, filename: testval}, obj.filename)
				
				promise = obj.classify.file(variable, testFile)
				
			  break;
			default:
				// Unsupported extension.
				variable.category = "categorical"
				promise = variable
		} // switch
		
		
		return promise
	  
	}, // string
	
	file: function(variable, testFile){
		// Make a new generic on-demand file, and return a promise that will return the file type.
		
		testFile.load()
		
		// What can go wrong:
		// file is not found
		// file has wrong content
		
		// Below 'obj' represents 'testFile'.
		return Promise.all([testFile.promise]).then(function(obj){
			
			// It's possible that hte file was found and loaded correctly. In that case 'obj.content.format' will contain the name of the file type. Otherwise this field will not be accessible.
			try {
				// Category is the categorisation that will actually be used, and type cannot be changed.
				variable.category = obj[0].content.format
				variable.type = obj[0].content.format
				return variable
				
			} catch {
				// If the loading failed for whatever reason the variable is retained as a categorical.
				variable.category = "categorical"
				return variable
				
			} // try
		})
		
		
	}, // file
  
	  
  } // classify
  

  
  // Where is this used??
  static cat2var(categories){
	  // If categories are given, just report the categorisation. But do check to make sure all of the variables are in the categories!! What to do with label and taskId??
	  
	  let variables = []
	  let declaredVariables
	  
	  Object.getOwnPropertyNames(categories)
		.forEach(function(category){
		  if(categoryInfo.supportedCategories.includes(category)){
			  declaredVariables = categories[category].map(
				function(d){
					return {name: d, 
						category: category,
							type: categoryInfo.cat2type[category]}
				})
				
			  variables = variables.concat(declaredVariables)  
		  } // if
		  
		})
	  
	  // Check that all hte variables are declared!
	  
	  return variables
	  
  } // category2variable
  
  

  
  
} // metadataFile
