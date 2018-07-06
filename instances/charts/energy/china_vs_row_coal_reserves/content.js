jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'china_vs_row_coal_reserves_container',
    type: 'pie',
    style: {
      fontFamily: 'Arial Narrow'
    },
    height:'95%'
  },
  title: {
    text:'',
    //text: 'China vs RoW'
  },
  plotOptions: {
    pie: {
      shadow: false,
      colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
      dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
          distance: 10,
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
      ["United States",250916],
      ["Russia",160364],
      ["Australia",144818],
      ["China",138819],
      ["India",97728],
      ["Others",1139331]],
      size: '60%',
      innerSize: '50%',
      showInLegend:true,
      dataLabels: {
        enabled: true
      }
    }]
  });
  });
