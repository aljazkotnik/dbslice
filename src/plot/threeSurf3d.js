import { dbsliceData } from '../core/dbsliceData.js';
import { render } from '../core/render.js';

const threeSurf3d = {

	make : function ( element, geometry, layout ) {

		threeSurf3d.update ( element, geometry, layout );

	},

	update : function (element, geometry, layout ) {

		var container = d3.select(element);

		if ( layout.highlightTasks == true ) {

            if (dbsliceData.highlightTasks === undefined || dbsliceData.highlightTasks.length == 0) {

                container.style("outline-width","0px")
 
            } else {

                container.style("outline-width","0px")

                dbsliceData.highlightTasks.forEach( function (taskId) {

                	console.log(layout.taskId);

                    if ( taskId == layout.taskId ) {
                    
                        container
                            .style("outline-style","solid")
                            .style("outline-color","red")
                            .style("outline-width","4px")
                            .style("outline-offset","4px")
                            .raise();

                    }

                });
            }
        }

		if (geometry.newData == false) {
            return
        }

        if (layout.vScale === undefined) {
        	var vScale = geometry.vScale;
        } else {
        	var vScale = layout.vScale;
        }


        var color = ( layout.colourMap === undefined ) ? d3.scaleSequential( d3.interpolateSpectral ) : d3.scaleSequential( layout.colourMap );
        color.domain( vScale );

        geometry.faces.forEach(function(face, index) {
        	face.vertexColors[0] = new THREE.Color( color( geometry.faceValues[index][0] ) );
        	face.vertexColors[1] = new THREE.Color( color( geometry.faceValues[index][1] ) );
        	face.vertexColors[2] = new THREE.Color( color( geometry.faceValues[index][2] ) );
        })

		container.select(".plotArea").remove();

        var div = container.append("div")
        	.attr("class", "plotArea")
        	.on( "mouseover", tipOn )
            .on( "mouseout", tipOff );


		var width = container.node().offsetWidth,
			height = layout.height;

		// Compute normals for shading
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
    
		// Use MeshPhongMaterial for a reflective surface
		var material = new THREE.MeshPhongMaterial( {
    		side: THREE.DoubleSide,
    		color: 0xffffff,
    		vertexColors: THREE.VertexColors,
    		specular: 0x0,
    		shininess: 100.,
    		emissive: 0x0
    	});
    
		// Initialise threejs scene
		var scene = new THREE.Scene();

		// Add background colour
		scene.background = new THREE.Color( 0xefefef );
    
		// Add Mesh to scene
		scene.add( new THREE.Mesh( geometry, material ) );
    
		// Create renderer
		var renderer = new THREE.WebGLRenderer({alpha:true, antialias:true}); 
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( width , height );

		// Set target DIV for rendering
		//var container = document.getElementById( elementId );
		div.node().appendChild( renderer.domElement );

		// Define the camera
		var camera = new THREE.PerspectiveCamera( 60, 1, 0.1, 10 );
		camera.position.z = 2; 

		// Add controls 
		var controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.addEventListener( 'change', function(){
    		renderer.render(scene,camera); // re-render if controls move/zoom 
		} ); 
		controls.enableZoom = true; 
 

		var ambientLight = new THREE.AmbientLight( 0xaaaaaa );
		scene.add( ambientLight );

		var lights = [];
		lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 3 );
		lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 3 );
		lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 3 );
		lights[ 3 ] = new THREE.PointLight( 0xffffff, 1, 3 );
		lights[ 4 ] = new THREE.PointLight( 0xffffff, 1, 3 );
		lights[ 5 ] = new THREE.PointLight( 0xffffff, 1, 3 );

		lights[ 0 ].position.set( 0, 2, 0 );
		lights[ 1 ].position.set( 1, 2, 1 );
		lights[ 2 ].position.set( - 1, - 2, -1 );
		lights[ 3 ].position.set( 0, 0, 2 );
		lights[ 4 ].position.set( 0, 0, -2 );
		lights[ 5 ].position.set( 0, -2, 0 );

		lights.forEach(function(light){scene.add(light)});

  
		// Make initial call to render scene
		renderer.render( scene, camera );

		function tipOn() {
            if ( layout.highlightTasks == true ) {
                container
                    .style("outline-style","solid")
                    .style("outline-color","red")
                    .style("outline-width","4px")
                    .style("outline-offset","-4px")
                    .raise();
                dbsliceData.highlightTasks = [layout.taskId];
                render( dbsliceData.elementId, dbsliceData.session, dbsliceData.config );
            }
        }

        function tipOff() {
            if ( layout.highlightTasks == true ) {
                container.style("outline-width","0px")
                dbsliceData.highlightTasks = [];
                render( dbsliceData.elementId, dbsliceData.session, dbsliceData.config );
            }
        }

		geometry.newData = false;

	}

}

export { threeSurf3d };