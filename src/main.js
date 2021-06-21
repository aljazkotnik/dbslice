// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.


// How to create

import metadatamanager from "./core/metadatamanager.js";
import dbslicefilelibrary from "./core/dbslicefilelibrary.js";
import metadatamerger from "./core/metadatamerger.js";
import metadataFile from "./core/supportedfiles/metadataFile.js";





// For the file library now set some required extent, and then ask for some of the files.
let library = new dbslicefilelibrary()



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
document.getElementById("fullscreen-menu-container").appendChild(mergerer.node)


document.getElementById("merging-show").addEventListener("click", ()=>{mergerer.show()} )





// Should this be it's own store? And the library can respond to it? That means it needs to observe something, making it less flexible? But maybe thats the way it should handle the metadata anyway??

// Dragging and dropping
let target = document.getElementById("dragAndDrop");
target.ondrop = (ev)=>{library.ondrop(ev)};
target.ondragover = (ev)=>{library.ondragover(ev)};


