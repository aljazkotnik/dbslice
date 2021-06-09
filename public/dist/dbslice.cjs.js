'use strict';

var initialise_js = require('../../../../../../../../src/core/initialise.js');

// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.

var session = { 
	title : "Axial compressor demo",
	plotRows : [],
	elementId: "target"
};

initialise_js.initialise(session);
