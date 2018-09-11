jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'gw_sw_dry11',
    type: 'column',
    style: {
           fontFamily: 'Arial Narrow'
       },
    backgroundColor:"transparent",
    //spacingTop: 30
  },
  title: {
    text:'',
    //text: 'Top-5 Sown Land',
    margin: 0
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      shadow: false,
      //colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
      dataLabels: {
          enabled: true,
          //format: '<center><b>{point.name}</b><br /><center>{point.y}</center></center>',
          format: '{point.percentage:.0f}%',
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
  yAxis: {
    lineWidth: 0,
        tickWidth: 0,
        title: {
          enabled: false,
            align: 'high',
            offset: 0,
            useHtml: true,
            text: "%",
            rotation: 0,
            y: -10
        },

        endOnTick: false,
                //max: 1000,
    lineWidth: 0,
    labels:{
      enabled: false
    },
    tickAmount: 0,
    gridLineWidth: 0,
  },
  xAxis: {
    lineWidth: 0,
    labels:{
      enabled: true
    },
    categories : ["Dry 11","At Risk 9","Safe 11","National"],
    // tickAmount: 0,
    tickWidth:0,
    // gridLineWidth: 0
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
  tooltip: {
    enabled: false
    // formatter: function() {
    //   return '<b>'+ this.point.name +'</b>: '+ this.y +' bn tonnes';
    // }
  },

  series: [{
    name: 'Surface water',
    data: [0.72,0.81,0.92,0.82],
    color: "#149E9A"
  },{
    name: 'Groundwater',
    data: [0.28,0.19,0.08,0.18],
    color: "#200D0F"}
  // },{
  //   type: 'line',
  //   name: 'National',
  //   data: [0.18, 0.18, 0.18,0.18]
  // }
],

  });
  });
