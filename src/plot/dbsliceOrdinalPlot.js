import dbsliceCrossfilterPlot from "dbsliceCrossfilterPlot.js";


/* Alistairs application will require a scatter plot, so I'll make a scatter inset. That will be reusable when I make the AIDE application.
		
		
	Ordinal
	Scatter:
		both axis should have stretchable/scaleable axes + zoom
		should ideally be on a canvas.
		
	Histogram:
		only y axis should be scaleable
		
	Categorical
	Bar:
		only x axis should be scaleable
	
	On-demand
	Line: Same as scatter plot
	Small multiple( Contour 2D, 3D, Geometry 2D, 3D, image)
	
	
*/


let template = `


`


export default class dbsliceOrdinalPlot extends dbsliceCrossfilterPlot{
	constructor(configobj){
		super(configobj);
		let obj = this;
		
		
		
		
	} // constructor
	
	
} // dbsliceCrossfilterSvgPlot