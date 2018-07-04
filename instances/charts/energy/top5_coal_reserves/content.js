
// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'container',
    type: 'pie'
  },
  title: {
    text: 'Top-5 Coal Reserves'
  },
  plotOptions: {
    pie: {
      shadow: false,
      colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
      dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: 10,
          connectorWidth:0,
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
  tooltip: {
    formatter: function() {
      return '<b>'+ this.point.name +'</b>: '+ this.y +' bn tonnes';
    }
  },
  series: [{
    name: 'Browsers',
    data: [
      ["Shanxi",91.619],
      ["Inner Mongolia",51.027],
      ["Shaanxi",16.293],
      ["Xinjiang",16.231],
      ["Guizhou",11.093],
      ["Others",62.964]],
      size: '60%',
      innerSize: '50%',
      showInLegend:true,
      dataLabels: {
        enabled: true
      }
    }]
  });
