jQuery( document ).ready(function() {

  // Create the chart
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'agriculture_top5_countries_fertilizer_use',
      type: 'column',
      style: {
        fontFamily: 'Arial Narrow'
      },
      backgroundColor:"transparent",
      spacingTop: 30
    },
    title: {
      text:'',
      //text: 'Top-5 Sown Land',
      margin: 0
    },
    plotOptions: {
      column: {
        shadow: false,
        //colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
        dataLabels: {
          enabled: true,
          //format: '<center><b>{point.name}</b><br /><center>{point.y}</center></center>',
          format: '{point.y:,.0f}',
          //distance: 5,
          //color: 'white',
          //connectorWidth:0,
          align: 'center',
          //verticalAlign: 'top',
          style: {
            //color:'white',
            fontSize: '12px',
            fontWeight:300,
            textOutline: false,
          }
        }
      }
    },
    yAxis: [{
      lineWidth: 1,
      tickWidth: 1,
      title: {
        align: 'high',
        offset: 0,
        useHtml: true,
        text: "Fertilizer Use Per Area (kg/ha)",
        rotation: 0,
        y: -10
      },
      endOnTick: false,
      //max: 1000,
      lineWidth: 1,
      labels:{
        enabled: true
      },
      tickAmount: 5,
      gridLineWidth: 0,
    },{
      lineWidth: 1,
      tickWidth: 1,
      title: {
        align: 'high',
        offset: 0,
        useHtml: true,
        text: "Total Fertilizer Use (tonne)",
        rotation: 0,
        y: -10,
      },
      opposite: true,
      endOnTick: false,
      //max: 1000,
      lineWidth: 1,
      labels:{
        enabled: true
      },
      tickAmount: 5,
      gridLineWidth: 0,

    }],
    xAxis: {
      lineWidth: 0,
      labels:{
        enabled: true
      },
      categories : ["China","India","United States","Pakistan","Russia"],
      // tickAmount: 0,
      tickWidth:0,
      // gridLineWidth: 0
    },
    legend: {
      enabled: true
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    tooltip: {
      enabled: false
      // formatter: function() {
      //   return '<b>'+ this.point.name +'</b>: '+ this.y +' bn tonnes';
      // }
    },
    series: [{
      name: 'Fertilizer Use Per Area (kg/ha)',
      data: [446.12,157.86,133.7,133.72,16.25],
      showInLegend:true,
      dataLabels: {
        enabled: false,
      }
    },{
      name: 'Total Fertilizer Use (mn tonnes)',
      data: [60.226999,26.752600,20.864116,4.179136,2.026990],
      yAxis: 1,
      dataLabels:{
        enabled: false,
        format: '{y} mn'
      }
    }
  ],

})
});
