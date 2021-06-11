// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.


// How to create

import metadatamanager from "./core/metadatamanager.js";
import filelibrary from "./core/filelibrary.js";
import metadataFile from "./core/supportedfiles/metadataFile.js";





// For the file library now set some required extent, and then ask for some of the files.
let testrequired = ["./data/m_c3s.csv"];
let library = new filelibrary()
library.required = testrequired;



// The metadatamanager should observe the metadatafiles
let manager = new metadatamanager(library.files);


console.log(library, manager);



// Print the content of the library now.
console.log(library.files)


/* Request a single metadata file. The input for files should be an object:
	file = {
		url: url,
		filename: filename
	}
 */
library.single(metadataFile, {url: "./data/m_c3s.csv", filename: "./data/m_c3s.csv"});


console.log(library.files)


console.log(manager.files)

