// import {makeObservable, observable, autorun, action, computed} from "mobx";



/*
The error report requires very little interaction with the data - it only needs to read the reports.

Maybe consider making a 'fullscreenmenu template', which would hold the basics?

*/


// Declare the necessary css here.
let css = {
	
  btn: `
	  border: none;
	  border-radius: 12px;
	  text-align: center;
	  text-decoration: none;
	  display: inline-block;
	  font-size: 20px;
	  margin: 4px 2px;
	  cursor: pointer;
  `,
  
  submitBtn: `
	background-color: mediumSeaGreen; 
	color: white;
  `,

  fullscreenContainer: `
	  position: fixed;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  background: rgba(90, 90, 90, 0.5);
  `,
  
  card: `
	  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	  transition: 0.3s;
	  border-radius: 5px;
	  background-color: gainsboro;
	  width: 80%;
	  max-height: 90%;
	  margin-left: auto;
	  margin-right: auto;
	  margin-top: 40px;
	  padding: 4px;
  `
} // css



// The html constructor
function html2element(html){
	let template = document.createElement('template'); 
	template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return template.content.firstChild;
} // html2element

var template = {
	body: `
		<div style="${ css.fullscreenContainer }">
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
			<button class="submit" style="${ css.btn + css.submitBtn }">Understood</button>
		  </div>
		  
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
		/*
		// Erros should be observable, and the menu should update itself automatically.
		makeObservable({
			errors: observable
		})
		
		autorun(()=>{
			obj.update();
		})
		*/
		
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