// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.


// How to create

// import metadatamanager from "./core/metadatamanager.js";
import filelibrary from "./core/filelibrary.js";
import metadatamerger from "./core/metadatamerger.js";
import metadataFile from "./core/supportedfiles/metadataFile.js";





// For the file library now set some required extent, and then ask for some of the files.
let testrequired = ["./data/m_c3s_0.csv", "./data/m_c3s_1.csv"];
let library = new filelibrary()
library.required = testrequired;




// The metadatamanager should observe the metadatafiles
// let manager = new metadatamanager(library.files);



/* Request a single metadata file. The input for files should be an object:
	file = {
		url: url,
		filename: filename
	}
 */
library.single(metadataFile, {url: "./data/m_c3s_0.csv", filename: "./data/m_c3s_0.csv"});
library.single(metadataFile, {url: "./data/m_c3s_1.csv", filename: "./data/m_c3s_1.csv"});
console.log(library);







// Append the node to the merging container. Then append the show functionality somewhere.

document.getElementById("merging-show").addEventListener("click", ()=>{
	let container = document.getElementById("fullscreen-menu-container");
	
	if(container.lastChild){
		container.lastChild.remove()
	} // if
	
	
	
	// Maybe wait for hte file to be loaded. Or just append the initialisation to the button.
	let metadatafiles = library.retrieveByClass(metadataFile);

	
	// Make a mergerer.
	let mergerer = new metadatamerger(metadatafiles);
	
	
	
	container.appendChild(mergerer.node);
	
	mergerer.show()
});



