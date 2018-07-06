jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'china_vs_row_sown_land_container',
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
    name: 'Sown land',

    data: [
      ["China",527833],
      ["United States",405862.5],
      ["Australia",365913],
      ["Brazil",282589],
      ["Russia",217721.82],
      ["Others",3069070.18]],
      size: '60%',
      innerSize: '50%',
      showInLegend:true,
      dataLabels: {
        enabled: true
      }
    }]
  });
  });
