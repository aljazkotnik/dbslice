'use strict';

var d3$1 = require('d3');
var mobx = require('mobx');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			}
		});
	}
	n['default'] = e;
	return Object.freeze(n);
}

var d3__namespace = /*#__PURE__*/_interopNamespace(d3$1);

function html2element(html){
	let template = document.createElement('template'); 
	template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return template.content.firstChild;
} // html2element

function calculateExponent(val){
	// calculate the exponent for the scientific notation.
	var exp = 0;
	while( Math.floor( val / 10**(exp+1) ) > 0 ){ exp+=1; }
	
	// Convert the exponent to multiple of three
	return Math.floor( exp / 3 )*3

} // calculateExponent

/* I want to support:
 - linear		: scaleLinear
 - logarithmic	: scaleLog - must not cross 0!!
 
 And variable types:
 - number       : can be used as is.
 - datetime		: scaleTime() 
		.domain([new Date(2000, 0, 1), new Date(2000, 0, 2)])
		.range([0, 960]);
scales
*/

let textattributes = `fill="black" font-size="10px" font-weight="bold"`;

// text -> x="-8" / y="-0.32em"
let template$1 = `
	<g class="graphic"></g>
	<g class="exponent">
		<text ${textattributes}>
			<tspan>
			  x10
			  <tspan class="exp" dy="-5"></tspan>
			</tspan>
		</text>
	</g>
	<g class="controls">
		<text class="plus hover-highlight" ${textattributes}>+</text>
		<text class="minus hover-highlight" ${textattributes}>-</text>
	</g>
`;


// The exponent should be replaced with the logarithmic controls if the axis switches from linear to log.


// Now I need to add in a label saying linear/log
// DONE!! Maybe a plus/minus next to the axes to increase the axis limits - instead of dragging the labels.

// Also need zoom + pan: first do this one.



class ordinalAxis{
	
	type = "linear";
	supportedtypes = ["log", "linear"];
	
	// These margins are required to completely fit the scales along with their labels, ticks and domain lines onto the plot.
	margin = {top: 30, right: 20, bottom: 40, left: 40}
	
	constructor(axis, plotbox, initdomain){
		/* `axis' is a flag that signals whether it should be a vertical or horizontal axis, `svgbbox' allows the axis to be appropriately positioned, and therefore define the plotting area, and `initdomain' is the initial domain into which the data should be visualised. */
		let obj = this;
		
		
		obj.axis = axis;
		
		obj.setplotbox(plotbox);
		obj.setdomain(initdomain);
		
		// When the axis is made the first tick is translated by the minimum of the range. Therefore the margin is only added when adjusting the `_range`. 
		
		// The vertical position of the axis doesn't actually depend on the range. The y-position for the x axis should be communicated from outside. The axis should always get the x and y dimesnion of the svg we're placing it on.
		
		
		obj.d3node = d3__namespace.create("svg:g")
		  .attr("class", "axis")
		  .html(template$1);
		  
		
		// Add the functionality to the domain change.
		let controls = obj.d3node.select("g.controls");
		controls.select("text.plus").on("click", ()=>{obj.plusdomain();});
		controls.select("text.minus").on("click", ()=>{obj.minusdomain();});  
		
		
		mobx.makeObservable(obj, {
			domain: mobx.observable,
			plotbox: mobx.observable,
			setplotbox: mobx.action,
			setdomain: mobx.action,
			plusdomain: mobx.action,
			minusdomain: mobx.action,
			range: mobx.computed,
			scale: mobx.computed,
			exponent: mobx.computed
		});
		
		
		mobx.autorun(()=>{obj.position();});
		mobx.autorun(()=>{obj.draw();});
		
		
	} // constructor
	
	
	
	position(){
		// If the range changes, then the location of the axes must change also. And with them the exponents should change location.
		let obj = this;
		
		// Position the axis.
		let translate = obj.axis == "y" ? 
		  `translate(${obj.margin.left}, ${0})` :
		  `translate(${0}, ${obj.plotbox.y[1] - obj.margin.bottom})`;
		obj.d3node.attr("transform", translate );
		
		// Reposition hte exponent.
		let exponent = obj.d3node.select("g.exponent");
		let exponentTranslate = obj.axis == "y" ?
		  `translate(${0 + 6}, ${obj.margin.top + 3})` :
		  `translate(${obj.range[1] - 10 }, ${0 - 6})`;
		exponent.attr("transform", exponentTranslate);
		
		// Reposition the +/- controls.
		let controls = obj.d3node.select("g.controls");
		let controlsTranslate = obj.axis == "y" ?
		  `translate(${0 - 5}, ${obj.margin.top - 10})` :
		  `translate(${obj.range[1] + 10}, ${0 + 5})`;
		controls.attr("transform", controlsTranslate);
		
		// Reposition hte actual plus/minus.
		let dyPlus = obj.axis == "y" ?  0 : -5;
		let dxPlus = obj.axis == "y" ? -5 :  0;
		
		let dyMinus = obj.axis == "y" ? 0 : 5;
		let dxMinus = obj.axis == "y" ? 5 : 1.5;
			
		controls.select("text.plus").attr("dy", dyPlus);
		controls.select("text.plus").attr("dx", dxPlus);
		
		controls.select("text.minus").attr("dy", dyMinus);
		controls.select("text.minus").attr("dx", dxMinus);
		
	} // position
	
	
	get range(){
		// When initialising a new range - e.g. on plot rescaling, the scales need to change
		let obj = this;
		
		if(obj.axis == "y"){
			// The browsers coordinate system runs from top of page to bottom. This is opposite from what we're used to in engineering charts. Reverse the range for hte desired change.
			let r = [obj.plotbox.y[0] + obj.margin.top, 
					 obj.plotbox.y[1] - obj.margin.bottom];
			return [r[1], r[0]]; 
		} else {
			return [obj.plotbox.x[0] + obj.margin.left,
					obj.plotbox.x[1] - obj.margin.right];
		} // if
		
	} // get range
	
	
	setplotbox(plotbox){
		this.plotbox = plotbox;
	} // plotbox
	
