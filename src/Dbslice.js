// import "@babel/polyfill";
import 'whatwg-fetch';

export { cfInit } from './core/cfInit.js';
export { cfD3BarChart } from './plot/cfD3BarChart.js';
export { cfD3Histogram } from './plot/cfD3Histogram.js';
export { cfD3Scatter } from './plot/cfD3Scatter.js';
export { render } from './core/render.js';
export { initialise } from './core/initialise.js';
export { makeNewPlot } from './core/makeNewPlot.js';
export { updatePlot } from './core/updatePlot.js';
export { cfUpdateFilters } from './core/cfUpdateFilters.js';
export { makePlotsFromPlotRowCtrl } from './core/makePlotsFromPlotRowCtrl.js'; 
export { refreshTasksInPlotRows } from './core/refreshTasksInPlotRows.js'; 
export { makeSessionHeader } from './core/makeSessionHeader.js';
export { getFilteredTaskIds } from './core/getFilteredTaskIds.js';
export { getFilteredTaskLabels } from './core/getFilteredTaskLabels.js';
export { addMenu } from './core/addMenu.js';