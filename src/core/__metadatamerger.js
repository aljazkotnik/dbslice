import {unique} from "./helpers.js";
import dragnode from "./dragnode.js";


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
  
  btnPill: `
      border: none;
	  border-radius: 12px;
	  text-align: center;
	  text-decoration: none;
  `,
  
  btnLegend: `
	  display: inline-block;
	  cursor: default;
  `,
  
  btnDraggable: `
	  display: block;
	  cursor: pointer;
	  position: relative;
  `,
  
  btnGhost: `
	  display: block;
	  color: gainsboro;
	  background-color: gainsboro;
	  pointer: default;
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
  `,
  

	
  divFileColumn: `
	  display: table-cell;
	  vertical-align: top;
  `,
  
  
  divCategoryWrapper: `
	  display: table-row; 
	  vertical-align: top;
  `,
  
  divCategory: `
	  display: table-cell; 
	  vertical-align: top; 
	  border-style: solid; 
	  border-radius: 15px;
	  border-width: 0px;
	  padding: 3px;
  `
  
} // css



// Split this thing off to a separate folder, and keep separate files in htere.


// Button templates
let button = {
	
	template: function(name, cssstyle, cssclassname){
		return `
		  <button class="${cssclassname}" style="${ cssstyle }">
			<strong>${ name }</strong>
		  </button>
		`
	}, // button
	
	ghost: function(classnames){
		let cssstyle = css.btnPill + css.btnGhost;
		let cssclass = classnames ? `ghost ${classnames.join(" ")}` : "ghost";
		return button.template("ghost", cssstyle, cssclass);		
	} // ghostButton
	
} // button


// General helper.
function html2element(html){
	let template = document.createElement('template'); 
	template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
	return template.content.firstChild;
} // html2element


// Rework the template into smaller classes? That way the connection between the data and the html could be in the classes as opposed to being due to the d3 data bind.


// The filedov is the simplest way to bind data to the dom without d3. The variable dragging happens within the constraint of a file, so the button can look itself up in the fileobj, and check where it can be appended.
class filediv{
	
	constructor(fileobj, categories, color){
		let obj = this;
		
		obj.file = fileobj;
		obj.categories = categories;		
		obj.color = color;
		
		// Create the node.
		obj.node = html2element( obj.filecolumn() );

		// Apply the dragging. Dragging must be applied outside, as other filedivs are required in the functionality also.
	
	} // constructor
	
	filecolumn(){
		let obj = this;
		
		return `
		  <div class="file" style="${ css.divFileColumn }">
			<p style="text-align: center;">
			  <strong>${ obj.file.filename }</strong>
			</p>
		  
			${ obj.categories.map(category=>obj.category(category)).join("") }
		  
		  </div>
		`
		
	} // filecolumn


	category(category){
		let obj = this;
		
		let variables = obj.file.content.variables.filter(varobj=>varobj.category==category)
		
		return `
		  <div style="${ css.divCategoryWrapper }">
			<div class="category ${ category }" style="${ css.divCategory }">
			  ${ variables.map(variableobj=>obj.draggablebutton(variableobj)).join("") }
			  
			  ${
				  button.ghost(["ghost-endstop"])
			  }
			</div>
		  </div>
		`
		
	} // category
	
	
	draggablebutton(variableobj){
		// Simply add the valid category names to the button class?
		let obj = this;
		let cssstyle = css.btnPill + css.btnDraggable + `background-color: ${ obj.color(variableobj.category) };`;
		let cssclasses = variableobj.supportedCategories.concat("draggable").join(" ")
		return button.template(variableobj.name, cssstyle, cssclasses);
	} // draggableButton
	
} // filediv



class app{
	
