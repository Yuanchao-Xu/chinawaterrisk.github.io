
jQuery( document ).ready(function() {
// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'dry11_sown_land_container',
    type: 'pie',
    style: {
      fontFamily: 'Arial Narrow'
       },
    height:'95%'
  },
  title: {
    text: 'Exposure'
  },
  plotOptions: {
    pie: {
      borderColor: null,
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
  name: 'Sown land2',
  data: [
    {name:"<500",y:40083.42, color:"#9F171E"},
    {name:"500-1000",y:15994.86, color:"#7C8388"},
    {name:"1000-2000",y:43043.83, color:"#094677"},
    {name:">2000",y:67527.44, color:"#0D77B9"}],
  size: '60%',
  innerSize: '50%',
  dataLabels: {
    enabled:false
    }
  },{
  name: 'Sown land',
  data: [
    ["Dry 11",56078.28],
    ["At Risk 7",43043.83],
    ["Safe 13",67527.44]],
    size: '68%',
    innerSize: '65%',
    showInLegend:true,
    dataLabels: {
      enabled: true
    }
  }],
  });
});
