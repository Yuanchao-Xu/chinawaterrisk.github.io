
jQuery( document ).ready(function() {
// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'dry11_coal_reserves_container',
    type: 'pie',
    style: {
      fontFamily: 'Arial Narrow'
       },
    height:'95%',
    backgroundColor:"transparent"
  },
  title: {
    text:'',
    //text: 'Exposure'
  },
  plotOptions: {
    pie: {
      shadow: false,
      colors: ["#7C8388","#094677","#0D77B9"],
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
    name: 'Coal reserves2',
    data: [
      {name:"<500",y:116.379, color:"#9F171E"},
      {name:"500-1000",y:6.444, color:"#7C8388"},
      {name:"1000",y:78.674, color:"#094677"},
      {name:">2000",y:47.73, color:"#0D77B9"}],
    size: '60%',
    innerSize: '50%',
    dataLabels: {
      enabled:false
      }
    },{
    name: 'Coal reserves',
    data: [
      ["Dry 11",122.823],
      ["At Risk 7",78.674],
      ["Safe 13",47.73]],
      size: '68%',
      innerSize: '65%',
      showInLegend:true,
      dataLabels: {
        enabled: true
      }
    }],
  });
});
