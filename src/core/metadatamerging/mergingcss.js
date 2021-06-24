/*
The css is held in js form to allow the modules just be imported in the javascript, without having to add the css to the document separately.

Another version of adding the css is to specify it in javascript objects, and when appending the html elements also append the styles. Just adding the styles directly is more simple for hte time being though.

COMMON: card, btn
METADATAMENU: fullscreenContainer, cardTitle
ERRORREPORT: btn{Submit}
METADATA MERGER: btn{Submit, Pill, Legend, Draggable, Ghost}, div{FileColumn, CategoryWrapper, Category}

*/

// Declare the necessary css here.
export let css = {
	
  fullscreenContainer: `
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(90, 90, 90, 0.5);
  `,
  
  cardTitle: `
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	margin-top: 40px;
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
	  padding: 4px;
  `,
	
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
  
  btnSubmit: `
	background-color: mediumSeaGreen; 
	color: white;
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