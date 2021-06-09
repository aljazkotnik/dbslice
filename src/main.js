// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.


// How to create

// 


import {initialise} from "/src/core/initialise.js"

var session = { 
	title : "Axial compressor demo",
	plotRows : [],
	elementId: "target"
};

initialise(session);