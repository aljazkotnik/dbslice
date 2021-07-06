import {html2element} from "../../core/helpers.js";
import {makeObservable, observable, computed, action, autorun} from "mobx";

// A custom select menu to facilitate the variable selection in menus.

let variablemenustyle = `
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  display: none; 
  position: absolute;
  max-height: 120px;
  overflow-y: auto;
`;

let ulstyle = `
  list-style-type: none;
  font-size: 10px;
  font-weight: bold;
  padding-left: 4px;
  padding-right: 4px;
`;


let template = `
<div class="variable-select-menu" style="${variablemenustyle}">
  <ul style="${ulstyle}">
  </ul>
</div>
`;


// Differentite between an x and a y one.

export default class divSelectMenu{
	_variables = []
	_current = undefined
	
	constructor(axis){
		let obj = this;
		
		
		obj.node = html2element(template);
		
		
		// The position of the menu is fully set outside of this class.
		
		// enter().append() doesn't work for unattached elements. So what do? Make menu first, attach variables later? Make them as html elements and do the lookup for hte right data within the class?
		
		// Use d3 to create the options as that allows data to be bound to the HTML elements.
		makeObservable(obj, {
			_variables: observable,
			_current: observable,
			variables: computed,
			current: computed
		})
		
		autorun(()=>{obj.update()})
		
		
	} // constructor
	
	
	// Getters and setters to get an observable attributed that can be assigned as an action.
	set variables(variables){
		if(!this._current){
			this.current = variables[0];
		} // if
		this._variables = variables;
	} // set variables
	
	get variables(){
		return this._variables
	} // get variables
	
	
	set current(d){
		this._current = d;
	} // current
	
	get current(){
		return this._current;
	} // current
	
	
	
	update(){
		let obj = this;
		
		// First remove all li.
		let ul = obj.node.querySelector("ul");
		while (ul.lastChild) {
			ul.removeChild(ul.lastChild);
		} // while
		
		
		// Now add in the needed li objects.
		obj.variables.forEach(variable=>{
			let t = `<li class="hover-highlight">${variable.name}</li>`;
			let li = html2element(t);
			ul.appendChild(li);
			
			li.addEventListener("click", event=>{
				obj.current = variable;
				obj.hide();
			})
		})
	} // update
	
	
	
	
	show(){
		let obj = this;
		obj.node.style.display = "inline-block";
	} // show
	
	hide(){
		let obj = this;
		obj.node.style.display = "none";
	} // hide
	
} // divSelectMenu




