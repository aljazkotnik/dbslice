
import * as d3 from "d3";
import {html2element, calculateExponent} from "../core/helpers.js";

import {makeObservable, observable, computed, autorun, action} from "mobx";

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
let template = `
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



// Maybe it'd be better

export default class ordinalAxis{
	
	type = "linear";
	supportedtypes = ["log", "linear"];
	
	// These margins are required to completely fit the scales along with their labels, ticks and domain lines onto the plot.
	margin = {top: 30, right: 20, bottom: 40, left: 40}
	
	constructor(axis, plotbox, initvariable, ordinalvariables){
		/* `axis' is a flag that signals whether it should be a vertical or horizontal axis, `svgbbox' allows the axis to be appropriately positioned, and therefore define the plotting area, and `ordinalvariable' is a dbslice ordinal variable which is paired with this axis. */
		let obj = this;
		
		// Get rid of axis by abstracting?
		obj.axis = axis;
		obj.setplotbox(plotbox);
		
		obj.variable = initvariable;
		obj.variableoptions = ordinalvariables;
		
		
		obj.setdomain(initvariable.extent);
		
		// When the axis is made the first tick is translated by the minimum of the range. Therefore the margin is only added when adjusting the `_range`. 
		
		// The vertical position of the axis doesn't actually depend on the range. The y-position for the x axis should be communicated from outside. The axis should always get the x and y dimesnion of the svg we're placing it on.
		
		
		obj.d3node = d3.create("svg:g")
		  .attr("class", "axis")
		  .html(template);
		  
		
		// Add the functionality to the domain change.
		let controls = obj.d3node.select("g.controls");
		controls.select("text.plus").on("click", ()=>{obj.plusdomain()})
		controls.select("text.minus").on("click", ()=>{obj.minusdomain()})  
		
		
		makeObservable(obj, {
			domain: observable,
			plotbox: observable,
			setplotbox: action,
			setdomain: action,
			plusdomain: action,
			minusdomain: action,
			range: computed,
			scale: computed,
			exponent: computed
		})
		
		
		autorun(()=>{obj.position()})
		autorun(()=>{obj.draw()})
		
		
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
			
		controls.select("text.plus").attr("dy", dyPlus)
		controls.select("text.plus").attr("dx", dxPlus)
		
		controls.select("text.minus").attr("dy", dyMinus)
		controls.select("text.minus").attr("dx", dxMinus)
		
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
		
		let scale
		switch(obj.type){
			case "log":
				scale = d3.scaleLog();
				break;
			case "linear":
			default:
				scale = d3.scaleLinear();
				break;
			
		} // switch
		
		scale.range(obj.range).domain(obj.domain)
		
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
			  .html(obj.exponent)
			  
		let d3axis = obj.axis == "y" ? d3.axisLeft : d3.axisBottom;
		obj.d3node.select("g.graphic")
		  .call( d3axis( obj.scale ) )
		
	} // draw
	
	
	
	// Not referenced!!
	updateticks(){
		
		let obj = this;
		
		
		// x\y ew-resize\ns-resize
		obj.d3node
		   .selectAll(".tick")
		   .selectAll("text")
			 .style("cursor", "ew-resize")
		     
		// Resolve the tick texts getting bold through CSS!!
		
	} // updateticks
	

} // axis