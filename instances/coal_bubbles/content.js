
		var ValueByProvince = d3.map();

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
		var maxValue = 3100;
		var minValue = 1;

		//specify color for legend
		var colorBubble = d3.scaleLinear()
						.domain([minValue, maxValue])
						.range(["#CFD8DC"])
						.interpolate(d3.interpolateHcl);

		var colorWri = d3.scaleLinear()
						.domain([0.00000, 1.24386, 2.92478, 3.14784, 4.63197, 5.00000])
						.range(["#ffffa3", "#ffe600", "#ff9900", "#ff1900", "#bb0007", "#505050"])
						.interpolate(d3.interpolateHcl);

		var radius = d3.scaleSqrt()
						.domain([minValue, maxValue])
						.range([5, 50]);

		d3.json('simplified_smoothed_cleaned_wri.json', function(error, wri){
		d3.json('simplified_smoothed_cleaned_provinces.json', function(error, provinces){
			d3.csv('droughts_crop_failure.csv', function(error, data){

				var value = {};

				data.forEach(function(d){
					value[d.Province] = +d.Cumulative;
					ValueByProvince.set(d.Province, d);
				});

				svg.selectAll('#wri')
					.data(wri.features)
					.enter()
					.append('path')
					.attr('id', 'wri')
					.attr('d', path)
					.style('fill', function(d){
												return colorWri(d.properties.BWS_s);
										});

				svg.selectAll('#province')
					.data(provinces.features)
					.enter()
					.append('path')
					.attr('id', 'province')
					.attr('d', path)
					.style('fill', 'transparent')
					.style('stroke', '#CFD8DC')
					.style('stroke-width', 1);

				svg.selectAll('#bubble')
					.data(provinces.features)
					.enter()
					.append('circle')
					.attr('id', 'bubble')
					.attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
					.attr('r', function(d){
										return radius(value[d.properties.NAME_1]);
										})
					.style('fill', function(d) {
										return colorBubble(value[d.properties.NAME_1]);
										});

				svg.selectAll('#bubble-text')
					.data(provinces.features)
					.enter()
					.append('text')
					.attr('id', 'bubble-text')
					.attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
					.text(function(d) { return d.properties.NAME_1; });

				var legend2 = svg.append("g")
									.attr("class", "legend2");

					legend2.append("text")
							.attr("class", "legend2-header")
							.attr("x", width - 95)
							.attr("y", height - 287)
							.text("Crop Failure");

					legend2.append("text")
							.attr("class", "legend2-header")
							.attr("x", width - 87)
							.attr("y", height - 274)
							.text("(1,000 ha)");

					legend2.selectAll(".legend2-bubble")
								.data([minValue, (maxValue + minValue) / 3, maxValue])
								.enter()
								.append("circle")
								.attr("class", "legend2-bubble")
								.attr("cx", width - 60)
								.attr("cy", function(d) { return height - radius(d) - 162; })
								.attr("r", function(d) { return radius(d); });

					legend2.selectAll(".legend2-label")
								.data([minValue, (maxValue + minValue) / 3, maxValue])
								.enter()
								.append("text")
								.attr("class", "legend2-label")
								.attr("x", width - 65)
								.attr("y", function(d) { return (height - 2 * radius(d) - 162) - 1; })
								.text(d3.format(".1s"));

				var legend3 = svg.append("g")
									.attr("class", "legend3")

					legend3.append("text")
							.attr("class", "legend3-header")
							.attr("x", width - 80)
							.attr("y", height - 125)
							.text("Water Stress");


					legend3.selectAll(".legend3-square")
								.data([0.00000, 1.24386, 2.92478, 3.14784, 4.63197, 5.00000])
								.enter()
								.append("rect")
								.attr("class", "legend3-square")
								.attr("x", width - 80)
								.attr("y", function(d, i) { return height - i * 15 - 45; })
								.attr("width", 15)
								.attr("height", 15)
								.style("fill", function(d) { return colorWri(d); });

					legend3.selectAll(".legend3-label")
							.data(['Low', 'Arid'])
							.enter()
							.append("text")
							.attr("class", "legend3-label")
							.attr("x", width - 60)
							.attr("y", function(d, i) { return height - i * (15 * 5) - 45 + 15; })
							.text(function(d) { return d; });


				console.log(value);
				console.log(ValueByProvince.get('Beijing'));

			});
		});
		});
