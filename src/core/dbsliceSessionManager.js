import {makeObservable, observable, action, autorun} from "mobx";



import dbsliceCrossfilterPlot from "../plot/dbsliceCrossfilterPlot.js";


/*
Add/remove plots
Will prescribe the color
Coordinate with the filter
Export a session file
*/


export default class dbsliceSessionManager{
	constructor(container){
		/* Needs to have access to the file library, the filter object, and the metadata. And the container to which to append the plots to.
		
		Needs to have some DOM controls to add and remove the plots.
		
		*/
		let obj = this;
		
		obj.container = container;
		obj.plots = []
		
		
		makeObservable(obj, {
			plots: observable,
			addplot: action,
			removeInactivePlot: action
		})
		
		
		autorun(()=>{
			obj.update();
		})
		
	} // constructor
	
	
	addplot(){
		let obj = this;
		
		// Give it accesss to data. How should that be passed in. Maybe this one should just control it? And do it in the autorun -> update?
		let plot = new dbsliceCrossfilterPlot();
		obj.container.appendChild(plot.node);
		
		obj.plots.push(plot)
	} // addplot
	
	
	removeInactivePlot(plotobj){
		let obj = this
		obj.plots.splice( obj.plots.indexOf(plotobj), 1);
		plotobj.node.parentElement.removeChild(plotobj.node);
	} // removeInactivePlot
	
	update(){
		let obj = this;
				
		// Splice any inactive plots out of the storage.
		obj.plots.forEach(plotobj=>{
			if(!plotobj.active){
				obj.removeInactivePlot(plotobj);
			} // if
		}) // forEach
	} // removeInactivePlots
	
	
} // dbsliceSessionManager