/*
A multipurpose scatterplot inset. This will be a first step towards developing separate `twoplotaxis' inset, and a redering inset that will actually draw.



This one should define all the user interactions it needs. So it needs to know the variables.

Children (scaterplot, line) should have lasso selection. In the case of the line the data comes from the loaded files, and not from hte metadata. So the plot containing them should update them.
*/

// d3 to draw the axes.
import * as d3 from "d3";



import {html2element, calculateExponent} from "../core/helpers.js";


import ordinalAxis from "./ordinalAxis.js";


import {makeObservable, observable, computed, action, autorun} from "mobx";



/*
background: elements for background functionality (e.g. zoom rectangle)
data      : primary data representations
markup    : non-primary data graphic markups, (e.g. compressor map chics) 
x/y-axis  : x/y axis elements
exponent  : power exponent (big number labels may overlap otherwise)
*/
let template = `
	<svg class="plot-area">
		
		<g class="background">
			<clipPath>
				<rect></rect>
			</clipPath>
			
			<rect class="zoom-area" fill="rgb(255, 25, 255)"></rect>
			
			<g class="tooltip-anchor">
				<circle class="anchor-point" r="1" opacity="0"></circle>
			</g>
		</g>
		
		<g class="data"></g>
		<g class="markup"></g>
		
		
	</svg>
`;


// The axis scale needs to have access to the data and to the svg dimensions.


// Start thinking about integrating this one within dbsliceOrdinalPlot.




export default class twoInteractiveAxesInset{
	
	// Generally I'll need variables to select from, and data that needs to be plotted.
	variables = []
	data = []
	
	
	/* For each axis I'll need:
		The name of the selected variable
		The scale to operate with
	*/ 
	
	
	
	
	width = 400
	height = 400
	
	
	
	constructor(){
		// What should this one get?
		
		
		let obj = this;
		
		
		obj.node = html2element(template);
		
		
		// `obj.plotbox' specifies the area of the SVG that the chart should be drawn to.
		obj.y = new ordinalAxis("y", obj.plotbox, [0, 1]);
		obj.x = new ordinalAxis("x", obj.plotbox, [0, 1]);
		
		
		obj.node.appendChild(obj.y.d3node.node());
		obj.node.appendChild(obj.x.d3node.node());
		
		
		
		// Make it run automatically when new data becomes available.
		makeObservable(obj, {
			data: observable,
			adddata: action
		})
		
		
		autorun(()=>{ obj.draw() })
		
	} // constructor
	
	
	update(){
		let obj = this;
		
		// Scale the svg.
		obj.node.style.height = obj.height;
		obj.node.style.width = obj.width;
		
		// Update the axes.
		obj.y.setplotbox( obj.plotbox );
		obj.x.setplotbox( obj.plotbox );
		
		
	} // update
	
	
	
	
	draw(){
		// Draw all the tasks onto the plot.
		let obj = this;
		
		d3.select(obj.node)
		  .select("g.data")
		  .selectAll("circle")
		  .data( obj.data )
		  .join(
			enter => enter.append("circle")
			  .attr("r", 5)
			  .attr("fill", "cornflowerblue")
			  .attr("cx", d=>obj.x.scale( d.sepal_length ))
			  .attr("cy", d=>obj.y.scale( d.sepal_width )),
			update => update
			  .attr("cx", d=>obj.x.scale( d.sepal_length ))
			  .attr("cy", d=>obj.y.scale( d.sepal_width )),
			exit => exit.remove()
		  )
		
	} // draw
	
	
	
	get plotbox(){
		// Specify the area of the svg dedicated to the plot. In this case it'll be all of it. The margin determines the amount of whitespace around the plot. This whitespace will NOT include the axis labels etc.
		let obj = this;
		let margin = {top: 0, right: 0, bottom: 0, left: 0};
		let svgrect = obj.node.getBoundingClientRect();
		let plot = {
			x: [margin.left, svgrect.width - margin.left - margin.right], 
			y: [margin.top , svgrect.height- margin.top  - margin.bottom]
		}
		return plot
		
	} // plotbox
	
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
	
	
} // twoInteractiveAxesInset