	constructor(files, categories){
		let obj = this;
		
		// The files themselves need not be saved, but the variables they hold need to be. Furthermore, the file names need to be preserved. Maybe just leave it as is.
		obj.files = files;
		
		
		// Categories should include `unused';
		obj.categories = unique( categories.concat("unused") );

	} // constructor
	
	
	get node(){
		let obj = this;
		
		let appNode = html2element( obj.template() );
		
		// Append the filedivs to it.
		let appNodeBody = appNode.querySelector("div.body");
		
		// Create a class instance for all files. Just have a filediv object? That is the basis for the interactions anyway.
		obj.files.forEach(fileobj=>{
			let filedivobj = new filediv(fileobj, obj.categories, obj.color);
			
			// Append the file.
			appNodeBody.appendChild(filedivobj.node)
			
			// Append the drag behavior to all hte buttons.
			let draggables = filedivobj.node.querySelectorAll("button.draggable");
			draggables.forEach(draggable=>{
				
				// Pass in the draggable, and the filedivobj. That one will have the `categorydivs', 'color', and the `body'
				new variabledrag(draggable, filedivobj)
			})
		}); // forEach
		
		return appNode
	} // node
	
	
	// The color scheme.
	get color(){
		let obj = this;
		
		let scheme = d3.scaleOrdinal(d3.schemePastel2)
		  .domain(obj.categories)
		  
		return function(category){
			return category == "unused" ? "gainsboro" : scheme(category)
		}
	} // color
	

	template(){
		// this is the template object now.
		let obj = this;
		
		/*
		<div style="display: table-row">
			  ${ obj.files.map(fileobj=>obj.filecolumn(fileobj)).join("") }
		</div>
		*/
		
		
		return `
		<div style="${ css.fullscreenContainer + "display: none;"}">
		<div style="${ css.card }">
		  <div>
			<div>
			  
			  <div>
				<h2 style="display: inline;">Metadata merging:</h4>
				<button style="${ css.btn + "float: right;" }">
				  <i class="fa fa-exclamation-triangle"></i>
				</button>
			  </div>
			  
			  <div class="legend">
				${ obj.categories.map(d=>obj.legendbutton(d)).join("") }
			  </div>
			  
			</div>
		  </div>
		  
		  
		  <div class="body" style="overflow-y: scroll; overflow-x: auto; height: 400px;">
			
		  </div>
		  
		  
		  
		  <div>
			<button class="submit" style="${ css.btn + "background-color: mediumSeaGreen;" }">Submit</button>
		  </div>
		  
		</div>
		</div>`
		
	} // app

	legendbutton(category){
		let obj = this;
		let cssstyle = css.btnPill + css.btnLegend + `background-color: ${ obj.color(category) };`;
		return button.template(category, cssstyle, "draggable");
	} // draggableButton

} // app



// The functionality.

// This is the dragging.
class variabledrag extends dragnode{
	constructor(draggablenode, filedivobj){
		super(draggablenode)
		
		let obj = this;
		
		// Containers are specified to limit the number of divs the button can be moved to.
		obj.containers = filedivobj.node.querySelectorAll("div.category");
		
		// The parent is required as the height of categories depends on other corresponding categories.
		obj.parent = filedivobj.node.parentElement;
		
		// The color cheme is needed to allow the button to change color when it is assigned to a new category.
		obj.color = filedivobj.color;
		
		obj.apply();
		
	} // constructor
	
	// Supercede the drag events.
	onstart(){
		let obj = this;
		
		// Don't raise - this pushes it to the end of the list. z-index?
		// obj.d3node.raise();
		
	} // onstart
	
	ondrag(){
		let obj = this;
		// Find which container the button is over, and if it's allowed to be there.
		
		// Make a preview. To highlight the position into which the variable can be dropped we reposition the target ghost.
		let current = obj.currentcontainer();
		obj.stylecontainers(current);
		
	} // ondrag
	
	onend(){
		let obj = this;
		
		let current = obj.currentcontainer();
		obj.reposition(current);
		obj.stylecontainers();
		
		// Make sure the categories of all files maintain consistent heights, and are as short as possible.
		obj.coordinateFileDivs();
		
		// Change the color of the variable to match its new category.
		obj.stylebutton();
		
	} // onend
	
	
	// Movement
	currentcontainer(){
		let obj = this;
		
		let current
		obj.containers.forEach(container=>{
			
			let overlap = obj.calculateoverlap(obj.node, container)			
			if( overlap > 0 ){
			
				// Have to check compatibility also. How to encode this information to the variables already? That's where the categories come from. Should come from the file then, since the categories are hardcoded within it no? 
				if( obj.isContainerCompatible(container) ){
					current = container;
				} // if
					
			} // if
			
			return current
			
		}) // forEach
		
		if(!current){
			current = obj.node.parentElement;
		} // if
		
		return current
		
	} // currentcontainer
	
