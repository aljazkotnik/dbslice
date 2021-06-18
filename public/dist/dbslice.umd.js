(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('mobx'), require('d3'), require('d3-time-format')) :
	typeof define === 'function' && define.amd ? define(['mobx', 'd3', 'd3-time-format'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mobx, global.d3$1));
}(this, (function (mobx, d3$1) { 'use strict';

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

	// Maybe it would be better to create an abstract library, and one that handles the specific needs of the app separately? It would make sense as different apps might have different needs? Or could the metadata management have a computed attribute, and just observe all the files??

	// On-demand plots provide the file manager with the type of file they are requesting. Maybe the session should be treated as a plot? So it prescribes the type of file it would like to have, and then that is passed to the file manager, which just loads and stores it? So filemanager would be a filelibrary?

	class filelibrary {
		constructor(){
			let obj = this;
			
			obj.files = [];
			obj.failed = [];
			
			// The library does not know the whole extent of the files that are currently required - it only knows what was requested of it. To let it know what is actively needed an array of filenames must be communicated to it.
			obj.required = [];
			
			
			// I don't want the files to be loaded over and over again. So maybe it's good to have a background storage that keeps all the files, and a frontend storage that computes itself based on hte background and the currently requested status? Maybe still good, because the unnecessary files are disposed of automatically.
			
			// Make the class observable.
			mobx.makeObservable(obj, {
	            single: mobx.action,
				updateactive: mobx.action,
				store: mobx.action,
				files: mobx.observable,
				required: mobx.observable,
	        });
			
			
			// It should keep updating itself to make sure that requested matches the files/failed.
			mobx.autorun(()=>{obj.update();});
			
		} // constructor
		
		

		
		
		// LOADING
		single(classref, filename){
			
			let obj = this;
			
			
			// Check if this file already exists loaded in. Only unique filenames are saved, so this should only return a single item in the array.
			let libraryEntry = obj.retrieveByFilenames( [filename] )[0];
			if(libraryEntry){
				return libraryEntry
			} else {	
				// Initiate loading. After loading if the file has loaded correctly it has some content and can be added to internal storage.
				let fileobj = new classref(filename);
				fileobj.load();
				fileobj.promise.then(fileobj_ => obj.store(fileobj_));
				// obj.store(fileobj)
				return fileobj.promise;
			} // if
					
		} // single
		
		
		
		// THE ANONYMOUS FUNCTION MUST BE THE `ACTION'. REWORK
		store(fileobj){
			let obj = this;
			
			// fileobj.promise.then(function(fileobj){
				
				// Other files should be stored if they have any content.
				if( fileobj.content ){
					// Successfuly loaded files.
					obj.files.push(fileobj);
				} else {
					// Errors were incurred.
					obj.failed.push(fileobj);
				} // if
				
			// }) // then
					
		} // store
		
		retrieveByFilenames(filenames){
			// If filenames are defined, then return specific files.
			
			let obj = this;
			return obj.files.filter(function(file){
				return filenames.includes(file.filename)
			}) // filter
				
		} // retrieve
		
		retrieveByClass(classref){
			// If filename is defined, then try to return that file. Otherwise return all.
			let obj = this;	
			return obj.files.filter(function(file){
				return file instanceof classref
			}) // filter
				
		} // retrieveByClass
		
		
		
		// UPDATING
		updateactive(filenames){
			// This is kept separate to allow autorun to perform updates without calling input parameters.
			let obj = this;
			obj.required = filenames;
		} // updateactive
		
		update(){
			// Actually, just allow the plots to issue orders on hteir own. The library update only collects the files that are not required anymore. So this checks to make sure that any files that are no longer needed get thrown out.
			
			// But for that it must have access to the filtered tasks, as well as the plots. Maybe there should just be a collection point into which the plots submit their requests, and the library then responds. And when the plots required files change, that would update.
			let obj = this;
			
			let filesForRemoval = obj.files.filter(function(file){
				return !obj.required.includes(file.filename)
			}); // filter
			
			
			// Failed loadings should also be removed if they're no longer needed. Maybe still keep everything in a background _files? And produce the failed and files based on that?
			obj.#remove( filesForRemoval );
			
		} // update
		
		
		
		
		
		
		

		// REMOVAL
		#removeByFilenames(filenames){
			// `filenames' is an array of string file names.
			let obj = this;
			obj.#remove( obj.retrieveByFilenames(filenames) );
		} // remove
		
		#removeByClass(classref){
			// `classref' is a class reference such that: new classref(inputs) instanceof classref.
			let obj = this;
			obj.#remove( obj.retrieveByClass(classref) );
		} // remove
		
		#remove(files){
			let obj = this;
			
			// For each of these find it's index, and splice it.
			files.forEach(function(file){
				let i = obj.files.indexOf(file);
				obj.files.splice(i,1);
			});
		} // removeFiles
			
	} // filelibrary

	// Arrays
	function unique(d){		
		// https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
		function onlyUnique(value, index, self) { 
			return self.indexOf(value) === index;
		} // unique
		
		return d.filter( onlyUnique )

	} // unique

	function arrayEqual(A, B){
		
		return arrayIncludesAll(A, B)
			&& arrayIncludesAll(B, A)
		
	} // arrayEqual

	function arrayIncludesAll(A,B){
		// 'arrayIncludesAll' checks if array A includes all elements of array B. The elements of the arrays are expected to be strings.
		
		// Return element of B if it is not contained in A. If the response array has length 0 then A includes all elements of B, and 'true' is returned.
		var f = B.filter(function(b){
			return !A.includes(b)
		});
		
		return f.length == 0? true : false
		
		
	} // arrayIncludesAll

	// Formulate this as a class? The it can be called as:
	// A = new dragdiv() ...


	class dragnode {
		constructor(node){
			// Make a new div.
			let obj = this;
			
			
			obj.node = node;
			obj.d3node = d3__namespace.select(node);
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
			let dragobj = d3__namespace.drag()
				.on("start", function(event){
					obj.mouseorigin = obj.mouseposition(event);
					
					obj.onstart();
				})
				.on("drag", function(event){
					// let position = obj.position()
					let movement = obj.movement(event);
					
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
				});
			
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
			
			return {
				x: event.sourceEvent.clientX,
				y: event.sourceEvent.clientY
			}
			
		} // mouseposition
		
		
		// Dummy functionality.
		onstart(){
		} // onstart
		ondrag(){
		} // ondrag
		onend(){
		} // onend
		
		
		
	} // dragdiv

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
	  
	}; // css



	// The html constructor
	class template{
		
		constructor(files, categories){
			let obj = this;
			
			// The files themselves need not be saved, but the variables they hold need to be. Furthermore, the file names need to be preserved. Maybe just leave it as is.
			obj.files = files;
			
			
			// Categories should include `unused';
			obj.categories = unique( categories.concat("unused") );

		} // constructor
		
		
		get node(){
			let obj = this;
			return template.html2element(obj.app())
		} // node
		
		
		// The color scheme.
		get color(){
			let obj = this;
			
			let scheme = d3.scaleOrdinal(d3.schemePastel2)
			  .domain(obj.categories);
			  
			return function(category){
				return category == "unused" ? "gainsboro" : scheme(category)
			}
		} // color
		

		app(){
			
			/* NEEDED CSS
				fullscreen-container
				card 
				card-menu
				card-header
				btn
				btn-report
				card-body
				card-footer
			*/
			
			// this is the template object now.
			let obj = this;
			
			
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

			${ obj.files.map(fileobj=>obj.filecolumn(fileobj)).join("") }

		  </div>
		  
		  
		  
		  <div>
			<button class="submit" style="${ css.btn + "background-color: mediumSeaGreen;" }">Submit</button>
		  </div>
		  
		</div>
		</div>`
			
		} // app


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
			
			let variables = fileobj.content.variables.filter(varobj=>varobj.category==category);
			
			return `
		  <div style="${ css.divCategoryWrapper }">
			<div class="category ${ category }" style="${ css.divCategory }">
			  ${ variables.map(variableobj=>obj.draggablebutton(variableobj)).join("") }
			  
			  ${
				  template.ghostbutton(["ghost-endstop"])
			  }
			</div>
		  </div>
		`
			
		} // category




		static button(name, cssstyle, cssclassname){
			
			return `
		  <button class="${cssclassname}" style="${ cssstyle }">
			<strong>${ name }</strong>
		  </button>
		`
		} // button


		draggablebutton(variableobj){
			let obj = this;
			let cssstyle = css.btnPill + css.btnDraggable + `background-color: ${ obj.color(variableobj.category) };`;
			let cssclasses = variableobj.supportedCategories.concat("draggable").join(" ");
			return template.button(variableobj.name, cssstyle, cssclasses);
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
		
		
	} // template



	// The functionality.

	// This is the dragging.
	class variabledrag extends dragnode{
		constructor(node, containers, parent, color){
			super(node);
			
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
			
			let current;
			obj.containers.forEach(container=>{
				
				let overlap = obj.calculateoverlap(obj.node, container);			
				if( overlap > 0 ){
				
					// Have to check compatibility also. How to encode this information to the variables already? That's where the categories come from. Should come from the file then, since the categories are hardcoded within it no? 
					if( obj.isContainerCompatible(container) ){
						current = container;
					} // if
						
				} // if
				
				return current
				
			}); // forEach
			
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

			}); // forEach
			
			
			// In case no ghost is found:
			//  same container - keep position.
			// new container - append to the end.
			if(targetghost){
				// Append to ghost position.
				move(obj.node, container, targetghost);
			} else {
				// No ghost was found. If the container is the same, then don't move.
				if(obj.node.parentElement == container); else {
					move(obj.node, container, targetghost);
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
			});
			
			if(current){
				current.style.borderWidth = "2px";
			} // if
			
			
		} // stylecontainers
		
		trimcontainers(containers){
			
			containers.forEach(container=>{
				
				// Loop over the children backwards.
				let keep = false;
				for(let i=container.children.length-1; i>-1; i--){
					// The first button that is not a ghost triggers all the others to be kept.
					let testelement = container.children[i];
					let testclass = testelement.classList;
					
					// Don't test if it's the stopend.
					if( !testclass.contains("ghost-endstop") ){
						keep = testclass.contains("ghost") ? keep : true;
						if(!keep){
							container.removeChild(testelement);
						} // if
					} // if
				} // for
				
			}); // forEach
			
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
				}); // forEach
				
				
				// Now force them all to the same length by adding ghost elements in front of the ghost-endstop element.
				categoriesToCoordinate.forEach(category=>{
					let k = n - category.children.length;
					let endstop = category.querySelector("button.ghost-endstop");
					for(let i=0; i<k; i++){
						category.insertBefore(template.html2element(template.ghostbutton()), endstop);
					} // for
				}); // forEach
				
			}); // forEach
			
			
		} // coordinateFileDivs
		
	} // variabledrag




	// Where to get the compatibility information from. Maybe include it in hte variables themselves? That allows more information to be collected there.



	// The coordination of merging.
	class metadatamerger {
		constructor(files){
			let obj = this;
			
			
			// It will need to keep track of the files.
			obj.files = files;
			
			
			// Find which categories are available in the files. Have this as a computed value.
			obj.categories = unique( files.reduce((acc, fileobj)=>{
				acc = acc.concat(fileobj.content.variables.map(v=>v.category));
				return acc
			}, []) );
			
			
			// Category compatibility.
			
			
			// It will need to keep track of the merging information. Maybe it should be a property of this object actually
			obj.merging = {};
			
			
			
			
			let builder = new template(obj.files, obj.categories);
			obj.node = builder.node;
			
			// Apply the draggable functionality. This should really be applied on a file by file basis.
			let body = obj.node.querySelector("div.body");
			let filedivs = obj.node.querySelectorAll("div.file");
			filedivs.forEach(filediv=>{
				let categories = filediv.querySelectorAll("div.category");
				let draggables = filediv.querySelectorAll("button.draggable");
				
				draggables.forEach(draggable=>{
					new variabledrag(draggable, categories, body, builder.color);
				});
			}); // forEach
			
			// HOW TO CONSOLIDTE ALL THE categories??
			
			// Apply the submit functionality.
			obj.node.querySelector("button.submit").addEventListener("click", ()=>obj.hide());
			
			
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
			
			obj.hide();
			
		} // submit
		
		// How to keep track of the merging information. It should be redone everytime a new merging file is loaded. Otherwise it should keep track of what the user selected.
		
		sortByLoadedMergingInfo(fileobjs, loadedInfo){
			
			// HOW TO MAKE THEM MISMATCH ANY NON-MATCHED VARIABLES? PUSH GHOST OBJS BETWEEN??
			// FIRST FOCUS ON MAKING EVERYTHING ELSE WORK
			
			// How to make sure that only items that are fully declared are being used?? Filter out the things that are not needed??
			
			// Reorder the variables in the categories.
			fileobjs.forEach(function(fileobj){
				fileobj.categories.forEach(function(catobj){
					
					
					let mergedItems = loadedInfo[catobj.category];
					if(mergedItems){
						
					
						// Create the reordering dict.
						let ind = {};
						Object.getOwnPropertyNames( mergedItems ).forEach(function(varname, pos){
							let nameInTheFile = mergedItems[varname][fileobj.filename];
							ind[nameInTheFile] = pos;
						});
						
						// How to manage this sorting so that all the sosrts are respected? How to make sure that the values are placed exactly in the spots required. Maybe simply creating a new array would be better??
						catobj.sort(function(a,b){
			
							let aval = typeof( ind[a.variable.name] ) == "number" ? ind[a.variable.name] : Number.POSITIVE_INFINITY;
							let bval = typeof( ind[b.variable.name] ) == "number" ? ind[b.variable.name] : Number.POSITIVE_INFINITY;
									
							let val = isNaN( aval - bval ) ? 0 : aval - bval;
									
							return val
						});
					
					
					} // if
					
				}); // forEach
			}); // forEach
			
			
			return fileobjs
			
		} // sortByLoadedMergingInfo
		
			
	} // metadatamerger

	// Handle the erros within the files, and not within a separate object!!


	class dbsliceFile {
		constructor(file, requester){
			
			// How to load if file is an actual File object.
			if(file instanceof File){
				file = {
					url: URL.createObjectURL(file),
					filename: file.name,
				};
			} // if
			
			this.url = file.url;
			this.filename = file.filename;
			this.extension = file.filename.split(".").pop();
			this.promise = undefined;
			
			// Also log the requestor. If this was passed in then use the passed in value, otherwise the requestor is the user.
			this.requester = requester ? requester : "User";
			
			
			
			
			// Only dbslicefile interacts with errors. The errors are saved attached to the files that produced them. But they are saved separately in the library to both allow them to be reloaded when needed, and to be able to generate an error report for the user.
			this.errors = [];

			
			
			
		} // constructor
		
		
		load(){
			// Collect the data and perform input testing.
			let obj = this;
			
			// Based on the url decide how to load the file.
			let loader;
			switch(this.extension){
				
				case "csv":
					loader = function(url){ return d3.text(url).then(function(text){
						// Filter out any lines that begin with '#', and then parse the rest as csv.
						let text_ = text
						  .split("\n");
						  
						// Don't directly filter, but instead just remove lines until the first one without a '#'.
						for(let i=0; i<text_.length; i++){
							if(text_[0].startsWith("#")){
								text_.splice(0,1);
							} else {
								break;
							} // if
						} // for
						  
						text_ = text_
						  .join("\n");
						  
						  
						return d3.csvParse( text_ )

					}) };
					break;
				
				/*
				case "csv":
					loader = function(url){ return d3.csv(url) }
					break;
				*/
					
				case "json":
					loader = function(url){ return d3.json(url) };
					break;
					
				default:
					// Return a rejected promise as the file extension is wrong.
					
					loader = function(){
						return Promise.reject(new Error("LoaderError: Unsupported Extension"))
					};
					break;
			}		
			
			// Wrap in a larger promise that allows the handling of exceptions.
			
			let loadPromise = new Promise( (resolve, reject)=>{
								
				
				// If the URL points to a non-existing file the d3 loader will reject the promise and throw an error, but still proceed down the resolve branch!
				
				loader(obj.url)
				  .then(
					function(content){
						// Since d3 insists on running the resolve branch even though it doesn't find the file, handle missing contents here.
						
						// csv files are always read as strings - convert numbers to numbers. Should be done here. If it's done in a preceeding promise then the error is lost.
						
						obj.content = content;
						resolve(obj);
						
					},
					function(e){
						// 'e' is an error triggered during loading.
						
						// The two errors that can enter here are file missing, and a problem reading the file.
						
						// This routes any errors that d3 might have into hte new promise.
						reject(e);
					});

				
			})
			.then(this.format)
			.then(this.onload)
			.catch(function(e){
				// This catches all the rejects. 'e' is the field into which the error can be logged.
				delete obj.content;
				obj.errors.push(e);
				return obj
			});
			
			this.promise = loadPromise;
			
		} // load
		
		onload(obj){
		  return obj
		} // onload
	  
		format(obj){
		  return obj
		} // format
		
		static test = {
			
			structure: function (fileClass, content){
				// This an abstract test director. When a file is loaded the file classes do not know exactly how to handle to contents. This test director tries different implemented approaches to reformat the data, and stops when a suitable approach is found. In the future this may be extended to the point where the test involves performing a dummy plotting operation, as the plotting is the last operation to be performed on the file data.
				
				let content_;
			
				// No differentiating between the structure or the content failing - the file classes are trying several different structures.
			
				// Try to use all different file structures possible.
				Object.getOwnPropertyNames( fileClass.structure ).every(function(name){
					try {
						content_ = fileClass.structure[name]( content );
						
						// Return false breaks the loop. This return is reached only if the test was successfully performed and passed.
						return content_ ? false : true
					} catch (e){
						// Keep looping
						content_ = undefined;
						return true
					} // try
					
				}); // forEach
				
				if(content_){
					// Restructuring succeeded.
					return content_
				} else {
					throw( new Error("InvalidFile: Unsupported data structure"))
				} // if
				
			}, // structure
			
		} // test
		
		// Maybe move these to helpers??
		static testrow(array){
		  
		  if(array.length > 0){
			  let i = Math.floor( Math.random()*array.length );
			  return {
				  i: i,
				row: array[i]
			  } // return
		  } else {
			  throw( new Error( "InvalidInput: Array without entries" ))
		  } // if
			  
		} // testrow
		
		static convertNumbers(array){
			
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
		
	} // dbsliceFile

	class line2dFile extends dbsliceFile {
			
		
		format(obj){
			
			let content = dbsliceFile.test.structure(line2dFile, obj.content);

			// Rename the variables to remove leading and trailing blanks.			
			obj.content = line2dFile.rename(content);
			
			return obj

		} // format
		
		
		// Structure should be testable outside as well, as it will have to be called bt onDemandFile when its trying to classify the files.
		static structure = {
			
			csv2lineFile: function(content){
				
				if(Array.isArray(content)){
					
					let content_ = {
						variables: content.columns,
						data: dbsliceFile.convertNumbers( content )
					};
					
					// Test the new contents.
					line2dFile.test.content(content_);
					
					// Structure test succeeded. Delete the columns that accompany the array object.
					delete content_.data.columns;
					
					return content_
				} else {
					return undefined
				} // if
				
			}, // array
			
			json2lineFile: function(content){
				
				if(Array.isArray(content.data)){
					
					
					let content_ = {
						variables: Object.getOwnPropertyNames(content.data[0]),
						data: content.data
					};
					
					// Test the new contents.
					line2dFile.test.content(content_);
					
					return content_
					
				} else {
					return undefined
				} // if
				
			}, // object
			
		} // structure
		
		// Also needed by onDemandFile
		static test = {
			
			content: function(content){
				
				if(content.variables.length < 2){
					throw( new Error("InvalidFile: No variable pair detected" ))
				} // if
				
				
				// All values MUST be numeric!
				let testrow = dbsliceFile.testrow(content.data);
				let areAllContentsNumeric = Object.getOwnPropertyNames(testrow.row).every(function(varName){
					let value = testrow.row[varName];
					return typeof(value) === 'number' && isFinite(value)
				});
				if(!areAllContentsNumeric){
					// There are non-numeric values in the data.
					throw( new Error("InvalidFile: Some variables include non-numeric values." ))
					
				} // if
				
				
				return true
			}, // content
			
		} // test
		
		
		static rename(content){
			// What happens if two names are the same after blanks have been trimmed? Retain the data, but add a modifier to the end.
			
			let renamemap = content.variables.reduce(function(acc, oldname){
				
				let newname = oldname.trim();
				
				if(oldname != newname){
					// Trimming changed something.
					let allnames = Object.getOwnPropertyNames(acc);
				
					let i = 0;
					while(allnames.includes(newname)){
						newname += "_";
						
						// Safety break
						i += 1;
						if(i > 10){break} // if
					} // while
					
					acc[oldname] = newname;	
					
				} // if
				
				return acc
			}, {}); // reduce
			
			
			// Rename the whole content.data array.
			let namestoreplace = Object.getOwnPropertyNames(renamemap);
			
			content.data.forEach(function(row){
				namestoreplace.forEach(function(oldname){
					let newname = renamemap[oldname];
					row[newname] = row[oldname];
					delete row[oldname];
				});
			});
			
			content.variables = Object.getOwnPropertyNames(content.data[0]);
			
			return content
			
			
		} // rename
		
	} // line2dFile

	class contour2dFile extends dbsliceFile {
			
			
		format(obj){
			
			obj.content = dbsliceFile.test.structure(contour2dFile, obj.content);
			return obj
			
		} // format
		
		static structure = {
			// This can now more easily handle different ways of specifying contours. Also convenient to implement the data structure conversion here, e.g. from points to triangles.
			
			json2contour2dFile: function(content){
				
				// Not supposed to be an array! It should contain a single surface. If content.surfaces IS an array, then just select the first one.
				let surface = Array.isArray(content.surfaces) ? content.surfaces[0] : content.surfaces;
				
				// In the content I expect an array called `y', `x', `v' (or others), and `size'. The first three must all be the same length, and the last one must have 2 numbers.
				
				let L = (surface.x.length == surface.y.length) && (surface.x.length > 3) ? surface.x.length : undefined;
				
					
				// Find all possible variables. The variables are deemed available if they are the same length as the x and y arrays. Also, they must contain only numeric values.
				let compulsory = ["x", "y", "size"];
				let variables = Object.getOwnPropertyNames(surface).filter(function(d){
					
					let L_;
					if(!compulsory.includes(d)){
						// This is a possible user variable. It fits if it is an array of the same length as the geometrical parameters, and if it has numeric values.
						let vals = surface[d];
						
						
						
						L_ = Array.isArray( vals ) && !vals.some(isNaN) ? vals.length : undefined;
					} else {
						L_ = undefined;
					} // if
					
					// The particular variable has to be an array of exactly the same length as `x' and `y'.
					
					return L_ == L
				});
				
				
				// Variables must have at least one option.
				let content_;
				if(variables.length > 0){
					content_ = {
						variables: variables,
						surface: surface
					};
				} else {
					throw(new Error("InvalidFile: Unsupported data structure")) 
				} // if
			
				// Hard-coded expected contents
				return content_
					
						
			}, // object
			
		} // structure
		
	} // contour2dFile

	// When implementing new file types, they have to have a separate file (which consists practically only of the testing procedures), and be entered here to be considered during the testing of the metadata variables.




	class onDemandFile extends dbsliceFile {
			
		onload(obj){
			
			// During the data formatting the format of the file is determined already. Here just report it onwards.
			return obj
			
		} // onload
		
		format(obj){
			// Here try all different ways to format the data. If the formatting succeeds, then check if the contents are fine.
			
			let availableFileClasses = [line2dFile, contour2dFile];
			
			// Here just try to fit the data into all hte supported data formats, and see what works.
			
			var format;
			availableFileClasses.every(function(fileClass){
				try {
					// The structure test will throw an error if the content cannot be handled correctly.
					dbsliceFile.test.structure(fileClass, obj.content);
					
					// This file class can handle the data.
					format = fileClass.name;
				} catch {
					return true
				} // if
			});
				
				
			// Output the object, but add it's format to the name.
			if( format ){
				obj.content.format = format;
				return obj
			} else {
				throw( new Error( "InvalidFile: Unsupported data structure" ))
			} // if
				
			
		} // format
		
	  
		static test = {
			
			content: function(){
				// Any content that can be loaded and passes through the format testing is a valid on-demand file.
				return true
			}, // content
			
		} // test
	  
	} // onDemandFile

	// Array comparison helpers.

	// An object containing all the supported variable types, and the tests to properly classify them. The allowable types are those that can come from typeof(test_value). An implementation of a variable type must at least have a "test" function.
	var supportedVariableTypes = {
		
		string: {
			
			supportedCategories: {
				string: ["categorical"],
				datetime: ["categorical", "ordinal"],
				line2dFile: ["categorical", "line2dFile"],
				contour2dFile: ["categorical", "contour2dFile"]
			},
			
			test: function(variable, testval, filename){
				// `variable' needs to be the first input!
				// Return a promise or a fully classified variable.
				
				switch( testval.split(".").pop() ){
					case "json":
					case "csv":
						// Try to classify the testval as a file. The requester is the metadata for which the variables are being classified.
						let testFile = new onDemandFile({url: testval, filename: testval}, filename);
						
						return this.testAsFile(variable, testFile)
					default:
						// Unsupported extension.
						
						
						// Try to see if it's a date!
						
						
						return this.defaultclassification(variable)
				} // switch
			}, // test
			
			
			defaultclassification(variable){
				let testobj = this;
				variable.category = "categorical";
				variable.type = "string";
				variable.supportedCategories = testobj.supportedCategories["string"];
				return variable
			}, // defaultclassification
			
			
			testAsDate(variable, testval){
				
				// How to handle dates actually? categorical/ordinal, datetime/string - has to be specific format - `datetime'. The appropriate format will have to be identified and stored too. Or maybe we should just convert the data as it's loaded? Probably more sensible.
				
				let testobj = this;
				
				
				variable.category = "ordinal";
				variable.type = "datetime";
				variable.supportedCategories = testobj.supportedCategories["datetime"];
				return variable
				
				
			}, // testAsDate
			
			
			testAsFile(variable, testFile){
				// Return fully classified variable object.
				let testobj = this;
				
				testFile.load();
			
				// What can go wrong:
				// file is not found
				// file has wrong content
				
				// Why Promise.all ??
				
				// Below 'fileobj' represents 'testFile'.
				return Promise.all([testFile.promise]).then(function(fileobj){
					
					// It's possible that hte file was found and loaded correctly. In that case 'obj.content.format' will contain the name of the file type. Otherwise this field will not be accessible.
					try {
						// Category is the categorisation that will actually be used, and type cannot be changed.
						variable.category = fileobj[0].content.format;
						variable.type = fileobj[0].content.format;
						variable.supportedCategories = testobj.supportedCategories[variable.type];
						return variable
						
					} catch {
						// If the loading failed for whatever reason the variable is retained as a categorical.
						return testobj.defaultclassification(variable);
						
					} // try
				}) // Promise.all().then
				
				
			} // testAsFile
			
			
		}, // string
		
		
		number: {
			
			test: function(variable){
				variable.category = "ordinal";
				variable.type = "number";
				variable.supportedCategories = ["ordinal", "categorical"];
				return variable
			} // test
		}, // number
		
	}; // supportedVariableTypes




	// Maybe move the tests outside?
	class metadataFile extends dbsliceFile {
		  
		onload(obj){
			// This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
			
			// Check if suitable categories have already been declared.
			let classificationPromise;
			if(!obj.content.categories){
				// Launch the variable classification.
				classificationPromise = obj.classifyvariables();
			} else { 
				classificationPromise = Promise.resolve().then(d=>{return obj}); 
			
			}// if 
			
			// To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.
			return classificationPromise
			
		} // onload
	  
	  
		format(obj){
			
			// Restructure the data into an expected format
			obj.content = dbsliceFile.test.structure(metadataFile, obj.content);
			
			return obj
			
			
		} // format
	  

	  
	  
		static structure = {
		  
		  csv2metadataFile: function(content){
			  
			  let content_;
			  
			  // Data values need to be converted to numbers. Convert the 'variables' into objects?
			  content_ = {
				  variables: content.columns.map(function(d){
					  return {name: d, 
						  category: undefined,
							  type: undefined}
				  }),
				  data: dbsliceFile.convertNumbers( content ),
			  };
			  
			  
			  metadataFile.test.content(content_);
			  
			  delete content_.data.columns;
			  
			  return content_
		  }, // array
		  
		  json2metadataFile: function(content){
			  
			  let content_;
			  
			  
			  content_ = {
				  variables: Object.getOwnPropertyNames(dbsliceFile.testrow(content.data).row).map(function(d){
					  return {name: d, 
						  category: undefined,
							  type: undefined}
				  }),
				  data: content.data,
			  };
				  
			  // Check if declared variables contain all variables in the data.
			  let allVariablesDeclared = arrayEqual(
					metadataFile.cat2var(content.header).map(d=>d.name),
					content_.variables.map(d=>d.name)
			  );
			  
			  // All variables are declared, but have they been declared in the right categories??
			  
			  if(allVariablesDeclared){
				  // All variables have been declared. The categories can be assigned as they are.
				  content_.variables = metadataFile.cat2var(content.header);
				  
			  } // if
			  
			  metadataFile.test.content(content_);
			  
			  return content_
			  
		  }, // object
		  
		} // structure
		
		
		
		classifyvariables(){
			let obj = this;
			
			// This already executes in a promise chain, therefore it's not needed to update the obj.promise. The promises created here will be resolved before the overhead promise resolves further.
			
			// Create all the testing promises.
			let testPromises = obj.content.variables.map(function(variable){
				// Check this column. Variable is now an object!
				return obj.makeVariableClassificationPromise(obj.filename, obj.content.data, variable)
			}); // map
			
			// Return the final promise.
			return Promise.all(testPromises)
				.then(function(variableClassification){
					// The promises update the variable classification into the file object directly.
					
					// obj.content.categories = variableClassification
					return obj
				})
			
		} // classifyvariables
		
		
		makeVariableClassificationPromise(filename, data, variable){
			
			// Retrieve an actual value already.
			let testrow = dbsliceFile.testrow(data);
			let testval = testrow.row[variable.name];
			
		  
			// Split the testing as per the variable type received.
			let testobj = supportedVariableTypes[typeof(testval)];
			if( testobj ){
				return testobj.test(variable, testval, filename);
			} else {
				// For any variables without dedicated support.
				variable.category = "unused";
				variable.type = undefined;
				variable.supportedCategories = [];
				return variable
			} // if
			
		} // makeVariableClassificationPromise
	  
	  
	  // The testing suite for this file type.
	  static test = {
	  
		content: function(content){
			
			// Columns require a taskId property.
			// Declared categories must contain all variables.
			// All rows must be the same lenght
			// There must be some rows.
			// Data must be iterable
			
			
			// Check if the data is an array (has function length)
			let isThereAnyData = Array.isArray(content.data) 
							  && content.data.length > 0;
			

			// Test to make sure all rows have the same number of columns.
			let areRowsConsistent = true;
			let testrow = dbsliceFile.testrow(content.data).row;
			content.data.forEach(function(row){
				arrayEqual(
					Object.getOwnPropertyNames(testrow),
					Object.getOwnPropertyNames(row)
				);
			}); // forEach
			
			return isThereAnyData && areRowsConsistent
			
			
			
			
		} // content
	  
	  } // test
	  
	  

	  
	  // Where is this used??
	  static cat2var(categories){
		  // If categories are given, just report the categorisation. But do check to make sure all of the variables are in the categories!! What to do with label and taskId??
		  
		  let variables = [];
		  let declaredVariables;
		  
		  Object.getOwnPropertyNames(categories)
			.forEach(function(category){
			  if(categoryInfo.supportedCategories.includes(category)){
				  declaredVariables = categories[category].map(
					function(d){
						return {name: d, 
							category: category,
								type: categoryInfo.cat2type[category]}
					});
					
				  variables = variables.concat(declaredVariables);  
			  } // if
			  
			});
		  
		  // Check that all hte variables are declared!
		  
		  return variables
		  
	  } // category2variable
	  
	  

	  
	  
	} // metadataFile

	// Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.





	// For the file library now set some required extent, and then ask for some of the files.
	let testrequired = ["./data/m_c3s_0.csv", "./data/m_c3s_1.csv"];
	let library = new filelibrary();
	library.required = testrequired;




	// The metadatamanager should observe the metadatafiles
	// let manager = new metadatamanager(library.files);



	/* Request a single metadata file. The input for files should be an object:
		file = {
			url: url,
			filename: filename
		}
	 */
	library.single(metadataFile, {url: "./data/m_c3s_0.csv", filename: "./data/m_c3s_0.csv"});
	library.single(metadataFile, {url: "./data/m_c3s_1.csv", filename: "./data/m_c3s_1.csv"});
	console.log(library);







	// Append the node to the merging container. Then append the show functionality somewhere.

	document.getElementById("merging-show").addEventListener("click", ()=>{
		let container = document.getElementById("fullscreen-menu-container");
		
		if(container.lastChild){
			container.lastChild.remove();
		} // if
		
		
		
		// Maybe wait for hte file to be loaded. Or just append the initialisation to the button.
		let metadatafiles = library.retrieveByClass(metadataFile);

		
		// Make a mergerer.
		let mergerer = new metadatamerger(metadatafiles);
		
		
		
		container.appendChild(mergerer.node);
		
		mergerer.show();
	});

})));
