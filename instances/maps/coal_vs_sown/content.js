var ns_coal_sown = {

  init: function(){

    //var ValueByProvince = d3.map();
    var map_id='coal_sown_map'

    var formatTotal = d3.format(',.0f');

    var neonGreen = "#69F052"
    var neonBlue = "#00B5FF"

    var colorSown = neonBlue
    //var colorSown = "#9ADFFF"

    //the size of the graph
    var width = 960,
    height = 700;

    // legends positions
    var leg_bubble1_top = height - 170;
    var leg_bubble1_left = width - 115;
    var offset_legend_bubble2 = -200;

    var leg_basemap_top = height - 145;
    var leg_basemap_left = 10;
    var leg_square_size = 15

    var value_coal_resources = {};
    var value_coal_resources_years = {};

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

    var tooltip = d3.select("#"+map_id)
    .append("div")
    .style("position", "absolute")
    .attr("class", "map-tooltip")
    .attr("id","map_tooltip");
    var offsetL = document.getElementById(map_id).offsetLeft+10;
    var offsetT = document.getElementById(map_id).offsetTop+10;

    //specify values for legend
    var maxValueCoal = 100000;
    var minValueCoal = 10;

    var maxValueSown = 15000;
    var minValueSown = 100;

    //specify color for legend
    var colorBubbleCoal = d3.scaleLinear()
    .domain([minValueCoal, maxValueCoal])
    .range(["#000000"])
    .interpolate(d3.interpolateHcl);

    var colorBubbleSown = d3.scaleLinear()
    .domain([minValueSown, maxValueSown])
    .range([colorSown])
    .interpolate(d3.interpolateHcl);

    function showMapTooltipCoal(d) {
      province_name = d.properties.NAME_1;
      mn_tonnes = value_coal_resources[province_name];

      x=(d3.event.layerX - 30)
      y=(d3.event.layerY - 70)

      tooltip.attr("class", "map-tooltip coal-g");
      tooltip.style("display", "inherit");
      tooltip.style("top", y + "px").style("left",(x+50)+ "px");
      //tooltip.style("top", (d3.event.pageY) + "px").style("left",(d3.event.pageX +20) + "px");

      console.log(d3.event.type)
      if(d3.event.type=="mouseover"){
        tooltip_chart_coal(d,'map_tooltip');
      }
      //
      // var mouse = d3.mouse(svg.node())
      //   .map( function(d) { return parseInt(d); } );
      //
      // 	tooltip.style("display", "inherit")
      //   .attr("class", "map-tooltip coal-g")
      //   .attr("style", "left:"+x+"px;top:"+y+"px");
      //   //.html("<b>"+province_name+"</b><br /> "+mn_tonnes+" mn tonnes" );


    }

    function showMapTooltipSown(d) {
      province_name = d.properties.NAME_1;
      area = value_sown_area[province_name];

      x=(d3.event.layerX - 30)
      y=(d3.event.layerY - 70)

      var mouse = d3.mouse(svg.node())
      .map( function(d) { return parseInt(d); } );
      tooltip.style("display", "inherit")
      .attr("class", "map-tooltip sown-g")
      .attr("style", "left:"+x+"px;top:"+y+"px")
      .html("<b>"+province_name+"</b><br /> "+area+" x 1,000 hectares" );
    }

    function showMapTooltip(d){
      if(selected_bubbles=='coal'){
        return showMapTooltipCoal(d);
      }else if(selected_bubbles=='sown'){
        return showMapTooltipSown(d);
      }
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

    var radiusCoal = d3.scaleSqrt()
    .domain([minValueCoal, maxValueCoal])
    .range([5, 50]);

    var radiusSown = d3.scaleSqrt()
    .domain([minValueSown, maxValueSown])
    .range([2, 50]);


    var wri_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/wri/wri_china_simplified_sd.geojson'
    var provinces_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/province/simplified_smoothed_cleaned_provinces_sd.geojson'
    var provinces_centroids_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/province/provinces_centroids.geojson'
    var coal_resources_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/coal_resources_mn_tonnes.csv'
    var sown_area_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/agriculture/sown_area_years_1000ha.csv'
    var water_resources_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/water_resources.csv'
    var tws_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/tws/tws_china.geojson'

    d3.json(wri_json_url, function(error, wri){
      d3.json(provinces_json_url, function(error, provinces){
        d3.json(provinces_centroids_json_url, function(error, centroids){
          d3.json(tws_url, function(error, tws){
            d3.csv(coal_resources_csv_url, function(error, data_coal_resources){
              d3.csv(sown_area_csv_url, function(error, data_sown_area){
                d3.csv(water_resources_csv_url, function(error, data_water_resources){

                  //load data
                  data_coal_resources.forEach(function(d){
                    value_coal_resources[d.Province] = parseFloat(d['2016']);
                    value_coal_resources[d.Region] = parseFloat(d['2016']); // waiting for github to refresh. Delete once done
                    value_coal_resources_years[d.Province] = d; // waiting for github to refresh. Delete once done
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


                  svg.selectAll('#bubble_coal')
                  .data(centroids.features)
                  .enter()
                  .append('circle')
                  .attr('id', 'bubble_coal')
                  .attr('class', 'coal-g')
                  .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
                  .attr('r', function(d){
                    return radiusCoal(value_coal_resources[d.properties.NAME_1]);
                  })
                  .style('fill', function(d) {
                    return colorBubbleCoal(value_coal_resources[d.properties.NAME_1]);
                  })
                  .style('fill-opacity',0.8)
                  .style('stroke','black')
                  .on("mouseover", showMapTooltipCoal)
                  .on("mousemove", showMapTooltipCoal)
                  .on("mouseout", function(d){ tooltip.style("display", "none");});


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
                  .style('fill-opacity',0.7)
                  .style('stroke',colorSown)
                  .on("mousemove", showMapTooltipSown)
                  .on("mouseout", function(d){ tooltip.style("display", "none");});


                  svg.selectAll('#bubble_text')
                  .style("text-anchor", "middle")
                  .data(centroids.features)
                  .enter()
                  .append('text')
                  .attr('id', 'bubble_text')
                  .attr('class', 'province-name-g')
                  .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
                  .style('fill','#FFFFFF')
                  .text(function(d) { return d.properties.NAME_1; })
                  .on("mousemove", showMapTooltip)
                  .on("mouseout", function(d){ tooltip.style("display", "none");});


                  var legend_bubbled_coal = svg.append("g")
                  .attr("class", "legend legend-bubble coal-g");

                  var leg1 = legend_bubbled_coal.append("text")
                  .attr("class", "legend-header")
                  .attr("x", leg_bubble1_left)
                  .attr("y", leg_bubble1_top + offsetLegendBubble2())
                  .text("Coal reserves");

                  legend_bubbled_coal.append("text")
                  .attr("class", "legend-unit")
                  .attr("x", leg_bubble1_left)
                  .attr("y", leg_bubble1_top)
                  .attr("dy","1em")
                  .text("[mn tonnes]");

                  legend_bubbled_coal.selectAll(".legend-bubble")
                  .data([minValueCoal, (maxValueCoal + minValueCoal) / 3, maxValueCoal])
                  .enter()
                  .append("circle")
                  .attr("class", "legend-bubble")
                  .attr("fill", "#000000")
                  .attr("opacity",0.3)
                  .attr("cx", leg_bubble1_left + radiusCoal(maxValueCoal))
                  .attr("cy", function(d) { return leg_bubble1_top - radiusCoal(d) + 140; })
                  .attr("r", function(d) { return radiusCoal(d); });

                  legend_bubbled_coal.selectAll(".legend-label")
                  .data([minValueCoal, (maxValueCoal + minValueCoal) / 3, maxValueCoal])
                  .enter()
                  .append("text")
                  .attr("class", "legend-label")
                  .attr("x", leg_bubble1_left + radiusCoal(maxValueCoal) - 7)
                  .attr("y", function(d) { return (leg_bubble1_top +135 - 2 * radiusCoal(d)); })
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
                  .data([maxValueSown, (maxValueSown + minValueSown) / 3, minValueSown])
                  .enter()
                  .append("circle")
                  .attr("class", "legend-bubble sown-g")
                  .attr("fill", colorSown)
                  .attr("opacity",0.5)
                  .attr('stroke','white')
                  .attr('stroke-width',2)
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
                    var coal = svg.selectAll(".coal-g");
                    var sown = svg.selectAll(".sown-g");
                    var sown_legend = svg.selectAll(".legend.sown-g");

                    if (view === "coal") {
                      sown_legend.attr("transform", "translate(0,0)");

                      coal.style("display", "inherit");
                      sown.style("display", "none");
                    } else if (view === "sown") {
                      sown_legend.attr("transform", "translate(0,0)");
                      coal.style("display", "none");
                      sown.style("display", "inherit");
                    } else if (view === 'both'){
                      coal.style("display", "inherit");
                      sown.style("display", "inherit");
                      // coal.transition().attr("x",0);
                      // d3.select(".coal-g").transition().attr("x",0);

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
                    view = d3.select(this).attr("val");
                    setBasemap(view);
                  });

                  d3.selectAll("input[name='bubbles']")
                  .on("click", function() {
                    view = d3.select(this).attr("val");
                    setBubbles(view);
                  });

                  setBasemap("wri")
                  setBubbles("coal")

                });
              });
            });
          });
        });
      });
    });


    function tooltip_chart_coal(d, container_id){
      return tooltip_chart(d,value_coal_resources_years,'Coal reserves','',container_id);
    }


    function tooltip_chart(d, data_years, title, unit, container_id){
      var data_dict = data_years[d.properties.NAME_1]
      var keys=Object.keys(data_dict).filter(function(item) { return item !== "Province"});
      var data = keys.map(function(v) { return [parseInt(v),parseFloat(data_dict[v])]; });

      Highcharts.chart(container_id, {
        credits: {
          enabled: false
        },
        chart: {
          width:200,
          height:160,
          style: {
            fontFamily: 'Arial Narrow'
          },
          alignTicks: false,
          spacingTop: 5,
          spacingRight: 5,
          spacingBottom: 5,
          spacingLeft: 5,
          backgroundColor:"transparent"

        },
        title: {
          text: title,
          align: 'left',
          style: {
            color: 'black',
            fontSize: '14px',
            fontWeight: 'bold'
          }
        },
        xAxis: {
          className: 'x-axis',
          tickInterval: 2,
          labels: {
            style: {
              color: 'black',
              fontSize:'10px'
            }
          },
          //lineColor: 'black',
          tickLength: 0
          //		categories: ['2000', '2005', '2010', '2015', '2020', '2025', '2030']
        },
        yAxis: [{
          className: 'y-axis',
          labels: {
            formatter: function() {
              return this.value;
            },
            style: {
              color: 'black',
              fontSize:'10px'
            }
          },
          gridLineColor: '#F3F3F3',
          // tickInterval: 10000,
          min: 0,
          // max: 70000,
          title: {
            text: ''
          }
        }],
        tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x}: {point.y:.1f}',
          borderColor: 'black'
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 2006
          },
          spline: {
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          },
          line: {
            animation: false,
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          //type: 'spline',
          name: 'Irrigation efficiency',
          data: data,
          //
          // [[	2000,7185	],
          // [	2001,7185	],
          // [	2002,6975	],
          // [	2003,6450	],
          // [	2004,6750	],
          // [	2005,6720	],
          // [	2006,6735	],
          // [	2007,6510	],
          // [	2008,6525	],
          // [	2009,6465	],
          // [	2010,6315	],
          // [	2011,6225	],
          // [	2012,6060	],
          // [	2013,6270	],
          // [	2014,6030	],
          // [	2015,5910	],
          // [	2016,5700	]],
          color: '#094677'
        }]
      });

    }
  }
}

jQuery( document ).ready(function() {
  ns_coal_sown.init();
});
