
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
.range(["#69F052"])
.interpolate(d3.interpolateHcl);

var colorBubbleSown = d3.scaleLinear()
.domain([minValueSown, maxValueSown])
.range(["#69F052"])
.interpolate(d3.interpolateHcl);


colorWri = function(firstLetter){
	dict = {'1':"#ffffa3",
	'2':"#ffe600",
	'3':"#ff9900",
	'4':"#ff1900",
	'5':"#bb0007",
	'A':"#505050"}
	return dict[firstLetter];
}

colorTws = d3.scaleLinear()
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
var sown_area_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/agriculture/sown_area_2016.csv'
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
							var value_coal_resources = {};
							data_coal_resources.forEach(function(d){
								value_coal_resources[d.Province] = parseFloat(d[2016]);
								value_coal_resources[d.Region] = parseFloat(d[2016]); // waiting for github to refresh. Delete once done
							});

							var value_sown_area = {};
							data_sown_area.forEach(function(d){
								value_sown_area[d.Province] = parseFloat(d['Total Sown Areas of Farm Crops(1000 hectares)']);
							});

							var value_water_resources = {};
							var color_water_resources = {}
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
								return color_water_resources[d.properties.NAME_1]
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
							.style('fill-opacity',0.7)
							.style('stroke','black');

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
							.style('stroke','#69F052');


							svg.selectAll('#bubble-text')
							.style("text-anchor", "middle")
							.data(centroids.features)
							.enter()
							.append('text')
							.attr('id', 'bubble-text')
							.attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
							.style('fill','#FFFFFF')
							.text(function(d) { return d.properties.NAME_1; });


							var legend_bubbled = svg.append("g")
							.attr("class", "legend legend-bubbled");

							legend_bubbled.append("text")
							.attr("class", "legend-header")
							.attr("x", width - 95)
							.attr("y", height - 297)
							.text("Coal reserves");

							legend_bubbled.append("text")
							.attr("class", "legend-header")
							.attr("x", width - 87)
							.attr("y", height - 284)
							.text("(mn tonnes)");

							legend_bubbled.selectAll(".legend-bubble")
							.data([minValueCoal, (maxValueCoal + minValueCoal) / 3, maxValueCoal])
							.enter()
							.append("circle")
							.attr("class", "legend-bubble")
							.attr("cx", width - 60)
							.attr("cy", function(d) { return height - radiusCoal(d) - 162; })
							.attr("r", function(d) { return radiusCoal(d); });

							legend_bubbled.selectAll(".legend-label")
							.data([minValueCoal, (maxValueCoal + minValueCoal) / 3, maxValueCoal])
							.enter()
							.append("text")
							.attr("class", "legend-label")
							.attr("x", width - 65)
							.attr("y", function(d) { return (height - 2 * radiusCoal(d) - 162) - 1; })
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




							// Selectors
							setBasemap = function(view) {
								var wri = svg.selectAll(".wri-g");
								var provinces = svg.selectAll(".province-fill-g");
								var tws = svg.selectAll(".tws-g");

								if (view === "wri") {
									wri.style("display", "inherit");
									provinces.style("display", "none");
									tws.style("display", "none");
								} else if (view === "province-water") {
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
								var coal = svg.selectAll(".coal-g");
								var sown = svg.selectAll(".sown-g");

								if (view === "coal") {
									coal.style("display", "inherit");
									sown.style("display", "none");
								} else if (view === "sown") {
									coal.style("display", "none");
									sown.style("display", "inherit");
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
