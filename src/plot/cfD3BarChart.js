import { cfUpdateFilters } from '../core/cfUpdateFilters.js';

const cfD3BarChart = {

    make : function( element, data, layout ) {

        var marginDefault = {top: 20, right: 20, bottom: 30, left: 20};
        var margin = ( layout.margin === undefined ) ? marginDefault  : layout.margin;

        var container = d3.select(element);

        var svgWidth = container.node().offsetWidth,
            svgHeight = layout.height;

        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;

        var dimId = data.cfData.metaDataProperties.indexOf( data.property );
        console.log(data.property);
        console.log(data.cfData.metaDims);

        var svg = container.append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr( "class", "plotArea" )
                .attr( "dimId", dimId);

        cfD3BarChart.update( element, data, layout );

    }, 

    update : function ( element, data, layout ) {
     
        var marginDefault = {top: 20, right: 20, bottom: 30, left: 20};
        var margin = ( layout.margin === undefined ) ? marginDefault  : layout.margin;

        var container = d3.select(element);

        var svg = container.select("svg");

        var svgWidth = svg.attr("width");
        var svgHeight = svg.attr("height");

        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;

        var plotArea = svg.select(".plotArea");
        var dimId = plotArea.attr("dimId");

        console.log(dimId);

        var cf = data.cfData.cf;
        var property = data.property;

        var dim = data.cfData.metaDims[ dimId ];
        var group = dim.group();
        //var items = group.top( Infinity );
        var items = group.all()

        var x = d3.scaleLinear()
            .range( [0, width] )
            .domain( [ 0, d3.max( items, v => v.value ) ] );

        var y = d3.scaleBand()
            .range( [0, height] )
            .domain(items.map(function(d){ return d.key; }))
            .padding( [0.2] )
            .align([0.5]);

        var colour = d3.scaleOrdinal( d3.schemeCategory20c );

        var bars = plotArea.selectAll( "rect" )
            .data( items, v => v.key );

        bars.enter()
            .append( "rect" )
            .on( "click", ( selectedItem ) => {

                if ( data.cfData.filterSelected[ dimId ] === undefined ) {
                     data.cfData.filterSelected[ dimId ] = [];
                }

                // check if current filter is already active
                if ( data.cfData.filterSelected[ dimId ].indexOf( selectedItem.key ) !== -1 ) {

                    // already active
                    var ind = data.cfData.filterSelected[ dimId ].indexOf( selectedItem.key );
                    data.cfData.filterSelected[ dimId ].splice( ind, 1 );

                } else {

                    data.cfData.filterSelected[ dimId ].push( selectedItem.key );

                }

                cfUpdateFilters(data.cfData);

            })
            .attr( "height", y.bandwidth() )
            .attr( "y", v => y(v.key) )
            .style( "fill", v => colour(v.key) )
            .transition()
                .attr( "width", v => x( v.value ) )
                // initialise opacity for later transition
                .attr( "opacity", 1 );

        // updating the bar chart bars
        bars.transition()
            .attr( "width", v => x( v.value ) )
            // change colour depending on whether the bar has been selected
            .attr( "opacity", ( v ) => {

                // if no filters then all are selected
                if ( data.cfData.filterSelected[ dimId ] === undefined || data.cfData.filterSelected[ dimId ].length === 0 ) {

                    return 1;

                } else {

                    return data.cfData.filterSelected[ dimId ].indexOf( v.key ) === -1 ? 0.2 : 1;

                }

            } );

        var xAxis = plotArea.select(".xAxis");
        if ( xAxis.empty() ) {
            plotArea.append("g")
                .attr( "transform", "translate(0," + height + ")" )
                .attr( "class", "xAxis")
                .call( d3.axisBottom( x ) )
                .append("text")
                    .attr("fill", "#000")
                    .attr("x", width)
                    .attr("y", margin.bottom)
                    .attr("text-anchor", "end")
                    .text("Number of Tasks");
        } else {
            xAxis.attr( "transform", "translate(0," + height + ")" ).transition().call( d3.axisBottom( x ) );
        }

        var yAxis = plotArea.select(".yAxis");
        if ( yAxis.empty() ) {
            plotArea.append("g")
                .attr( "class", "yAxis")
                .call( d3.axisLeft( y ).tickValues( [] ) );
        } else {
            yAxis.transition().call( d3.axisLeft( y ).tickValues( []) );
        }

        var keyLabels = plotArea.selectAll( "keyLabel" )
            .data( items, v => v.key );

        keyLabels.enter()
            .append( "text" )
            .attr( "class", "keyLabel" )
            .attr( "x", 0 )
            .attr( "y", v => y(v.key) + 0.5*y.bandwidth() )
            .attr( "dx", 5 )
            .attr( "dy", ".35em" )
            .attr( "text-anchor", "start" )
            .text( v => v.key );

        // updating meta Labels
        keyLabels
            .text( v => v.key );

    }
};

export { cfD3BarChart };