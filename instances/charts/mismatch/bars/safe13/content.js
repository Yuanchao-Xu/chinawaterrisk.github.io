
    jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
      marginTop: -20,
    renderTo: 'safe13_mismatch_bar_container',
    type: 'bar',
    style: {
           fontFamily: 'Arial Narrow'
       },
    height:220,
    backgroundColor:"transparent"
  },
    title: {
    text:null,
    //text: 'Top-5 Sown Land',
    //margin: 0
  },
  plotOptions: {
    bar: {
      shadow: false,
      colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
      dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br />{point.y} %',
          distance: 5,
          //color: 'white',
          connectorWidth:0,
          style: {
            //color:'white',
            fontSize: '12px',
            fontWeight:300,
            textOutline: false
          }
      }
    }
  },
  yAxis: {
    lineWidth: 0,
    labels:{
      enabled: false
    },
    tickAmount: 0,
    gridLineWidth: 0,
    tickWidth:0,
    title:null,
    max:80
  },
  xAxis: {
    lineWidth: 0,
    labels:{
      enabled: false
    },
    tickAmount: 0,
    tickWidth:0,
    gridLineWidth: 0
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
    name: 'Dry11 mismatch',
    data: [
      {name:"Water resources",y:71, color: "#0D77B9"},
      {name:"Agriculture output",y:40, color: "#6B8033"},
      {name:"Population",y:36, color: "#7C8388"},
      {name:"GRP",y:30, color: "#151515"},
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
