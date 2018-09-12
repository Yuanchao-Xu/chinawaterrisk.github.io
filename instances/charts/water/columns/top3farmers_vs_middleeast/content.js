jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'top4_farmers_vs_middle_east_container',
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
            text: "m<sup>3</sup>/pax/year",
            rotation: 0,
            y: -10
        },

        endOnTick: false,
                max: 1000,
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

      {name:"Iraq",y:966.4, color: "#DAB83C"},
      {name:"Jiangsu",y:929, color: "#020303"},
      {name:"Syria",y:385.5, color: "#DAB83C"},
      {name:"Henan",y:355, color: "#020303"},
      {name:"Oman",y:311.7, color: "#DAB83C"},
      {name:"Shandong",y:223, color: "#020303"},
      {name:"Israel",y:93.01, color: "#DAB83C"},
      {name:"Jordan",y:89.8, color: "#DAB83C"},





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
