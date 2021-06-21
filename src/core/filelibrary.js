
import {makeObservable, observable, autorun, action} from "mobx";




// Maybe it would be better to create an abstract library, and one that handles the specific needs of the app separately? It would make sense as different apps might have different needs? Or could the metadata management have a computed attribute, and just observe all the files??

// On-demand plots provide the file manager with the type of file they are requesting. Maybe the session should be treated as a plot? So it prescribes the type of file it would like to have, and then that is passed to the file manager, which just loads and stores it? So filemanager would be a filelibrary?

export default class filelibrary {
	constructor(){
		let obj = this;
		
		obj.files = [];
		obj.failed = [];
		
		// The library does not know the whole extent of the files that are currently required - it only knows what was requested of it. To let it know what is actively needed an array of filenames must be communicated to it.
		obj.required = [];
		
		
		// I don't want the files to be loaded over and over again. So maybe it's good to have a background storage that keeps all the files, and a frontend storage that computes itself based on hte background and the currently requested status? Maybe still good, because the unnecessary files are disposed of automatically.
		
		// Make the class observable.
		makeObservable(obj, {
            single: action,
			updateactive: action,
			store: action,
			files: observable,
			required: observable,
        })
		
		
		// It should keep updating itself to make sure that requested matches the files/failed.
		autorun(()=>{obj.update()})
		
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
			fileobj.load()
			fileobj.promise.then(fileobj_ => obj.store(fileobj_))
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
				obj.required.push(fileobj.filename)
				obj.files.push(fileobj)
			} else {
				// Errors were incurred.
				obj.failed.push(fileobj)
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
		}) // filter
		
		
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
			let i = obj.files.indexOf(file)
			obj.files.splice(i,1)
		})
	} // removeFiles
		
} // filelibrary
	