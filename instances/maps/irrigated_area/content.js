var ns_irrigatedarea = {

  init: function(){

    var ValueByProvince = d3.map();

    var formatTotal = d3.format(',.0f');

    var width = 960,
    height = 700;

    var projection = d3.geoMercator()
    .center([107, 31])
    .scale(850)
    .translate([width/2+30, height/2+110]);


    var path = d3.geoPath()
    .projection(projection);

    var svg = d3.select('#map_irrigatedarea')
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 700")
    .classed("svg-content", true);

    var maxValue = 500;
    var minValue = 0.1;

    var color = d3.scaleLinear()
    .domain([minValue, maxValue])
    .range(["#0D77B9", "#091825"])
    .interpolate(d3.interpolateHcl);

    d3.json('https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/cities/cities.geojson', function(error, cities){
      d3.json('https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/province/simplified_smoothed_cleaned_provinces.json', function(error, provinces){
        d3.csv('https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/instances/maps/irrigated_area/irrigation_area.csv', function(error, data){

          var value = {};

          data.forEach(function(d){
            value[d.City_Eng_Trim] = +d["irrigated_area_rel"];
            ValueByProvince.set(d.City_Eng_Trim, d);
          });

          svg.selectAll('#city')
          .data(cities.features)
          .enter()
          .append('path')
          .attr('id', 'city')
          .attr('d', path)
          .style('fill', function(d){
            if(value[d.properties.NAME_2]){
              return color(value[d.properties.NAME_2]);
            }else{
              return '#eee';
            }
          })
          .style('stroke', 'white')
          .style('stroke-width', 0);

          svg.selectAll('#province')
          .data(provinces.features)
          .enter()
          .append('path')
          .attr('id', 'province')
          .attr('d', path)
          .style('fill', 'transparent')
          .style('stroke', 'white')
          .style('stroke-width', 0.5);

          var legend = svg.append("g")
          .attr("class", "legend");
          legend.append("text")
          .attr("class", "legend-header")
          .attr("x", width - 80)
          .attr("y", height - 240)
          .text("");
          legend.append("text")
          .attr("class", "legend-header")
          .attr("x", width - 80)
          .attr("y", height - 225)
          .text("Irrigated Area");
          legend.append("text")
          .attr("class", "legend-header")
          .attr("x", width - 80)
          .attr("y", height - 210)
          .text("(1,000 ha)");

          legend.selectAll(".legend-square")
          .data([minValue, (maxValue - minValue) / 4, (maxValue - minValue) / 3, (maxValue - minValue) / 2, maxValue])
          .enter()
          .append("rect")
          .attr("x", width - 80)
          .attr("y", function(d, i) { return height - i * 15 - 145; })
          .attr("class", "legend-square")
          .attr("width", 15)
          .attr("height", 15)
          .style("fill", function(d) { return color(d); })
          legend.selectAll(".tick-label")
          .data([minValue, maxValue])
          .enter()
          .append("text")
          .attr("class", "tick-label")
          .attr("x", width - 60)
          .attr("y", function(d, i) { return height - i * (15 * 4) - 145 + 15; })
          .text(function(d) { return formatTotal(d); });

        });
      });
    });
  }
}

ns_irrigatedarea.init();
