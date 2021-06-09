(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../../../../../../../../src/core/initialise.js')) :
	typeof define === 'function' && define.amd ? define(['../../../../../../../../src/core/initialise'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.initialise_js));
}(this, (function (initialise_js) { 'use strict';

	// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.

	var session = { 
		title : "Axial compressor demo",
		plotRows : [],
		elementId: "target"
	};

	initialise_js.initialise(session);

})));
