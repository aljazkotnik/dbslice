import {unique} from "./helpers.js";
import dragnode from "./dragnode.js";
import metadataFile from "./supportedfiles/metadataFile.js";
import {makeObservable, observable, autorun, action, computed} from "mobx";



/*
When collecting the merge information:
	The data must be saved per category, and [filename, variable name, and variable alias] triplets. On a variable DOM level the variable and file names must be available. On a category DOM level the category name must be available.

When interacting there are compatibility restrictions (e.g. an ordinal cannot be a url pointing to a 2d line file). Therefore at the variable DOM level the compatibility array for that variable must be accessible, as well as the category info for the categories the variable is being placed into.

When using templates to create the DOM data objects cannot be bound to it using d3. Maybe have a split between the static and dynamic parts of the DOM?




One thought is to also allow only comparable types to be merged. Thisis done by the categories already. Ordinals can only be numbers, for categoricals it doesn't matter, and on-demand variables can only be used for dedicated plots or as categoricals. Therefore it's not necessary to have an additional check.

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
	  white-space: nowrap;
  `,
  
  btnGhost: `
	  display: block;
	  color: gainsboro;
	  background-color: gainsboro;
	  pointer: default;
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



// The html constructor
class template{
	
	constructor(files, categories){
		let obj = this;
		
		// The files themselves need not be saved, but the variables they hold need to be. Furthermore, the file names need to be preserved. Maybe just leave it as is.
		obj.files = files;
		
		
		// Categories should include `unused';
		obj.categories = unique( categories.concat("unused") );

	
		obj.node = template.html2element(obj.backbone())
		obj.update()
	} // constructor
	
	
	update(){
		// The node should stay the same, but the interactive content should be redone.
		let obj = this;
		
		// Update the legend on top.
		let legend = obj.node.querySelector("div.legend");
		legend.lastChild.remove();
		legend.appendChild( template.html2element( obj.legend() ) );
		
		// Update the interactive body
		let body = obj.node.querySelector("div.body");
		body.lastChild.remove();
		body.appendChild( template.html2element( obj.interactivecontent() ) );
		
		// Control the heights.
		template.coordinateFileDivs(obj.node);
		
	} // update
	
	
	// The color scheme.
	get color(){
		let obj = this;
		
		let scheme = d3.scaleOrdinal(d3.schemePastel2)
		  .domain(obj.categories)
		  
		return function(category){
			return category == "unused" ? "gainsboro" : scheme(category)
		}
	} // color
	

	backbone(){
		// The interactive content goes into `div.body'.
		let obj = this;
		return `
		<div>
		  <div class="legend">
		    <div>
			</div>
		  </div>
		 
		  <div class="body" style="overflow-y: scroll; overflow-x: scroll; height: 400px;">
			<div></div>
		  </div>
		  
		  <div>
			<button class="submit" style="${ css.btn + "background-color: mediumSeaGreen; color: white;" }">Submit</button>
		  </div>
		</div>  
		`
		
	} // app
	
	
	legend(){
		// Still add a ghost button if the re is no categories to maintain hte look.
		let obj = this;
		return `
		  <div>
			${ obj.categories.length > 0 ? obj.categories.map(d=>obj.legendbutton(d)).join("") : template.ghostbutton() }
		  </div>
		`
	} // legend
	
	interactivecontent(){
		let obj = this;
		return `
		  <div>
			${obj.files.map(fileobj=>obj.filecolumn(fileobj)).join("")}
		  </div>`;
	} // interactivecontent
	
	filecolumn(fileobj){
		let obj = this;
		
		return `
		  <div class="file" style="${ css.divFileColumn }">
			<p style="text-align: center;">
			  <strong>${ fileobj.filename }</strong>
			</p>
		  
			${ obj.categories.map(category=>obj.category(fileobj, category)).join("") }
		  
		  </div>
		`
		
	} // filecolumn


	category(fileobj, category){
		let obj = this;
		
		let variables = fileobj.content.variables.filter(varobj=>varobj.category==category)
		
		return `
		  <div style="${ css.divCategoryWrapper }">
			<div class="category ${ category }" 
			     style="${ css.divCategory }"
				 ownerfile="${ fileobj.filename }"
			>
			  ${ variables.map(variableobj=>obj.draggablebutton(variableobj)).join("") }
			  
			  ${
				  template.ghostbutton(["ghost-endstop"])
			  }
			</div>
		  </div>
		`
		
	} // category




	static button(label, cssstyle, cssclassname, variablename){
		
		return `
		  <button class="${cssclassname}" style="${ cssstyle }" variable="${variablename}">
			<strong>${ label }</strong>
		  </button>
		`
	} // button


	draggablebutton(variableobj){
		let obj = this;
		
		let fractionunique = variableobj.nunique == variableobj.n ? "" : `,  ${variableobj.nunique} / ${variableobj.n}`;
		
		let label = `${ variableobj.name } (${variableobj.type + fractionunique})`;
		let cssstyle = css.btnPill + css.btnDraggable + `background-color: ${ obj.color(variableobj.category) };`;
		let cssclasses = variableobj.supportedCategories.concat("draggable").join(" ")
		return template.button(label, cssstyle, cssclasses, variableobj.name);
	} // draggableButton

	legendbutton(category){
		let obj = this;
		let cssstyle = css.btnPill + css.btnLegend + `background-color: ${ obj.color(category) };`;
		return template.button(category, cssstyle, "draggable");
	} // draggableButton

	static ghostbutton(classnames){
		let cssstyle = css.btnPill + css.btnGhost;
		let cssclass = classnames ? `ghost ${classnames.join(" ")}` : "ghost";
		return template.button("ghost", cssstyle, cssclass);		
	} // ghostButton
	
	
	static html2element(html){
		let template = document.createElement('template'); 
		template.innerHTML = html.trim(); // Never return a text node of whitespace as the result
		return template.content.firstChild;
	} // html2element
	
	
	
	
	// Coordinate category container heights.
	
	
	static trimcontainers(containers){
		// If the last element of any container is a ghost element remove it.
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
	
	static coordinateFileDivs(parent){
		// All filedivs will have the same number of categories. Just make sure that all comparable categories have the same number of elements within them.
		
		let containers = parent.querySelectorAll("div.category")
		
		// Get all the categories.
		let categorynames = [];
		containers.forEach(category=>{
			categorynames = categorynames.concat( category.classList.value.split(" ") );
		});
		categorynames = unique( categorynames );
		
		 
		categorynames.forEach(categoryname=>{
			// Find all the categories among all the files that need to be coordinated.
			let categoriesToCoordinate = parent.querySelectorAll(`div.${ categoryname }`);
			
			
			// First trim out all trailing blank spots.
			template.trimcontainers( categoriesToCoordinate );
			
			
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
					category.insertBefore(template.html2element(template.ghostbutton()), endstop)
				} // for
			}) // forEach
			
		}) // forEach
		
		
	} // coordinateFileDivs

	
} // template



// The functionality.

// This is the dragging.
class variabledrag extends dragnode{
	constructor(node, containers, parent, color){
		super(node)
		
		let obj = this;
		
		// Containers are specified to limit the number of divs the button can be moved to.
		obj.containers = containers;
		
		// The parent is required as the height of categories depends on other corresponding categories.
		obj.parent = parent;
		
		// The color cheme is needed to allow the button to change color when it is assigned to a new category.
		obj.color = color;
		
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
		template.coordinateFileDivs(obj.parent);
		
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
		return obj.node.classList.contains(container.classList[1])
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
			let originghost = template.html2element(template.ghostbutton());
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
	
	
		
} // variabledrag



// The coordination of merging.
export default class metadatamerger {
	constructor(files){
		let obj = this;
		
		// It will need to keep track of the files. These will already be metadata files.
		obj.files = files;
		obj.merginginfo = [];
		
		// Maje the html builder and get a node to attach to the html app.
		obj.builder = new template(obj.files, obj.categories);
		obj.node = obj.builder.node;
		
		
		// Apply the submit functionality.
		obj.node.querySelector("button.submit").addEventListener("click", ()=>obj.submit())
		
		
		
		makeObservable(obj, {
			files: observable,
			merginginfo: observable,
			categories: computed,
			updatefiles: action,
			submit: action
		})
		
		
		autorun(()=>{obj.update()})
		
	} // constructor
	
	updatefiles(files){
		let obj = this;
		obj.files = files;
	} // updatefiles
	
	update(){
		let obj = this;
		
		// Somehow uncouple the template more. All hte interactive content needs to be updated - including the legend.
		// Make the builder observe these itself??
		obj.builder.files = obj.files;
		obj.builder.categories = obj.categories;
		
		// If htere is merging info available, then apply it.
		/*
		if(obj.merginginfo){
			obj.sortByLoadedMergingInfo(obj.merginginfo)
		} // if
		*/
		
		obj.builder.update();
		
		// Apply the draggable functionality. This should really be applied on a file by file basis.
		let body = obj.builder.node.querySelector("div.body");
		let filedivs = obj.builder.node.querySelectorAll("div.file");
		filedivs.forEach(filediv=>{
			let categories = filediv.querySelectorAll("div.category");
			let draggables = filediv.querySelectorAll("button.draggable");
			
			draggables.forEach(draggable=>{
				new variabledrag(draggable, categories, body, obj.builder.color)
			})
		}) // forEach
	} // update
	

	
	submit(){
		let obj = this;
		
		// Collect the classification from the ui.
		obj.merginginfo = obj.collectmerginginfo();
		
		
	} // submit
	
	// How to keep track of the merging information. It should be redone everytime a new merging file is loaded. Otherwise it should keep track of what the user selected.
	
	
	
	get categories(){
		let obj = this;
		return unique( obj.files.reduce((acc, fileobj)=>{
			acc = acc.concat(fileobj.content.variables.map(v=>v.category));
			return acc
		}, []) )
	} // categories
	
	collectmerginginfo(){
		// Collect the merging info by looping over the identified categories and comparing the elements in the same position.
		let obj = this;
		
		// MAYBE IT SHOULDNT BE A MAP
		let info = obj.categories.reduce( (acc,category) => {
			// Collect the DOM containers.
			let categorydivs = obj.node.querySelectorAll(`div.${ category }`);
			
			// Compare the children. They should all have the same number of them. Calculate the minimum just in case.
			let n = Number.POSITIVE_INFINITY;
			categorydivs.forEach(node=>{
				n = node.children.length < n ? node.children.length : n;
			}) // forEach
			
			
			// Loop over children.
			let categoryInfo = [];
			for(let i=0; i<n; i++){
				
				let comparableVariables = obj.collectComparableVariableRow(categorydivs, i)
				
				// If the merging was valid, then attach it to the info object.
				if( comparableVariables ){
					// This now needs to store the file name, variable name, and the variable merged alias.
					let variableAlias = comparableVariables[0].name;
					
					comparableVariables.forEach(variableobj=>{
						variableobj.category = category;
						variableobj.alias = variableAlias;
					}) // forEach
					
					// Filenames can have `.` or `\` in the filename. How to store the merged information in that case? Special objects like: {filename: ``, variable}
					categoryInfo = categoryInfo.concat(comparableVariables);
				} // if
				
			} // for
			
			// Only do this if categoryInfo has some information.
			if( categoryInfo.length > 0 ){
				acc = acc.concat( categoryInfo );
			} // if
			
			return acc;
		}, []) // reduce
		
		return info;
		
	} // collectmerginginfo
	
	
	collectComparableVariableRow(categorydivs, i){
		
		// Collect children in comparable positions.
		let comparablevariables = []
		
		// forEach does not allow a `break`.
		for( let categorynode of categorydivs ){
			
		  let variablenode = categorynode.children[i];
			
		  if(variablenode.classList.contains("ghost")){
			comparablevariables = undefined;
			break;
		  } else {
			comparablevariables.push( {
			  filename: categorynode.attributes.ownerfile.value,
				  name: variablenode.attributes.variable.value
			} );	
		  } // if
		  
		} // for
		
		return comparablevariables;
	} // collectComparableVariableRow
	
	
	
	// How to sort the variables given some merging data? They will have to be ordered in the data itself.
	
	sortByLoadedMergingInfo(mergingInfo){
		// Establish the order by sorting the variables within their fileobjects. Mismatched variables should just be put at the end? But what if several files have mismatching variables? Move them into unused?
		
		// Ok, but then first loop through all the keys of the merging info, find those that aren't decalred, change their category to unused, and then continue.
		
		
		// Loop over the files and check what has been declared. Anything undeclared is moved to unused.
		
		
		let obj = this;
		
		
		
		// Create an alias order object that can be used for ordering.
		let declaredAliases = unique( mergingInfo.map(mergeentry=>mergeentry.alias) );
		
		
		// Variable name to alias ->
		
		
		// How to make sure that only items that are fully declared are being used?? Filter out the things that are not needed??
		
		// Reorder the variables in the categories.
		obj.files.forEach(function(fileobj){
			
			
			let declaredVariables = mergingInfo.filter(mergeentry=>{
				return mergeentry.filename == fileobj.filename
			}) // filter
			
			
			// Create a variable2alias array.
			let variablename2alias = declaredVariables.reduce((a,variable)=>{
				a[variable.name] = variable.alias;
				return a
			},{}); // reduce
			
			
			// Loop over the variables and have those that are not declared moved to unused.
			fileobj.content.variables.forEach(variableobj=>{
				let declared = declaredVariables.filter(declaredobj=>declaredobj.name == variableobj.name);
				if( declared.length != 1 ){
					// Undeclared variables are considered unused.
					variableobj.category = "unused";
				} else {
					// Declared variables may have to be moved to a different category.
					variableobj.category = declared[0].category;
				} // if
			}) // forEach
			
			// Now sort by category name. How to find position within category?
			
			// Just
			
			fileobj.content.variables.sort(function (x, y) { 
				// Just sort them in here. First sort by category, and then sort by the prescribed order value.
				
				// The variables in content don't have aliases, because they don't need them. Aliases are just secondary names that allow connection of primary variable names.
				let categorysort = ("" + x.category).localeCompare(y.category);
				let variablesort = declaredAliases.indexOf(variablename2alias[x.name]) - declaredAliases.indexOf(variablename2alias[y.name]);
				
				return categorysort || variablesort ; 
			})
			
			
		}) // forEach
		
	} // sortByLoadedMergingInfo
	
		
} // metadatamerger