	isContainerCompatible(container){
		let obj = this;
		
		// The container only has one category class name specified, the dragged node has potentially many.
		
		return true
	} // isContainerCompatible
	
	calculateoverlap(a,b){
		// Calculate hte overlap between nodes `a' and `b'.
		let arect = a.getBoundingClientRect();
		let brect = b.getBoundingClientRect();
		
		// Note that top is top on screen, but bottom in coordinates.
		let upper = Math.min(arect.bottom, brect.bottom);
		let lower = Math.max(arect.top, brect.top);
		
		let overlap = (upper - lower) < 0 ? 0 : upper - lower;
		return overlap;
		
	} // calculateoverlap
	
	reposition(container){
		// I don't actually want the element to be moved between two elements. I only want to allow the user to put a variable into an empty spot. If the variable isn't dropped over an empty spot it should be added to the end.
		let obj = this;
		
		// Only find if the variable we're over is a ghost variable.
		
		let targetghost = null;
		container.querySelectorAll("button.ghost").forEach(node=>{
				
			// Check if the dragged node is over this one.
			let current = targetghost ? obj.calculateoverlap(obj.node, targetghost) : 0;
			let candidate = obj.calculateoverlap(obj.node, node);
			
			if(candidate > current){
				targetghost = node;
			} // if

		}) // forEach
		
		
		// In case no ghost is found:
		//  same container - keep position.
		// new container - append to the end.
		if(targetghost){
			// Append to ghost position.
			move(obj.node, container, targetghost)
		} else {
			// No ghost was found. If the container is the same, then don't move.
			if(obj.node.parentElement == container){
				// Nothing.
			} else {
				move(obj.node, container, targetghost)
			} // if
		} // if
		
		function move(a,container,b){
			// Append a ghost node to the origin.
			let originghost = html2element(button.ghost());
			a.parentElement.insertBefore(originghost, a);
			
			// Append to ghost position.
			a.parentElement.removeChild(a);
			container.insertBefore(a, b);
			
			// If the ghost isnt a ghost-endstop then remove it.
			let endstop = container.querySelector("button.ghost-endstop");
			if(b){
			  if(!b.classList.contains("ghost-endstop")){
				b.parentElement.removeChild(b);
			  } // if
			} else {
				// b was null, and was appended after the ghost-endstop. Detach and attach it so it's the last one.
				container.removeChild(endstop);
				container.appendChild(endstop);
			} // if
		} // move
		
		obj.node.style.left = 0;
		obj.node.style.top = 0;
		
		
	} // reposition
	
	
	// Coordinating the containers.
	stylebutton(){
		// Make sure that the button has the color it is supposed to have.
		let obj = this;
		
		
		// Where to get the color from?
		let currentcategoryname = obj.node.parentElement.classList[1];
		
		obj.node.style.backgroundColor = obj.color(currentcategoryname);
	} // stylebutton
	
	stylecontainers(current){
		// The current container should have its border highlighted, while all the others should have no border.
		let obj = this;
		
		obj.containers.forEach(container=>{
			container.style.borderWidth = "0px";
		})
		
		if(current){
			current.style.borderWidth = "2px";
		} // if
		
		
	} // stylecontainers
	
	trimcontainers(containers){
		// If the last element of any container is a ghost element remove it.
		let obj = this;
		
		containers.forEach(container=>{
			
			// Loop over the children backwards.
			let keep = false;
			for(let i=container.children.length-1; i>-1; i--){
				// The first button that is not a ghost triggers all the others to be kept.
				let testelement = container.children[i];
				let testclass = testelement.classList
				
				// Don't test if it's the stopend.
				if( !testclass.contains("ghost-endstop") ){
					keep = testclass.contains("ghost") ? keep : true;
					if(!keep){
						container.removeChild(testelement);
					} // if
				} // if
			} // for
			
		}) // forEach
		
	} // trimcontainers
	
