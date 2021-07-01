// import {makeObservable, observable, autorun, action, computed} from "mobx";


import {html2element} from "../helpers.js";
import {css} from "./mergingcss.js";



var template = {
	body: `
		<div style="${ css.card }">
		  <div>
			<div>
			  
			  <div>
				<h2 style="display: inline;">Loading errors:</h2>
			  </div>
			  
			</div>
		  </div>
		  
		  
		  <div class="body" style="overflow-y: scroll; overflow-x: auto; height: 400px;">
			<div></div>
		  </div>
		  
		  
		  
		  <div>
			<button class="submit" style="${ css.btn + css.btnSubmit }">Understood</button>
		  </div>
		  
		</div>
	`,
	
	content: function(errors){
		
		return `<div style="padding-left: 20px;">
			${ errors.map(template.erroritem).join(" ") }
		</div>`
		
	}, // content
	
	erroritem: function(item){
		return`
		  <p><b>${ item.filename }</b> loaded by <b>${ item.requester }</b>: LoaderError: Unsupported Extension</p>
		`
	}
	
}; // template



// The coordination of merging.
export default class errorreport {
	constructor(errors){
		let obj = this;
		
		// It will need to keep track of the files. These will already be metadata files.
		obj.errors = errors;
				
		// Apply the submit functionality.
		obj.node = html2element(template.body);
		obj.node.querySelector("button.submit").addEventListener("click", ()=>obj.hide())
		
		
		
		obj.update()
		
		
	} // constructor
	
	
	update(){
		let obj = this;
		
		// Remove the current content, and add in the new content.
		let body = obj.node.querySelector("div.body");
		body.lastChild.remove();
		
		
		let content = html2element( template.content(obj.errors) );
		body.appendChild( content )
	} // update
	
	hide(){
		let obj = this;
		obj.node.style.display = "none";
	} // hide
	
		
} // metadatamerger