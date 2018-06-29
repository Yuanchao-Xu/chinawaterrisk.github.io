
//var ValueByProvince = d3.map();

var formatTotal = d3.format(',.0f');

//the size of the graph
var width = 960,
height = 700;

//projection
var projection = d3.geoMercator()
.center([107, 31])
.scale(850)
.translate([width/2+30, height/2+110]);

var path = d3.geoPath()
.projection(projection);

var svg = d3.select('#map')
.append('svg')
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 960 700")
.classed("svg-content", true);

//specify values for legend
var maxValue = 100000;
var minValue = 0;

//specify color for legend
var colorBubble = d3.scaleLinear()
.domain([minValue, maxValue])
.range(["#CFD8DC"])
.interpolate(d3.interpolateHcl);

// var colorWri = d3.scaleLinear()
// 				.domain([0.00000, 1.24386, 2.92478, 3.14784, 4.63197, 5.00000])
// 				.range(["#ffffa3", "#ffe600", "#ff9900", "#ff1900", "#bb0007", "#505050"])
// 				.interpolate(d3.interpolateHcl);

colorWri = function(firstLetter){

	dict = {'1':"#ffffa3",
	'2':"#ffe600",
	'3':"#ff9900",
	'4':"#ff1900",
	'5':"#bb0007",
	'A':"#505050"}

	return dict[firstLetter];

}
var radius = d3.scaleSqrt()
.domain([minValue, maxValue])
.range([5, 50]);

var wri_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/wri/wri_china_simplified_sd.geojson'
var provinces_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/province/simplified_smoothed_cleaned_provinces_sd.geojson'
var provinces_centroids_json_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/json/china/province/provinces_centroids.geojson'
var coal_resources_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/coal_resources.csv'
var water_resources_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/water_resources.csv'

d3.json(wri_json_url, function(error, wri){
	d3.json(provinces_json_url, function(error, provinces){
		d3.json(provinces_centroids_json_url, function(error, centroids){
			d3.csv(coal_resources_csv_url, function(error, data_coal_resources){
				d3.csv(water_resources_csv_url, function(error, data_water_resources){

					var value_coal_resources = {};

					data_coal_resources.forEach(function(d){
						value_coal_resources[d.Province] = parseFloat(d[2016]);
					});

					var value_water_resources = {};
					var color_water_resources = {}

					//load data
					data_water_resources.forEach(function(d){
						value_water_resources[d.Province] = d.Cumulative; //TODO
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
					.attr('class','province-fill-g')
					.attr('d', path)
					.style('fill', function(d){
						return color_water_resources[d.properties.NAME_1]})
						.style('stroke', 'transparent');


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


						svg.selectAll('#bubble')
						.data(centroids.features)
						.enter()
						.append('circle')
						.attr('id', 'bubble')
						.attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
						.attr('r', function(d){
							return radius(value_coal_resources[d.properties.NAME_1]);
						})
						.style('fill', function(d) {
							return colorBubble(value_coal_resources[d.properties.NAME_1]);
						});

						svg.selectAll('#bubble-text')
						.data(centroids.features)
						.enter()
						.append('text')
						.attr('id', 'bubble-text')
						.attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
						.text(function(d) { return d.properties.NAME_1; });




						var legend_bubbled = svg.append("g")
						.attr("class", "legend legend-bubbled");

						legend_bubbled.append("text")
						.attr("class", "legend-header")
						.attr("x", width - 95)
						.attr("y", height - 297)
						.text("Crop Failure");

						legend_bubbled.append("text")
						.attr("class", "legend-header")
						.attr("x", width - 87)
						.attr("y", height - 284)
						.text("(1,000 ha)");

						legend_bubbled.selectAll(".legend-bubble")
						.data([minValue, (maxValue + minValue) / 3, maxValue])
						.enter()
						.append("circle")
						.attr("class", "legend-bubble")
						.attr("cx", width - 60)
						.attr("cy", function(d) { return height - radius(d) - 162; })
						.attr("r", function(d) { return radius(d); });

						legend_bubbled.selectAll(".legend-label")
						.data([minValue, (maxValue + minValue) / 3, maxValue])
						.enter()
						.append("text")
						.attr("class", "legend-label")
						.attr("x", width - 65)
						.attr("y", function(d) { return (height - 2 * radius(d) - 162) - 1; })
						.text(d3.format(".1s"));

						var legend_wri = svg.append("g")
						.attr("class", "legend legend-squared wri-g");

						legend_wri.append("text")
						.attr("class", "legend-header")
						.attr("x", width - 80)
						.attr("y", height - 125)
						.text("Water Stress");


						legend_wri.selectAll(".legend-square")
						.data(['1','2','3','4','5','A'])
						.enter()
						.append("rect")
						.attr("class", "legend-square")
						.attr("x", width - 80)
						.attr("y", function(d, i) { return height - i * 15 - 45; })
						.attr("width", 15)
						.attr("height", 15)
						.style("fill", function(d) { return colorWri(d); });

						legend_wri.selectAll(".legend-label")
						.data(['Low', 'Arid'])
						.enter()
						.append("text")
						.attr("class", "legend-label")
						.attr("x", width - 60)
						.attr("y", function(d, i) { return height - i * (15 * 5) - 45 + 12; })
						.text(function(d) { return d; });


						// Baseline selector
						setView = function(view) {
							var wri = svg.selectAll(".wri-g");
							var provinces = svg.selectAll(".province-fill-g");

							if (view === "wri") {
								wri.style("display", "inherit");
								provinces.style("display", "none");
							} else if (view === "province-water") {
								wri.style("display", "none");
								provinces.style("display", "inherit");
							}
						}


						//Set button toggle for view state
						d3.selectAll("input[name='basemap']")
						.on("click", function() {
							view = d3.select(this).attr("val");
							setView(view);
						});

						setView("wri")

					});
				});
			});
		});
	});