	setdomain(domain){
		this.domain = domain;
	} // domain
	
	plusdomain(){
		// Extend the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
		let obj = this;
		
		let currentdomain = obj.domain;
		let ticks = obj.scale.ticks();
		
		// Calculate the tick difference. If that fails just set the difference to 10% of the domain range.
		let tickdiff = ticks[ticks.length-1] - ticks[ticks.length-2];
		tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]);
		
		// Set the new domain.
		this.domain = [currentdomain[0], currentdomain[1] + tickdiff];
	} // plusdomain
	
	minusdomain(){
		// Reduce the domain by one difference between the existing ticks. It's always extended by hte distance between the last two ticks.
		let obj = this;
		
		let currentdomain = obj.domain;
		let ticks = obj.scale.ticks();
		
		// Calculate the tick difference. If that fails just set the difference to 10% of the domain range.
		let tickdiff = ticks[ticks.length-1] - ticks[ticks.length-2];
		tickdiff = tickdiff ? tickdiff : 0.1(currentdomain[1] - currentdomain[0]);
		
		// Set the new domain.
		this.domain = [currentdomain[0], currentdomain[1] - tickdiff];
	} // minusdomain
	
	
	get scale(){
		// Computed value based on hte selected scale type.
		let obj = this;
		
		let scale;
		switch(obj.type){
			case "log":
				scale = d3__namespace.scaleLog();
				break;
			case "linear":
			default:
				scale = d3__namespace.scaleLinear();
				break;
			
		} // switch
		
		scale.range(obj.range).domain(obj.domain);
		
		return scale
		
	} // get scale
	
	get exponent(){
		let obj = this;
		
		if(obj.domain.length > 0){
			let maxExp = calculateExponent(obj.domain[1]);
			let minExp = calculateExponent(obj.domain[0]);
			return (maxExp - minExp) > 3 ? 3 : minExp
		} else {
			return 0
		} // if
	} // exponent
	
	draw(){
		let obj = this;
		
		obj.d3node
			.selectAll("g.exponent")
			.select("text")
			  .attr("fill", obj.exponent > 0 ? "black" : "none")
			.select("tspan.exp")
			  .html(obj.exponent);
			  
		let d3axis = obj.axis == "y" ? d3__namespace.axisLeft : d3__namespace.axisBottom;
		obj.d3node.select("g.graphic")
		  .call( d3axis( obj.scale ) );
		
	} // draw
	
	
	
	// Not referenced!!
	updateticks(){
		
		let obj = this;
		
		
		// x\y ew-resize\ns-resize
		obj.d3node
		   .selectAll(".tick")
		   .selectAll("text")
			 .style("cursor", "ew-resize");
		     
		// Resolve the tick texts getting bold through CSS!!
		
	} // updateticks
	

} // axis

/*
A multipurpose scatterplot inset. This will be a first step towards developing separate `twoplotaxis' inset, and a redering inset that will actually draw.



This one should define all the user interactions it needs. So it needs to know the variables.

Children (scaterplot, line) should have lasso selection. In the case of the line the data comes from the loaded files, and not from hte metadata. So the plot containing them should update them.
*/



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




class twoInteractiveAxesInset{
	
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
		mobx.makeObservable(obj, {
			data: mobx.observable,
			adddata: mobx.action
		});
		
		
		mobx.autorun(()=>{ obj.draw(); });
		
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
		
		d3__namespace.select(obj.node)
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
		  );
		
	} // draw
	
	
	
	get plotbox(){
		// Specify the area of the svg dedicated to the plot. In this case it'll be all of it. The margin determines the amount of whitespace around the plot. This whitespace will NOT include the axis labels etc.
		let obj = this;
		let margin = {top: 0, right: 0, bottom: 0, left: 0};
		let svgrect = obj.node.getBoundingClientRect();
		let plot = {
			x: [margin.left, svgrect.width - margin.left - margin.right], 
			y: [margin.top , svgrect.height- margin.top  - margin.bottom]
		};
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
		
		this.x.setdomain(d3__namespace.extent(content.data, d=>d.sepal_length));
		this.y.setdomain(d3__namespace.extent(content.data, d=>d.sepal_width));
	}
	
	
} // twoInteractiveAxesInset

// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.



// d3.csv reads everything as strings, and this function can convert all number strings to numbers.
function convertNumbers(array){
	return array.map(function(row){
			
		var r = {};
		for (var k in row) {
			r[k] = +row[k];
			if (isNaN(r[k])) {
				r[k] = row[k];
			} // if
		} // for
	  return r;
	})
} // convertNumbers



let plotContainer = document.getElementById("plot-container");

// Make an inset, and attach it to a plot.
let plot = new twoInteractiveAxesInset();
plotContainer.appendChild(plot.node);
plot.update();
console.log(plot);

// Work on just developing the twoaxis inset here.
d3.csv("./_data/iris_data.csv")
  .then(content=>{ return {
	  data: convertNumbers(content),
	  variables: content.columns
    }
  })
  .then(content=>{ 
	
	plot.adddata(content);
});
