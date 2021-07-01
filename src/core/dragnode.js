import {drag} from "d3-drag";
import {select} from "d3-selection";

// Formulate this as a class? The it can be called as:
// A = new dragdiv() ...


export default class dragnode {
	constructor(wrapper, handle){
		// Allow both a handle and a wrapper nodes to be passed in? The handle is applied the draggable behaviour, and the wrapper has its position updated? If tehre is no wrapper the handle is the wrapper?
		let obj = this;
		
		if(!handle){
			handle = wrapper;
		} // if
		
		
		obj.node = wrapper;
		obj.d3handle = select(handle);
		obj.d3wrapper = select(wrapper);
		obj.d3wrapper
		  .style("position", "relative")
		  .style("left", 0 + "px")
		  .style("top", 0 + "px");
		
		// Container that will hold the mouse coordinates.
		obj.mouseorigin = {};
		
		obj.apply();
		
	} // constructor
	
	
	apply(){
		
		let obj = this;
		
		// Apply dragging to it. Store the movement data on the dragdiv object instead? So as to not pollute the actual object?
		let dragobj = drag()
			.on("start", function(event){
				obj.mouseorigin = obj.mouseposition(event);
				
				obj.onstart();
			})
			.on("drag", function(event){
				// let position = obj.position()
				let movement = obj.movement(event)
				
				// Rounding positions to full pixel value hasn't helped much. Maybe it's the css holding everything back?
				
				
				// Move the wrapper.
				obj.d3wrapper
				  .style("left", (obj.position.x + movement.x) + "px")
				  .style("top", (obj.position.y + movement.y) + "px");
				  
				// Update the last mouse position
				obj.mouseorigin = obj.mouseposition(event);
				
				
				obj.ondrag();
			})
			.on("end", function(event){
				// The parent should update it's position automatically. How do I do that? Maybe the parent should listen to some action? Or maybe it's position should just be calculated when it's needed?
				
				obj.onend();
			})
		
		obj.d3handle.call(dragobj);
		
	} // apply
	
	
	get position(){
		// Get the position of the dragdiv.
		let obj = this;
		
		return {
			x: parseInt( obj.node.style.left ),
			y: parseInt( obj.node.style.top ),
			w: obj.node.offsetWidth,
			h: obj.node.offsetHeight
		}
		
	} // position
	
	
	movement(event){
		// Get the delta of the movement from hte origin to the current mouse position.
		let obj = this;
		
		let origin = obj.mouseorigin;
		let current = obj.mouseposition(event);
		
		return {
			x: current.x - origin.x,
			y: current.y - origin.y
		}
		
	} // movement
	
	mouseposition(event){
		// Get the position of the mouse relative to something. Could I just take it relative to the position of the dragdiv itself?
		let obj = this;
		
		return {
			x: event.sourceEvent.clientX,
			y: event.sourceEvent.clientY
		}
		
	} // mouseposition
	
	
	// Dummy functionality.
	onstart(){
		let obj = this;
	} // onstart
	ondrag(){
		let obj = this;
	} // ondrag
	onend(){
		let obj = this;
	} // onend
	
	
	
} // dragdiv



	

