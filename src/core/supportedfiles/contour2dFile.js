import dbsliceFile from "./dbsliceFile.js";

export default class contour2dFile extends dbsliceFile {
		
		
	format(obj){
		
		obj.content = dbsliceFile.test.structure(contour2dFile, obj.content)
		return obj
		
	} // format
	
	static structure = {
		// This can now more easily handle different ways of specifying contours. Also convenient to implement the data structure conversion here, e.g. from points to triangles.
		
		json2contour2dFile: function(content){
			
			// Not supposed to be an array! It should contain a single surface. If content.surfaces IS an array, then just select the first one.
			let surface = Array.isArray(content.surfaces) ? content.surfaces[0] : content.surfaces
			
			// In the content I expect an array called `y', `x', `v' (or others), and `size'. The first three must all be the same length, and the last one must have 2 numbers.
			
			let L = (surface.x.length == surface.y.length) && (surface.x.length > 3) ? surface.x.length : undefined
			
				
			// Find all possible variables. The variables are deemed available if they are the same length as the x and y arrays. Also, they must contain only numeric values.
			let compulsory = ["x", "y", "size"]
			let variables = Object.getOwnPropertyNames(surface).filter(function(d){
				
				let L_
				if(!compulsory.includes(d)){
					// This is a possible user variable. It fits if it is an array of the same length as the geometrical parameters, and if it has numeric values.
					let vals = surface[d]
					
					
					
					L_ = Array.isArray( vals ) && !vals.some(isNaN) ? vals.length : undefined
				} else {
					L_ = undefined
				} // if
				
				// The particular variable has to be an array of exactly the same length as `x' and `y'.
				
				return L_ == L
			})
			
			
			// Variables must have at least one option.
			let content_
			if(variables.length > 0){
				content_ = {
					variables: variables,
					surface: surface
				}
			} else {
				throw(new Error("InvalidFile: Unsupported data structure")) 
			} // if
		
			// Hard-coded expected contents
			return content_
				
					
		}, // object
		
	} // structure
	
} // contour2dFile
