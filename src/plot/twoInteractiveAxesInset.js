/*
A multipurpose scatterplot inset. This will be a first step towards developing separate `twoplotaxis' inset, and a redering inset that will actually draw.



This one should define all the user interactions it needs. So it needs to know the variables.

Children (scaterplot, line) should have lasso selection. In the case of the line the data comes from the loaded files, and not from hte metadata. So the plot containing them should update them.
*/




import {html2element} from "../core/helpers.js";
import ordinalAxis from "./ordinalAxis.js";





/*
background: elements for background functionality (e.g. zoom rectangle)
data      : primary data representations
markup    : non-primary data graphic markups, (e.g. compressor map chics) 
x/y-axis  : x/y axis elements
exponent  : power exponent (big number labels may overlap otherwise)
*/
let template = `
	<svg class="plot-area" width="400" height="400">
		
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


// The axis scale needs to have access to the data and to the svg dimensions. Actually not access to the data, but access to the data extent. This has been solved by adding calculated extents to the variable objects.


// It's best to just pass all the variables to the axis, and let it handle everything connected to it. 


// This class is a template for two interactive axes svg based plotting.


// WILL HOLD THE ZOOM + PAN THOUGH!!!.


export default class twoInteractiveAxesInset{
	
	// Generally I'll need variables to select from, and data that needs to be plotted.
	variables = []
	
	
	
	/* For each axis I'll need:
		The name of the selected variable
		The scale to operate with
	*/ 
	
	
	
	
	width = 400
	height = 400
	
	
	
	constructor(variables){
		// What should this one get?
		
		
		let obj = this;
		
		
		obj.node = html2element(template);
		
		
		
		
		// `obj.plotbox' specifies the area of the SVG that the chart should be drawn to.
		obj.y = new ordinalAxis("y", obj.plotbox, variables[0], variables);
		obj.x = new ordinalAxis("x", obj.plotbox, variables[1], variables);
		
		
		obj.node.appendChild(obj.y.d3node.node());
		obj.node.appendChild(obj.x.d3node.node());
		
	
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
	
	
	get plotbox(){
		// Specify the area of the svg dedicated to the plot. In this case it'll be all of it. The margin determines the amount of whitespace around the plot. This whitespace will NOT include the axis labels etc.
		let obj = this;
		let margin = {top: 0, right: 0, bottom: 0, left: 0};
		
		// If the inset was not yet attached the getBoundingClientRect will return an empty rectangle. Instead, have this inset completely control the width and height of hte svg.
		// let svgrect = obj.node.getBoundingClientRect();
		let plot = {
			x: [margin.left, obj.width - margin.left - margin.right], 
			y: [margin.top , obj.height- margin.top  - margin.bottom]
		}
		return plot
		
	} // plotbox
	
	
	
	
} // twoInteractiveAxesInset