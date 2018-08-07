jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'basins_water_resources',
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
          format: '<b>{point.name}</b>',
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
    lineWidth: 1,
        tickWidth: 1,
        title: {
            align: 'high',
            offset: 0,
            useHtml: true,
            text: "mm/year",
            rotation: 0,
            y: -10
        },

        endOnTick: false,
    lineWidth: 1,
    labels:{
      enabled: true
    },
    tickAmount: 5,
    gridLineWidth: 0,
  },
  xAxis: {
    lineWidth: 0,
    labels:{
      enabled: false
    },
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
    name: 'Water resources',
    data: [

      {name:"Songhua",y:423.7, color: "#0D77B9"},
      {name:"Liao",y:602.9, color: "#0D77B9"},
      {name:"Hai",y:614.2, color: "#0D77B9"},
      {name:"Yellow",y:482.4, color: "#0D77B9"},
      {name:"Huai",y:893.3, color: "#0D77B9"},
      {name:"Yangtze",y:1205.3, color: "#0D77B9"},
      {name:"Southeast",y:2249.3, color: "#0D77B9"},
      {name:"Pearl",y:1822.2, color: "#0D77B9"},
      {name:"Southwest",y:1124.8, color: "#0D77B9"},
      {name:"Northwest",y:206.3, color: "#0D77B9"},

    ],
      // ["Population",38],
      // ["GDP",43]],
      showInLegend:true,
      dataLabels: {
        enabled: true
      }
    }]
  });
  });
