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
    text:'Annual rainfall (mm/year)',
    align:'left',
    //text: 'Top-5 Sown Land',
    margin: 0,
    style: {
      //color:'white',
      fontSize: '14px',
      fontWeight:300,
      textOutline: false,
    }
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
  yAxis: {
    enabled: false,
    lineWidth: 0,
        tickWidth: 0,
        title: {
          enabled: false,
            align: 'high',
            offset: 0,
            useHtml: true,
            text: "mm/year",
            rotation: 0,
            y: -10
        },

        endOnTick: false,
                //max: 1000,
    lineWidth: 0,
    labels:{
      enabled: false
    },
    tickAmount: 5,
    gridLineWidth: 0,
  },
  xAxis: {
    lineWidth: 0,
    labels:{
      enabled: true,
      rotation: -90
    },
     type: "category",
    //categories : ["Songhua","Liao","Hai","Yellow","Huai","Yangtze","Southeast","Pearl","Southwest","Northwest"],
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

      {name:"Northwest",y:151.41, color: "#0D77B9"},
      {name:"Iraq",y:216, color: "#141C28"},

      {name:"Yellow",y:471.5, color: "#0D77B9"},
      {name:"Hai",y:475.0, color: "#0D77B9"},
      {name:"Songhua & Liao",y:502.3, color: "#0D77B9"},
      {name:"Southwest",y:613.3, color: "#0D77B9"},

      {name:"Huai",y:832.5, color: "#0D77B9"},
      {name:"South Sudan",y:900, color: "#141C28"},
      {name:"Yangtze",y:1030.5, color: "#0D77B9"},
      {name:"Pearl",y:1501.6, color: "#0D77B9"},
      {name:"Southeast",y:1591.4, color: "#0D77B9"},

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
