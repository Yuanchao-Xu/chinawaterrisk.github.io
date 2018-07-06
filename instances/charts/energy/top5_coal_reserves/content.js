jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'top5_coal_reserves_container',
    type: 'pie',
    style: {
           fontFamily: 'Arial Narrow'
       },
    height:'95%'
  },
  title: {
    text: 'Top-5 Coal Reserves',
    margin: 0
  },
  plotOptions: {
    pie: {
      shadow: false,
      colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
      dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br />{point.percentage:.1f} %',
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
    name: 'Coal reserves',
    data: [
      ["Shanxi",91.619],
      ["Inner Mongolia",51.027],
      ["Shaanxi",16.293],
      ["Xinjiang",16.231],
      ["Guizhou",11.093],
      ["Others",62.964]],
      size: '50%',
      innerSize: '50%',
      showInLegend:true,
      dataLabels: {
        enabled: true
      }
    }]
  });
  });
