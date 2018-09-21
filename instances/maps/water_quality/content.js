var ns_waterquality_map = {





  colorWaterQuality : function(t){
    t2 = Math.pow(t,2);
    return d3.interpolateRdBu(t2);
  },




  init: function(){
    //var ValueByProvince = d3.map();
    var map_id='map-quality'

    var formatTotal = d3.format(',.0f');

    //the size of the graph
    var width = 960,
    height = 700;

    // legends positions
    // var leg_bubble1_top = height - 170;
    // var leg_bubble1_left = width - 115;
    // var offset_legend_bubble2 = -200;
    //
    var leg_basemap_top = height - 145;
    var leg_basemap_left = 10;
    var leg_square_size = 15


    var surfacewater_grade_I_III_2016 = {}; // share of monitoring stations in Grade I-III


    var selected_bubbles;
    var tooltip_province;

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

    var surfacewater_quality = [];
    function showTooltipWaterQuality(d) {
      river_name = d.properties.River;

      // grade_I_III = river_grade_I_III_2016[river_name];


      y=(d3.event.layerY - 90)

      var width = d3.select("#"+map_id).node().getBoundingClientRect().width;

      if(d3.event.layerX > width/2){
        x=(d3.event.layerX - 220)
      }else{
        x=(d3.event.layerX +20)
      }

      var mouse = d3.mouse(svg.node())
      .map( function(d) { return parseInt(d); } );
      tooltip.style("display", "inherit")
      .attr("class", "map-tooltip")
      .attr("style", "left:"+x+"px;top:"+y+"px");
      // .html("<b>"+river_name+"</b><br /> "+
      // +Math.round(grade_I_III*100)+" %"+
      // "<br />");

      if(d3.event.type=="mouseover"){
        //tooltip_chart_coal(d,'map_tooltip');
        chart = tooltip_river_highchart(river_name, surfacewater_quality)
      }

      //chart = tooltip_river_highchart(river_name, surfacewater_quality)
    }

    function showMapTooltip(d){
      showTooltipWaterQuality(d);
    }



    var basins_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/rivers/9basins.geojson'
    var basins_centroids_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/rivers/9basins_centroids.geojson'
    var surfacewater_quality_2016_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/water_quality/surfacewater_quality_2016.csv'

    var surfacewater_quality_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/water_quality/surfacewater_quality.csv'


    //d3.json(wri_json_url, function(error, wri){
    d3.json(basins_json_url, function(error, basins){
      d3.json(basins_centroids_json_url, function(error, centroids){
        //		d3.json(tws_url, function(error, tws){
        d3.csv(surfacewater_quality_csv_url, function(error, surfacewater_quality_tmp){

          surfacewater_quality = surfacewater_quality_tmp;
          surfacewater_grade_I_III = surfacewater_quality.filter(function(row) {
            return row['Grade'] == 'Grade I-III';
          })

          surfacewater_grade_I_III_2016 = surfacewater_quality.filter(function(row) {
            return (row['Grade'] == 'Grade I-III') && (row['Year'] == '2016');
          })

          river_grade_I_III_2016 = {}
          river_grade_I_III_2016_color = {}

          surfacewater_grade_I_III.forEach(function(d){
            river_grade_I_III_2016[d.River] = d['Value'];
          });

          svg.selectAll('#basin_border')
          .data(basins.features)
          .enter()
          .append('path')
          .attr('id', 'basin_border')
          .attr('class','basin-border-g')
          .attr('d', path)
          .style('fill', function(d){
            return ns_waterquality_map.colorWaterQuality(river_grade_I_III_2016[d.properties.River]);
          })
          .style('stroke', '#CFD8DC')
          .style('stroke-width', 1)
          .on("mouseover", showMapTooltip)
          .on("mousemove", showMapTooltip)
          .on("mouseout", function(d){
            tooltip.style("display", "none");
          });

          svg.selectAll('#basin_name')
          .style("text-anchor", "middle")
          .data(centroids.features)
          .enter()
          .append('text')
          .attr('class','basin-name-g')
          .attr("text-anchor", "middle")
          .attr('id', 'basin_name')
          .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
          .style('fill','#FFFFFF')
          .text(function(d) { return d.properties.River; })
          .on("mouseover", showMapTooltip)
          .on("mousemove", showMapTooltip)
          .on("mouseout", function(d){
            tooltip.style("display", "none");
          });;



          // .on("mousemove", showMapTooltip)
          // .on("mouseout", function(d){ tooltip.style("display", "none");});

          // var legend_wri = svg.append("g")
          // .attr("class", "legend legend-squared wri-g");
          //
          // legend_wri.append("text")
          // .attr("class", "legend-header")
          // .attr("x", leg_basemap_left)
          // .attr("y", leg_basemap_top)
          // .text("Water Stress");
          //
          // legend_wri.selectAll(".legend-square")
          // .data(['1','2','3','4','5','A'])
          // .enter()
          // .append("rect")
          // .attr("class", "legend-square")
          // .attr("x", leg_basemap_left)
          // .attr("y", function(d, i) { return leg_basemap_top + 20 + i * 15 ; })
          // .attr("width", 15)
          // .attr("height", 15)
          // .style("fill", function(d) { return colorWri(d); });
          //
          // legend_wri.selectAll(".legend-label")
          // .data(['Low', 'Arid'])
          // .enter()
          // .append("text")
          // .attr("class", "legend-label")
          // .attr("x", leg_basemap_left + 20)
          // .attr("y", function(d, i) { return leg_basemap_top + 20 + 12 + i * (15 * 5); })
          // .text(function(d) { return d; });
          //


          // var legend_tws = svg.append("g")
          // .attr("class", "legend legend-squared tws-g");
          //
          // legend_tws.append("text")
          // .attr("class", "legend-header")
          // .attr("x", leg_basemap_left)
          // .attr("y", leg_basemap_top)
          // .text("Trends in");
          //
          // legend_tws.append("text")
          // .attr("class", "legend-header")
          // .attr("x", leg_basemap_left)
          // .attr("y", leg_basemap_top)
          // .attr("dy", "1em") // you can vary how far apart it shows up
          // .text("Water Storage");
          //
          // legend_tws.append("text")
          // .attr("class", "legend-unit")
          // .attr("x", leg_basemap_left)
          // .attr("y", leg_basemap_top)
          // .attr("dy", "2em") // you can vary how far apart it shows up
          // .text("[cm/year]");
          //
          // legend_tws.selectAll(".legend-square")
          // .data(['-2','-1','0','1','2'])
          // .enter()
          // .append("rect")
          // .attr("class", "legend-square")
          // .attr("x", leg_basemap_left)
          // .attr("y", function(d, i) { return leg_basemap_top + 40 + i * 15 ; })
          // .attr("width", 15)
          // .attr("height", 15)
          // .style("fill", function(d) { return colorTws(d); });
          //
          // legend_tws.selectAll(".legend-label")
          // .data(['-2', '0', '2'])
          // .enter()
          // .append("text")
          // .attr("class", "legend-label")
          // .attr("x", leg_basemap_left + 20)
          // .attr("y", function(d, i) { return leg_basemap_top + 40 + 12 + i * (15 *2); })
          // .text(function(d) { return d; });

          // Selectors
          setBasemap = function(view) {
            var basins = svg.selectAll(".avail-g");

            // if (view === "wri") {
            // 	wri.style("display", "inherit");
            // 	provinces.style("display", "none");
            // 	tws.style("display", "none");
            // } else if (view === "avail") {
            // 	wri.style("display", "none");
            // 	tws.style("display", "none");
            // 	provinces.style("display", "inherit");
            // } else if (view === "tws") {
            // 	wri.style("display", "none");
            // 	provinces.style("display", "none");
            // 	tws.style("display", "inherit");
            // }
          }


          //Set button toggle for view state
          // d3.selectAll("input[name='basemap']")
          // .on("click", function() {
          // 	view = d3.select(this).attr("val");
          // 	setBasemap(view);
          // });



          // setBasemap("avail")

        });
        //		});
        //	});
      });
    });



    function tooltip_river_highchart(river, surfacewater_quality){


      var river_data = surfacewater_quality.filter(function(row){
        return row['River']==river;
      })

      var river_data_I_III =   river_data.filter(function(row) {
        return row['Grade'] == 'Grade I-III';
      })

      var river_data_I_III_years_dict = {}

      river_data_I_III.forEach(function(row){
        river_data_I_III_years_dict[row['Year']] = row['Value'];
      });

      // var data_dict = data_years[d.properties.NAME_1]
      var keys=Object.keys(river_data_I_III_years_dict);
      var river_data_I_III_years_array = keys.map(function(v) { return [parseInt(v),parseFloat(river_data_I_III_years_dict[v])]; });

      Highcharts.chart('map_tooltip', {
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
          text: 'Trends in water quality: '+river.charAt(0).toUpperCase() + river.substr(1),
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
          name: 'Grade I-III',
          data: river_data_I_III_years_array,
          color: '#094677'
        }]
      });


    }

  }

}
jQuery( document ).ready(function() {
  ns_waterquality_map.init();

  // Legend
  const legend = document.getElementById('legend_prec_scale');

  n_colors=10
  colors = [...Array(n_colors).keys()].map(function(i){return ns_waterquality_map.colorWaterQuality(i/n_colors)})

  legend.style.backgroundImage = 'linear-gradient(to right,'+colors.join(",")+')';
});
