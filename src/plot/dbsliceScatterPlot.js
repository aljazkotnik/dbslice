import {html2element} from "../core/helpers.js";

import dbsliceCrossfilterPlot from "./dbsliceCrossfilterPlot.js";

import twoInteractiveAxesInset from "./twoInteractiveAxesInset.js";


import {autorun} from "mobx";

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



// The template can now hold one inset per div let's say. Maybe here I want to include a modelInputVariableSelectionInset and a twoInteractiveAxesInset. The drawing on the svg should be implemented here.
let template = `
<div>
	<div class="model-variable-selection"></div>
	<div class="scatterplot"></div>
</div>
`


// Since the axes manage all the interactivity with variables the plot must use them to access the data to plot.


export default class dbsliceScatterPlot extends dbsliceCrossfilterPlot{
	constructor(content, configobj){
		// `content` still has both metadata in `data`, and variables in `variables`.
		super(configobj);
		let obj = this;
		
		
		// Temporary!!! Ultimaltely this will have to be connected to the filter.
		obj.content = content;
		
		
		// Append the scatter plot backbone.
		let container = obj.node.querySelector("div.card-body");
		container.appendChild(html2element(template));
		
		
		// Add a scatterplot inset. When initialising already pass in the size of the card.
		obj.svgobj = new twoInteractiveAxesInset(content.variables);
		container.querySelector("div.scatterplot").appendChild(obj.svgobj.node);
		
		
		autorun(()=>{obj.draw()})
		
	} // constructor
	
	
	/*
	// Shouldn't this be moved to the plot??
	adddata(content){
		// When new data is given to the plots they should update.
		this.data = content.data;
		this.variables = content.variables;
		
		// Pick an x and y variable.
		this.xvariable = content.variables[0];
		this.yvariable = content.variables[1];
		
		this.x.setdomain(d3.extent(content.data, d=>d.sepal_length))
		this.y.setdomain(d3.extent(content.data, d=>d.sepal_width))
	}
	*/
	
	
	// It all works now!!
	draw(){
		// Draw all the tasks onto the plot.
		let obj = this;
		
		let xaxis = obj.svgobj.x;
		let yaxis = obj.svgobj.y;
		
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll("circle")
		  .data( obj.content.data )
		  .join(
			enter => enter.append("circle")
			  .attr("r", 5)
			  .attr("fill", "cornflowerblue")
			  .attr("cx", d=>xaxis.scale( d[xaxis.variable.name] ))
			  .attr("cy", d=>yaxis.scale( d[yaxis.variable.name] )),
			update => update
			  .attr("cx", d=>xaxis.scale( d[xaxis.variable.name] ))
			  .attr("cy", d=>yaxis.scale( d[yaxis.variable.name] )),
			exit => exit.remove()
		  )
		
	} // draw
	
	
} // dbsliceScatterPlot