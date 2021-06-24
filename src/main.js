// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.



import dbslicefilelibrary from "./core/datahandling/dbslicefilelibrary.js";
import metadatamenu from "./core/metadatamerging/metadatamenu.js";


// Get the container that was setup in index.html.
let fullscreenMenusContainer = document.getElementById("fullscreen-menu-container");


// For the file library now set some required extent, and then ask for some of the files.
let library = new dbslicefilelibrary();
console.log(library);

// Dragging and dropping - there is a background element in index.html that is intended to allow files to be dropped anywhere.
let target = document.getElementById("dragAndDrop");
target.ondrop = (ev)=>{library.ondrop(ev)};
target.ondragover = (ev)=>{library.ondragover(ev)};


// Make the metadata menu. Make the menu support drag and drop. Add an event to a button in index.html to open the menu.
let mergerer = new metadatamenu(library.files);
fullscreenMenusContainer.appendChild(mergerer.node);
mergerer.node.ondrop = (ev)=>{library.ondrop(ev)};
mergerer.node.ondragover = (ev)=>{library.ondragover(ev)};
document.getElementById("merging-show").addEventListener("click", ()=>{
	mergerer.showmerging();
})


// Make a fi