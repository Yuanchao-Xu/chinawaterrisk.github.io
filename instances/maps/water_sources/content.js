var ns_watersources_map = {

  init: function(){

    var map_id='water_sources_map'
    var pi = Math.PI,
          tau = 2 * pi;

      var width = 960;
          height = 700;

      // Initialize the projection to fit the world in a 1×1 square centered at the origin.
      var projection = d3.geoMercator()
          .scale(1 / tau)
          .translate([0, 0]);

      var path = d3.geoPath()
          .projection(projection);

      var tile = d3.tile()
          .size([width, height]);

      var zoom = d3.zoom()
          .scaleExtent([1 << 12, 1 << 12])
          .on("zoom", zoomed);

      //var svg = d3.select("svg")
      var svg = d3.select("#"+map_id)
          .append('svg')
          .attr("preserveAspectRatio", "xMinYMin meet")
          .attr("viewBox", "0 0 960 700")
          .classed("svg-content", true);

      var raster = svg.append("g");
      var vector = svg.append("g");

      // Compute the projected initial center.
      var center = projection([110, 39.5]);


      var basins_url = 'https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/rivers/9basins.geojson'
      var countries_json_url = "https://unpkg.com/world-atlas@1/world/50m.json"

      d3.json(countries_json_url,function(error,countries_data) {
        d3.json(basins_url,function(error,basins) {


       // vector.append("path")
       //   .datum(topojson.feature(countries_data,countries_data.objects.countries))
       //   .attr("stroke","grey")
       //   .attr("stroke-width",2)
       //   .attr("fill","none")
       //   .attr("d",path);

       vector.selectAll(".basin-g")
         .data(basins.features)
         .enter()
         .append("path")
         .attr("class", "basin-g")
         .attr("stroke","red")
         .attr("stroke-width",2)
         .attr("fill","none")
         .attr("d",path);
       //
       // vector.append("path").enter()
       // .data(basins.features)
       // .attr('id', 'basin_border')
       // .attr('d', path)
       // .style('fill', 'transparent')
       // .style('stroke', 'red')
       // .style('stroke-width', 1);



      // Apply a zoom transform equivalent to projection.{scale,translate,center}.
      svg
          .call(zoom)
          .call(zoom.transform, d3.zoomIdentity
              .translate(width / 2, height / 2)
              .scale(1 << 12)
              .translate(-center[0], -center[1]));

      })
    });





      function zoomed() {
          var transform = d3.event.transform;

          var tiles = tile
              .scale(transform.k)
              .translate([transform.x, transform.y])
              ();

          projection
              .scale(transform.k / tau)
              .translate([transform.x, transform.y]);

          var image = raster
              .attr("transform", stringify(tiles.scale, tiles.translate))
              .selectAll("image")
              .data(tiles, function(d) {
                  return d;
              });

          image.exit().remove();
          // enter:
          var entered = image.enter().append("image");
          // update:
          image = entered.merge(image)
              .attr('xlink:href', function(d) {
                  // return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/' + d.z + '/' + d.y + '/' + d.x + '.png';
                  return 'https://api.mapbox.com/styles/v1/chinawaterrisk/cjkauhqyv2fut2ro2lkp822x8/tiles/256/'+ d.z +'/'+ d.x +'/'+ d.y+'?access_token=pk.eyJ1IjoiY2hpbmF3YXRlcnJpc2siLCJhIjoiY2prYXVienJqMmR6bjNrbWU2bnFwd3Q2bCJ9.oNhqTOCTIyovQdJgCb91Eg'

              })
              .attr('x', function(d) {
                  return d.x * 256;
              })
              .attr('y', function(d) {
                  return d.y * 256;
              })
              .attr("width", 256)
              .attr("height", 256);

        vector.selectAll("path")
          .attr("transform", "translate(" + [transform.x, transform.y] + ")scale(" + transform.k + ")")
          .style("stroke-width", 1 / transform.k);
      }

      function stringify(scale, translate) {
          var k = scale / 256,
              r = scale % 1 ? Number : Math.round;
          return "translate(" + r(translate[0] * scale) + "," + r(translate[1] * scale) + ") scale(" + k + ")";
      }
}
}
ns_watersources_map.init();
