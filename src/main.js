// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.


/* BLOCK FOR WORK ON SCATTERPLOT

import {autorun} from "mobx";

import dbsliceFileLibrary from "./core/datahandling/dbsliceFileLibrary.js";
import metadatamenu from "./core/metadatamerging/metadatamenu.js";
import dbsliceSessionManager from "./core/dbsliceSessionManager.js";
import filtermanager from "./core/filtermanager.js";

// Get the container that was setup in index.html.
let fullscreenMenusContainer = document.getElementById("fullscreen-menu-container");
let plotContainer = document.getElementById("plot-container");


// For the file library now set some required extent, and then ask for some of the files.
let library = new dbsliceFileLibrary();




// Dragging and dropping - there is a background element in index.html that is intended to allow files to be dropped anywhere.
let target = document.getElementById("dragAndDrop");
target.ondrop = (ev)=>{library.ondrop(ev)};
target.ondragover = (ev)=>{library.ondragover(ev)};


// Make the metadata menu. Make the menu support drag and drop. Add an event to a button in index.html to open the menu.
let mergerer = new metadatamenu(library);
fullscreenMenusContainer.appendChild(mergerer.node);
mergerer.node.ondrop = (ev)=>{library.ondrop(ev)};
mergerer.node.ondragover = (ev)=>{library.ondragover(ev)};
document.getElementById("merging-show").addEventListener("click", ()=>{
	mergerer.showmerging();
})
console.log(mergerer)

// TO DO
//	- Remove file button
//	- Button to add files
//	- Metadata merging: the mergerer should create the metadata.




// Filter manager. Initiate by observing the `mergerer'.
let filter = new filtermanager();
console.log(filter);

// Automatically update the filter with new data if needed.
autorun(()=>{ filter.swapdata(mergerer.mergedmetadata) });



// Force load some files.
// library.dragdropped(["./data/m_c3s.csv"]);
// library.dragdropped(["./data/m_c3s_1.csv"]);




// The session also depends on the metadata - the variables that are available, and the data that is selected should be updated in hte plots.

// The filter object should be passed to it. Or the autorun call can be made here to ensure the data selection is constantly updated?

let session = new dbsliceSessionManager(plotContainer);
document.getElementById("add-plot").addEventListener("click", ()=>{
	// Implement new plots in here.
	session.addplot();
})


*/


import metadataFile from "./core/supportedfiles/metadataFile.js";
import dbsliceScatterPlot from "./plot/dbsliceScatterPlot.js";


let container = document.getElementById("plot-container");


let datafile = new metadataFile("./_data/iris_data.csv");
datafile.load();
datafile.promise.then(fileobj=>{
	
	// Make an inset, and attach it to a plot.
	let plot = new dbsliceScatterPlot(fileobj.content);
	container.appendChild(plot.node);
	
	
	plot.draw()
}) // then







