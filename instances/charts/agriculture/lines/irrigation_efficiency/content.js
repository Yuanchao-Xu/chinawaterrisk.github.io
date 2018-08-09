
Highcharts.chart('irrigation_efficiency_container', {
				credits: {
					enabled: false
				},
				chart: {
					style: {
						fontFamily: 'Arial Narrow'
					},
					alignTicks: false,
					spacingTop: 0,
					spacingRight: 0,
					spacingBottom: 0,
					spacingLeft: 0
				},
				title: {
					text: 'China\'s unit irrigation water use declining',
					align: 'left',
					style: {
						color: 'black',
						fontSize: '16px',
						fontWeight: 'bold'
					},
					margin: 25
				},
				xAxis: {
					className: 'x-axis',
					tickInterval: 16,
					labels: {
						style: {
							color: 'black',
							fontSize:'12px'
						}
					},
					//lineColor: 'black',
					tickLength: 0
			//		categories: ['2000', '2005', '2010', '2015', '2020', '2025', '2030']
				},
				yAxis: [{
					className: 'y-axis',
					opposite: true,
					labels: {
						formatter: function() {
						   return this.value;
						},
						align: 'left',

						style: {
							color: '#AAAAAA',
							fontSize:'12px'
						},
						enabled:true
					},
					//	offset: -50,
					gridLineColor: '#D3D3D3',
					// tickInterval: 10000,
					min: 0,
					// max: 70000,
					title: {
	            align: 'high',
	            offset: 0,
	            useHtml: true,
	            text: "Unit: m<sup>3</sup>/ha",
	            rotation: 0,
	            y: -18,
							x: -12
	        },
				}],
				tooltip: {
					headerFormat: '<b>{series.name}</b><br/>',
					pointFormat: '{point.x}: {point.y:.1f}',
					borderColor: 'black'
				},
		//		labels: {
		//			items: [{
		//				html: '2014',
		//				style: {
		//					left: '610px',
		//					top: '75px',
		//					color: 'black',
		//					fontSize: '15px',
		//					fontWeight: 'bold'
		//				}
		//			}]
		//		},
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
					name: 'Unit Irrigation Water Use',
					data: [[	2000,7185	],
          [	2001,7185	],
          [	2002,6975	],
          [	2003,6450	],
          [	2004,6750	],
          [	2005,6720	],
          [	2006,6735	],
          [	2007,6510	],
          [	2008,6525	],
          [	2009,6465	],
          [	2010,6315	],
          [	2011,6225	],
          [	2012,6060	],
          [	2013,6270	],
          [	2014,6030	],
          [	2015,5910	],
          [	2016,5700	]],
					color: '#094677'
				}]
			});
