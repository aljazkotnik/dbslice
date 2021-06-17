import * as d3 from "d3";

// Formulate this as a class? The it can be called as:
// A = new dragdiv() ...


export default class dragnode {
	constructor(node){
		// Make a new div.
		let obj = this;
		
		
		obj.node = node;
		obj.d3node = d3.select(node);
		obj.d3node
		  .style("position", "relative")
		  .style("left", 0 + "px")
		  .style("top", 0 + "px");
		
		// Container that will hold the mouse coordinates.
		obj.mouseorigin = {};
		
	} // constructor
	
	
	apply(){
		
		let obj = this;
		
		// Apply dragging to it. Store the movement data on the dragdiv object instead? So as to not pollute the actual object?
		let dragobj = d3.drag()
			.on("start", function(event){
				obj.mouseorigin = obj.mouseposition(event);
				
				obj.onstart();
			})
			.on("drag", function(event){
				// let position = obj.position()
				let movement = obj.movement(event)
				
				// Rounding positions to full pixel value hasn't helped much. Maybe it's the css holding everything back?
				
				
				// Move the wrapper.
				obj.d3node
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
		
		obj.d3node.call(dragobj);
		
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



	

