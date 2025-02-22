
var ns_irrigation_map = {

  init: function(){
//var ValueByProvince = d3.map();
var map_id='sown_irrigation_map_container'

var formatTotal = d3.format(',.0f');

//the size of the graph
var width = 960,
height = 700;

var color_irrigated="#6B8033"
var color_sown="#0F1C11"

// legends positions
var leg_bubble1_top = height - 170;
var leg_bubble1_left = width - 115;
var offset_legend_bubble2 = -200;

var leg_basemap_top = height - 145;
var leg_basemap_left = 10;
var leg_square_size = 15

var value_irrigated_area = {};
var value_sown_area = {};
var value_water_resources = {};
var color_water_resources = {};

var selected_bubbles;

var offsetLegendBubble2 = function(){
  if(selected_bubbles=='both'){
      return offset_legend_bubble2;
  }else{
    return 0;
  }
}

//projection
var projection = d3.geoMercator()
.center([107, 31])
.scale(850)
.translate([width/2+30, height/2+110]);

var path = d3.geoPath()
.projection(projection);

var svg = d3.select("#"+map_id)
.append('svg')
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 960 700")
.classed("svg-content", true);

var tooltip = d3.select("#"+map_id).append("div").attr("class", "map-tooltip");
var offsetL = document.getElementById(map_id).offsetLeft+10;
var offsetT = document.getElementById(map_id).offsetTop+10;

//specify values for legend
var maxValueIrrigated = 15000;
var minValueIrrigated = 100;

var maxValueSown = 15000;
var minValueSown = 100;

//specify color for legend
var colorBubbleIrrigated = d3.scaleLinear()
.domain([minValueIrrigated, maxValueIrrigated])
.range([color_irrigated])
.interpolate(d3.interpolateHcl);

var colorBubbleSown = d3.scaleLinear()
.domain([minValueSown, maxValueSown])
.range([color_sown])
.interpolate(d3.interpolateHcl);

function showMapTooltipAll(d) {
      province_name = d.properties.NAME_1;
			irrigated_area = value_irrigated_area[province_name];
			sown_area = value_sown_area[province_name];

			x=(d3.event.layerX +30)
			y=(d3.event.layerY - 70)

      var mouse = d3.mouse(svg.node())
        .map( function(d) { return parseInt(d); } );
    	tooltip.style("display", "inherit")
      .attr("class", "map-tooltip irrigated-g")
      .attr("style", "left:"+x+"px;top:"+y+"px")
      .html("<b>"+province_name+"</b><br/> "+
            "Sown area: "+sown_area+" x 1,000 hectares<br/>"+
            "Irrigated area: "+parseInt(parseFloat(irrigated_area)/parseFloat(sown_area)*100)+"%");
}



function showMapTooltip(d){
  showMapTooltipAll(d);
  // if(selected_bubbles=='irrigated'){
  //   return showMapTooltipIrrigated(d);
  // }else if(selected_bubbles=='sown'){
  //   return showMapTooltipSown(d);
  // }
}

colorAvail = function(cum){
  if(cum<500){
    return "#9F171E";
  }else if(cum<1000){
    return "#7C8388";
  }else if(cum<2000){
    return "#094677";
  }else{
    return "#0D77B9";
  }
}

colorWri = function(firstLetter){
	dict = {'1':"#ffffa3",
	'2':"#ffe600",
	'3':"#ff9900",
	'4':"#ff1900",
	'5':"#bb0007",
	'A':"#505050"}
	return dict[firstLetter];
}

var colorTws = d3.scaleLinear()
	.domain([-2,-1,0,1,2])
	.range(['#d7191c', '#fdae61','#ffffbf','#abd9e9','#2c7bb6'])
	.interpolate(d3.interpolateHcl);

var radiusIrrigated = d3.scaleSqrt()
.domain([minValueIrrigated, maxValueIrrigated])
.range([5, 50]);

var radiusSown = d3.scaleSqrt()
.domain([minValueSown, maxValueSown])
.range([2, 50]);


var wri_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/wri/wri_china_simplified_sd.geojson'
var provinces_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/province/simplified_smoothed_cleaned_provinces_sd.geojson'
var provinces_centroids_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/province/provinces_centroids.geojson'

var irrigated_area_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/agriculture/irrigated_area_years_1000ha.csv'
var sown_area_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/agriculture/sown_area_years_1000ha.csv'

var water_resources_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/water_resources.csv'
var tws_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/tws/tws_china.geojson'

d3.json(wri_json_url, function(error, wri){
	d3.json(provinces_json_url, function(error, provinces){
		d3.json(provinces_centroids_json_url, function(error, centroids){
			d3.json(tws_url, function(error, tws){
			d3.csv(irrigated_area_csv_url, function(error, data_irrigated_area){
				d3.csv(sown_area_csv_url, function(error, data_sown_area){
					d3.csv(water_resources_csv_url, function(error, data_water_resources){

							//load data
							data_irrigated_area.forEach(function(d){
								value_irrigated_area[d.Province] = parseFloat(d['2016']);
								value_irrigated_area[d.Region] = parseFloat(d['2016']); // waiting for github to refresh. Delete once done
							});

							data_sown_area.forEach(function(d){
								value_sown_area[d.Province] = parseFloat(d['2016']);
							});


							data_water_resources.forEach(function(d){
								value_water_resources[d.Province] = d['Water Resources Per Capita (cum/year)']; //TODO
								color_water_resources[d.Province] = d.Color;
							});

							svg.selectAll('#wri')
							.data(wri.features)
							.enter()
							.append('path')
							.attr('id', 'wri')
							.attr('class','wri-g')
							.attr('d', path)
							.style('fill', function(d){
								return colorWri(d.properties.BWS_cat.charAt(0));
							});

							svg.selectAll('#province_fill')
							.data(provinces.features)
							.enter()
							.append('path')
							.attr('id', 'province_fill')
							.attr('class','avail-g')
							.attr('d', path)
							.style('fill', function(d){
								return colorAvail(value_water_resources[d.properties.NAME_1]);
							})
							.style('stroke', 'transparent');

							svg.selectAll('#tws')
							.data(tws.features)
							.enter()
							.append('path')
							.attr('id', 'tws')
							.attr('class','tws-g')
							.attr('d', path)
							.style('fill', function(d){
								return colorTws(d.properties.tws);
							});


							svg.selectAll('#province_border')
							.data(provinces.features)
							.enter()
							.append('path')
							.attr('id', 'province_border')
							.attr('class','province-border-g')
							.attr('d', path)
							.style('fill', 'transparent')
							.style('stroke', '#CFD8DC')
							.style('stroke-width', 1);


							svg.selectAll('#bubble_sown')
							.data(centroids.features)
							.enter()
							.append('circle')
							.attr('id', 'bubble_sown')
							.attr('class', 'sown-g')
							.attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
							.attr('r', function(d){
								return radiusSown(value_sown_area[d.properties.NAME_1]);
							})
							.style('fill', function(d) {
								return colorBubbleSown(value_sown_area[d.properties.NAME_1]);
							})
							.style('fill-opacity',1)
							.style('stroke','color_sown')
							.on("mousemove", showMapTooltip)
							.on("mouseout", function(d){ tooltip.style("display", "none");});

              svg.selectAll('#bubble_irrigated')
              .data(centroids.features)
              .enter()
              .append('circle')
              .attr('id', 'bubble_irrigated')
              .attr('class', 'irrigated-g')
              .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
              .attr('r', function(d){
                return radiusIrrigated(value_irrigated_area[d.properties.NAME_1]);
              })
              .style('fill', function(d) {
                return colorBubbleIrrigated(value_irrigated_area[d.properties.NAME_1]);
              })
              .style('fill-opacity',1)
              .style('stroke',color_irrigated)
              .on("mousemove", showMapTooltip)
              .on("mouseout", function(d){ tooltip.style("display", "none");});


							svg.selectAll('#bubble_text')
							.style("text-anchor", "middle")
							.data(centroids.features)
							.enter()
							.append('text')
							.attr('id', 'bubble_text')
              .attr('class','province-name-g')
							.attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
							.style('fill','#FFFFFF')
							.text(function(d) { return d.properties.NAME_1; })
              .on("mousemove", showMapTooltip)
              .on("mouseout", function(d){ tooltip.style("display", "none");});


							var legend_bubbled_irrigated = svg.append("g")
							.attr("class", "legend legend-bubble irrigated-g");

							var leg1 = legend_bubbled_irrigated.append("text")
							.attr("class", "legend-header")
							.attr("x", leg_bubble1_left)
							.attr("y", leg_bubble1_top + offsetLegendBubble2())
							.text("Irrigated area");

							legend_bubbled_irrigated.append("text")
							.attr("class", "legend-unit")
							.attr("x", leg_bubble1_left)
							.attr("y", leg_bubble1_top)
							.attr("dy","1em")
							.text("[1,000 hectares]");

							legend_bubbled_irrigated.selectAll(".legend-bubble")
							.data([minValueIrrigated, (maxValueIrrigated + minValueIrrigated) / 3, maxValueIrrigated])
							.enter()
							.append("circle")
							.attr("class", "legend-bubble")
							.attr("fill", color_irrigated)
              .attr("opacity",0.3)
							.attr("cx", leg_bubble1_left + radiusIrrigated(maxValueIrrigated))
							.attr("cy", function(d) { return leg_bubble1_top - radiusIrrigated(d) + 140; })
							.attr("r", function(d) { return radiusIrrigated(d); });

							legend_bubbled_irrigated.selectAll(".legend-label")
							.data([minValueIrrigated, (maxValueIrrigated + minValueIrrigated) / 3, maxValueIrrigated])
							.enter()
							.append("text")
							.attr("class", "legend-label")
							.attr("x", leg_bubble1_left + radiusIrrigated(maxValueIrrigated) - 7)
							.attr("y", function(d) { return (leg_bubble1_top +135 - 2 * radiusIrrigated(d)); })
							.text(d3.format(".1s"));



							var legend_bubbled_sown = svg.append("g")
							.attr("class", "legend legend-bubble sown-g");

							legend_bubbled_sown.append("text")
							.attr("class", "legend-header sown-g")
							.attr("x", leg_bubble1_left)
							.attr("y", leg_bubble1_top)
							.text("Sown area");

							legend_bubbled_sown.append("text")
							.attr("class", "legend-unit sown-g")
							.attr("x", leg_bubble1_left)
							.attr("y", leg_bubble1_top)
							.attr("dy","1em")
							.text("[1,000 hectares]");

							legend_bubbled_sown.selectAll(".legend-bubble")
							.data([minValueSown, (maxValueSown + minValueSown) / 3, maxValueSown])
							.enter()
							.append("circle")
							.attr("class", "legend-bubble sown-g")
							.attr("fill", color_sown)
							.attr("opacity",0.3)
							.attr("cx", leg_bubble1_left + radiusSown(maxValueSown))
							.attr("cy", function(d) { return leg_bubble1_top - radiusSown(d) + 140; })
							.attr("r", function(d) { return radiusSown(d); });

							legend_bubbled_sown.selectAll(".legend-label")
							.data([minValueSown, (maxValueSown + minValueSown) / 3, maxValueSown])
							.enter()
							.append("text")
							.attr("class", "legend-label sown-g")
							.attr("x", leg_bubble1_left + radiusSown(maxValueSown) - 7)
							.attr("y", function(d) { return (leg_bubble1_top +135 - 2 * radiusSown(d)); })
							.text(d3.format(".1s"));

							var legend_wri = svg.append("g")
							.attr("class", "legend legend-squared wri-g");

							legend_wri.append("text")
							.attr("class", "legend-header")
							.attr("x", leg_basemap_left)
							.attr("y", leg_basemap_top)
							.text("Water Stress");

							legend_wri.selectAll(".legend-square")
							.data(['1','2','3','4','5','A'])
							.enter()
							.append("rect")
							.attr("class", "legend-square")
              .attr("x", leg_basemap_left)
              .attr("y", function(d, i) { return leg_basemap_top + 20 + i * 15 ; })
							.attr("width", 15)
							.attr("height", 15)
							.style("fill", function(d) { return colorWri(d); });

							legend_wri.selectAll(".legend-label")
							.data(['Low', 'Arid'])
							.enter()
							.append("text")
							.attr("class", "legend-label")
              .attr("x", leg_basemap_left + 20)
              .attr("y", function(d, i) { return leg_basemap_top + 20 + 12 + i * (15 * 5); })
							.text(function(d) { return d; });



              var legend_avail = svg.append("g")
              .attr("class", "legend legend-squared avail-g");

              legend_avail.append("text")
              .attr("class", "legend-header")
              .attr("x", leg_basemap_left)
              .attr("y", leg_basemap_top)
              .text("Water Resources");

              legend_avail.append("text")
              .attr("class", "legend-header")
              .attr("x", leg_basemap_left)
              .attr("y", leg_basemap_top)
              .attr("dy", "1em") // you can vary how far apart it shows up
              .text("Per Capita");

              legend_avail.append("text")
              .attr("class", "legend-unit")
              .attr("x", leg_basemap_left)
              .attr("y", leg_basemap_top)
              .attr("dy", "2em") // you can vary how far apart it shows up
              .text("[cum/pax/year]");

              legend_avail.selectAll(".legend-square")
              .data(['499','999','1999','2001'])
              .enter()
              .append("rect")
              .attr("class", "legend-square")
              .attr("x", leg_basemap_left)
              .attr("y", function(d, i) { return leg_basemap_top + 40 + i * leg_square_size ; })
              .attr("width", leg_square_size)
              .attr("height", leg_square_size)
              .style("fill", function(d) { return colorAvail(d); });

              legend_avail.selectAll(".legend-label")
              .data(['<500', '500-1000', '1000-2000','>2000'])
              .enter()
              .append("text")
              .attr("class", "legend-label")
              .attr("x", leg_basemap_left + 20)
              .attr("y", function(d, i) { return leg_basemap_top + 40 + 12 + i * (leg_square_size); })
              .text(function(d) { return d; });

							var legend_tws = svg.append("g")
							.attr("class", "legend legend-squared tws-g");

							legend_tws.append("text")
							.attr("class", "legend-header")
              .attr("x", leg_basemap_left)
							.attr("y", leg_basemap_top)
							.text("Trends in");

							legend_tws.append("text")
							.attr("class", "legend-header")
              .attr("x", leg_basemap_left)
							.attr("y", leg_basemap_top)
						  .attr("dy", "1em") // you can vary how far apart it shows up
						  .text("Water Storage");

							legend_tws.append("text")
							.attr("class", "legend-unit")
              .attr("x", leg_basemap_left)
							.attr("y", leg_basemap_top)
						  .attr("dy", "2em") // you can vary how far apart it shows up
						  .text("[cm/year]");

							legend_tws.selectAll(".legend-square")
							.data(['-2','-1','0','1','2'])
							.enter()
							.append("rect")
							.attr("class", "legend-square")
              .attr("x", leg_basemap_left)
							.attr("y", function(d, i) { return leg_basemap_top + 40 + i * 15 ; })
							.attr("width", 15)
							.attr("height", 15)
							.style("fill", function(d) { return colorTws(d); });

							legend_tws.selectAll(".legend-label")
							.data(['-2', '0', '2'])
							.enter()
							.append("text")
							.attr("class", "legend-label")
							.attr("x", leg_basemap_left + 20)
							.attr("y", function(d, i) { return leg_basemap_top + 40 + 12 + i * (15 *2); })
							.text(function(d) { return d; });

							// Selectors
							setBasemap = function(view) {
								var wri = svg.selectAll(".wri-g");
								var provinces = svg.selectAll(".avail-g");
								var tws = svg.selectAll(".tws-g");

								if (view === "wri") {
									wri.style("display", "inherit");
									provinces.style("display", "none");
									tws.style("display", "none");
								} else if (view === "avail") {
									wri.style("display", "none");
									tws.style("display", "none");
									provinces.style("display", "inherit");
								} else if (view === "tws") {
									wri.style("display", "none");
									provinces.style("display", "none");
									tws.style("display", "inherit");
								}
							}

							setBubbles = function(view) {
                selected_bubbles = view
								var irrigated = svg.selectAll(".irrigated-g");
								var sown = svg.selectAll(".sown-g");
								var sown_legend = svg.selectAll(".legend.sown-g");

								if (view === "irrigated") {
                  sown_legend.attr("transform", "translate(0,0)");

									irrigated.style("display", "inherit");
									sown.style("display", "none");
								} else if (view === "sown") {
                  sown_legend.attr("transform", "translate(0,0)");
									irrigated.style("display", "none");
									sown.style("display", "inherit");
								} else if (view === 'both'){
                  irrigated.style("display", "inherit");
                  sown.style("display", "inherit");
                  // irrigated.transition().attr("x",0);
                  // d3.select(".irrigated-g").transition().attr("x",0);

                  sown_legend.attr("transform", "translate(0,-200)");
                  //       .duration(500)
                  //       .attr("x",0);
                  //       legend_bubbled_sown.enter().transition()
                  //             .duration(500)
                  //             .attr("y",0);
                  // to_move = sown.data(sown.data());
                  // to_move.transition()
                  //       .attr("y",0);

                }
							}

							//Set button toggle for view state
							d3.selectAll("input[name='basemap']")
							.on("click", function() {
								view = d3.select(this).attr("id").replace("input_","");
								setBasemap(view);
							});

							d3.selectAll("input[name='bubbles']")
							.on("click", function() {
								view = d3.select(this).attr("id").replace("input_","");
								setBubbles(view);
							});

							setBasemap("wri")
							setBubbles("irrigated")

						});
					});
				});
			});
		});
	});
});
}
}
jQuery( document ).ready(function() {
  ns_irrigation_map.init();
});
