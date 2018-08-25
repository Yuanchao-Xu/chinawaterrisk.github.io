jQuery( document ).ready(function() {

  function shadeHexColor(color, percent) {
      var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  }

  colors = ["#9F171E","#390B61","#0D77B9","#AB80DB","#AAAAAA"]
  // Create the chart
  chart = new Highcharts.Chart({
    chart: {
      renderTo: 'agriculture_top5_countries_fertiliser_use',
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
      tickLength: 5,
      title: {
        align: 'high',
        offset: 10,
        useHtml: true,
        text: "Fertiliser Use<br>Per Area (kg/ha)",
        rotation: 0,
        y: -10,
        x:10
      },
      endOnTick: false,
      //max: 1000,
      labels:{
        enabled: true
      },
      //tickAmount: 5,
      gridLineWidth: 0,
    },{
      lineWidth: 1,
      tickWidth: 1,
      tickLength: 5,
      title: {
        align: 'high',
        offset: 10,
        useHtml: true,
        text: "Total Fertiliser<br>Use (tonne)",
        rotation: 0,
        y: -10,
        x: -10
      },
      opposite: true,
      endOnTick: false,
      //max: 1000,
      lineWidth: 1,
      labels:{
        enabled: true
      },
      //tickAmount: 5,
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
      enabled: true,
      formatter: function() {
         return '<b>'+ this.series.name +'</b>: '+ this.y;
      },
      valueDecimals:2
    },
    series: [{
      color: colors[0],
      name: 'Fertiliser Use Per Area (kg/ha)',
      data: [{
        y: 446.12,
        color: colors[0]
      },{
        y:157.86,
        color: colors[1]
      },{
        y:133.7,
        color: colors[2]
      },{
        y:133.72,
        color: colors[3]
      },{
        y:16.25,
        color: colors[4]
      }],

        showInLegend:true,
        dataLabels: {
          enabled: false,
        }
      },{
        color: shadeHexColor(colors[0],0.4),
        name: 'Total Fertiliser Use (mn tonnes)',
        data: [{
          y: 60.23,
          color: shadeHexColor(colors[0],0.4)
        },{
          y:26.75,
          color: shadeHexColor(colors[1],0.4)
        },{
          y:20.86,
          color: shadeHexColor(colors[2],0.4)
        },{
          y:4.18,
          color: shadeHexColor(colors[3],0.4)
        },{
          y:2.03,
          color: shadeHexColor(colors[4],0.4)
        }],

        yAxis: 1,
        dataLabels:{
          enabled: false,
          format: '{y} mn'
        }
      }
    ],

  })
});
