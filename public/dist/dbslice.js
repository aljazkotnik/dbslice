(function (initialise_js) {
	'use strict';

	// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.
	var session = {
	  title: "Axial compressor demo",
	  plotRows: [],
	  elementId: "target"
	};
	initialise_js.initialise(session);

}(initialise_js));
//# sourceMappingURL=dbslice.js.map
