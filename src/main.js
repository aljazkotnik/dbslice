// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.


// How to create
import dbslicefilelibrary from "./core/dbslicefilelibrary.js";

// import metadatamerger from "./core/metadatamerger.js";
// import errorreport from "./core/errorreport.js";
import metadatamenu from "./core/metadatamenu.js";

let fullscreenMenusContainer = document.getElementById("fullscreen-menu-container");


// For the file library now set some required extent, and then ask for some of the files.
let library = new dbslicefilelibrary()
console.log(library);

// Dragging and dropping
let target = document.getElementById("dragAndDrop");
target.ondrop = (ev)=>{library.ondrop(ev)};
target.ondragover = (ev)=>{library.ondragover(ev)};


/*

// HERE IM ASSUMING ALL THE FILES IN THE LIBRARY ARE METADATA FILES!
// Maybe this should be wrapped in hte metadataManager anyway. It's all in hte pipeline.
let mergerer = new metadatamerger(library.files);
fullscreenMenusContainer.appendChild(mergerer.node);
document.getElementById("merging-show").addEventListener("click", ()=>{mergerer.show()} );


// Fake errors with only the relevant attributes:
let errorfiles = [
  {
    filename: "_fileManager.js",
    requester: "User",
    errors: [
        {message: "LoaderError: Unsupported Extension"}
    ]
  },
  
  {
    filename: "_fake file.js",
    requester: "drag & drop",
    errors: [
        {message: "LoaderError: Unsupported content format"}
    ]
  }
];
let errorreporter = new errorreport(errorfiles);
fullscreenMenusContainer.appendChild(errorreporter.node);

*/


let M = new metadatamenu(library.files);
fullscreenMenusContainer.appendChild(M.node);


console.log(M)

