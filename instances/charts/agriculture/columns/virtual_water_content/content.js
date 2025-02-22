jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'agriculture_virtual_water_content',
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
  yAxis: {
    lineWidth: 1,
        tickWidth: 1,
        title: {
            align: 'high',
            offset: 0,
            useHtml: true,
            text: "m<sup>3</sup>/tonne",
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
  },
  xAxis: {
    lineWidth: 0,
    labels:{
      enabled: true
    },
    categories : ["Beef","Sheep","Pork","Chicken","Rice","Soya","Wheat","Milk","Maize"],
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

      {name:"Beef",y:15500, color: "#141C28"},
      {name:"Sheep",y:6100, color: "#141C28"},
      {name:"Pork",y:4850, color: "#141C28"},
      {name:"Chicken",y:3900, color: "#141C28"},
      {name:"Rice",y:2300, color: "#6B8033"},
      {name:"Soya",y:1800, color: "#6B8033"},
      {name:"Wheat",y:1300, color: "#6B8033"},
      {name:"Milk",y:1000, color: "#0CAFB7"},
      {name:"Maize",y:900, color: "#6B8033"},

    ],
      // ["Population",38],
      // ["GDP",43]],
      showInLegend:true,
      dataLabels: {
        enabled: true,

      }
    }]
  });
  });
