jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'top5_sown_land_container',
    type: 'pie',
    style: {
           fontFamily: 'Arial Narrow'
       },
    height:'95%'
  },
  title: {
    text: 'Top-5 Sown Land',
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
    name: 'Sown land',
    data: [
      ["Henan",14472.32],
      ["Heilongjiang",12426.54],
      ["Shandong",10973.18],
      ["Sichuan",9728.61],
      ["Anhui",8893.61],
      ["Others",110155.29]],
      size: '50%',
      innerSize: '50%',
      showInLegend:true,
      dataLabels: {
        enabled: true
      }
    }]
  });
  });