	coordinateFileDivs(){
		// All filedivs will have the same number of categories. Just make sure that all comparable categories have the same number of elements within them.
		
		let obj = this;
		
		
		// Get all the categories.
		let categorynames = [];
		obj.containers.forEach(category=>{
			categorynames = categorynames.concat( category.classList.value.split(" ") );
		});
		categorynames = unique( categorynames );
		
		 
		categorynames.forEach(categoryname=>{
			// Find all the categories among all the files that need to be coordinated.
			let categoriesToCoordinate = obj.parent.querySelectorAll(`div.${ categoryname }`);
			
			
			// First trim out all trailing blank spots.
			obj.trimcontainers( categoriesToCoordinate );
			
			
			// Find the maximum length
			let n = 0;
			categoriesToCoordinate.forEach(category=>{
				n = category.children.length > n ? category.children.length : n;
			}) // forEach
			
			
			// Now force them all to the same length by adding ghost elements in front of the ghost-endstop element.
			categoriesToCoordinate.forEach(category=>{
				let k = n - category.children.length;
				let endstop = category.querySelector("button.ghost-endstop")
				for(let i=0; i<k; i++){
					category.insertBefore(html2element(button.ghost()), endstop)
				} // for
			}) // forEach
			
		}) // forEach
		
		
	} // coordinateFileDivs
	
} // variabledrag




// Where to get the compatibility information from. Maybe include it in hte variables themselves? That allows more information to be collected there.



// The coordination of merging.
export default class metadatamerger {
	constructor(files){
		let obj = this;
		
		
		// It will need to keep track of the files.
		obj.files = files;
		
		
		// Find which categories are available in the files. Have this as a computed value.
		obj.categories = unique( files.reduce((acc, fileobj)=>{
			acc = acc.concat(fileobj.content.variables.map(v=>v.category));
			return acc
		}, []) )
		
		
		// Category compatibility.
		
		
		// It will need to keep track of the merging information. Maybe it should be a property of this object actually
		obj.merging = {};
		
	
		let builder = new app(obj.files, obj.categories)
		obj.node = builder.node;
		
		
		// HOW TO CONSOLIDTE ALL THE categories??
		
		// Apply the submit functionality.
		obj.node.querySelector("button.submit").addEventListener("click", ()=>obj.hide())
		
		
		/*
		makeObservable(obj, {
			files: observable
		})
		*/
		
	} // constructor
	
	show(){
		let obj = this;		
		obj.node.style.display = "";
	} // show
	
	hide(){
		let obj = this;
		obj.node.style.display = "none";
	} // hide
	
	submit(){
		let obj = this;
		
		// Collect the classification from the ui.
		// let mergerInfo = metadatamerger.collectMergerInfo()
		
		// Store this in the session data.
		// ...
		
		// Get the merged data. Maybe the data merger should be performed outside?? That would make more sense maybe?
		// ...
		
		
		// Change the crossfilter.
		// ...
		
		obj.hide()
		
	} // submit
	
	// How to keep track of the merging information. It should be redone everytime a new merging file is loaded. Otherwise it should keep track of what the user selected.
	
	sortByLoadedMergingInfo(fileobjs, loadedInfo){
		
		// HOW TO MAKE THEM MISMATCH ANY NON-MATCHED VARIABLES? PUSH GHOST OBJS BETWEEN??
		// FIRST FOCUS ON MAKING EVERYTHING ELSE WORK
		
		// How to make sure that only items that are fully declared are being used?? Filter out the things that are not needed??
		
		// Reorder the variables in the categories.
		fileobjs.forEach(function(fileobj){
			fileobj.categories.forEach(function(catobj){
				
				
				let mergedItems = loadedInfo[catobj.category]
				if(mergedItems){
					
				
					// Create the reordering dict.
					let ind = {}
					Object.getOwnPropertyNames( mergedItems ).forEach(function(varname, pos){
						let nameInTheFile = mergedItems[varname][fileobj.filename]
						ind[nameInTheFile] = pos
					})
					
					// How to manage this sorting so that all the sosrts are respected? How to make sure that the values are placed exactly in the spots required. Maybe simply creating a new array would be better??
					catobj.sort(function(a,b){
		
						let aval = typeof( ind[a.variable.name] ) == "number" ? ind[a.variable.name] : Number.POSITIVE_INFINITY
						let bval = typeof( ind[b.variable.name] ) == "number" ? ind[b.variable.name] : Number.POSITIVE_INFINITY
								
						let val = isNaN( aval - bval ) ? 0 : aval - bval
								
						return val
					})
				
				
				} // if
				
			}) // forEach
		}) // forEach
		
		
		return fileobjs
		
	} // sortByLoadedMergingInfo
	
		
} // metadatamerger
	