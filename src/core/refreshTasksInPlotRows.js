import { dbsliceData } from './dbsliceData.js';
import { render } from './render.js';
import { makePlotsFromPlotRowCtrl } from './makePlotsFromPlotRowCtrl.js';


function refreshTasksInPlotRows() {

	var plotRows = dbsliceData.session.plotRows;

	var plotRowPromises = [];

	plotRows.forEach( function( plotRow ) {

		if (plotRow.ctrl !== undefined ) {

			var ctrl = plotRow.ctrl;

			if (ctrl.plotFunc !== undefined ) {

				if ( ctrl.tasksByFilter ) {

					ctrl.taskIds = dbsliceData.filteredTaskIds;
					ctrl.taskLabels = dbsliceData.filteredTaskLabels;
					
				}

				if ( ctrl.tasksByList ) {

					ctrl.taskIds = dbsliceData.manualListTaskIds;

				}

				var plotRowPromise = makePlotsFromPlotRowCtrl( ctrl ).then( function ( plots ){
					plotRow.plots = plots;
				});

				plotRowPromises.push( plotRowPromise );

			}

		}

	});

	Promise.all( plotRowPromises ).then( function() {

		//console.log("rendering....");

		render( dbsliceData.elementId, dbsliceData.session, dbsliceData.config );

	});



}

export { refreshTasksInPlotRows };


