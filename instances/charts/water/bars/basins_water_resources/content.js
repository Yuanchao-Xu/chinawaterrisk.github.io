jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'basins_water_resources',
    type: 'bar',
    style: {
           fontFamily: 'Arial Narrow',
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
    bar: {
      shadow: false,
      //colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
      dataLabels: {
          enabled: true,
          //format: '<center><b>{point.name}</b><br /><center>{point.y}</center></center>',
          format: '{point.y:,.0f}',
          distance: 5,
          //color: 'white',
          //connectorWidth:0,
          align: 'right',
          //verticalAlign: 'top',
          style: {
            color:'white',
            fontSize: '12px',
            fontWeight:300,
            textOutline: false,
          }
      }
    }
  },
  yAxis: {
    visible: true,
    lineWidth: 0,
        tickWidth: 0,
        title: {
            align: 'high',
            offset: 0,
            useHtml: true,
            text: "mm/year",
            rotation: 0,
            y: 0,
            x: -5
        },

        endOnTick: false,
                //max: 1000,
    labels:{
      enabled: false
    },
    tickAmount: 0,
    gridLineWidth: 0,
    max: 1591
  },
  xAxis: {
    lineWidth: 0,
    labels:{
      enabled: true,

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



      {name:"Continental",y:151.41, color: "#0D77B9"},
      {name:"Irak",y:216, color: "#141C28"},

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

    }]
  });
  });
