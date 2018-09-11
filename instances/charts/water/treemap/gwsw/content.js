jQuery( document ).ready(function() {

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'grounwater_surfacewater',
    style: {
           fontFamily: 'Arial Narrow'
    },
    backgroundColor:"transparent",
    spacingTop: 0
  },
    series: [{
      type: 'treemap',
      layoutAlgorithm: 'squarified',
      data: [{
              name: 'Groundwater',
              value: 105.7,
              color: "#200D0F",
              percentage: "18%"
          }, {
              name: 'Surfacewater',
              value: 491.2,
              color: "#149E9A",
              percentage: "82%"
          }]
        }],

    // series: [{
    //     name: 'Target',
    //     type: 'polygon',
    //     name:"Groundwater",
    //     data: [[153, 42], [149, 46], [149, 55], [152, 60], [159, 70], [170, 77], [180, 70],
    //         [180, 60], [173, 52], [166, 45]]
    //       }],

  title: {
    text:'',
    //text: 'Top-5 Sown Land',
    margin: 0
  },
  plotOptions: {

    polygon: {
      shadow: false,
      dataLabels: {
          enabled: true,
          useHTML: true,
          format: '<center><b>{point.name}</b></br>{point.value} bn m<sup>3</sup></br>{point.percentage}</center>',
          //format: '{point.name}',
          //distance: 5,
          //color: 'white',
          //connectorWidth:0,
          align: 'center',
          //verticalAlign: 'top',
          style: {
            //color:'white',
            fontSize: '12px',
            //fontWeight:300,
            textOutline: false,
          }
      }
    },

    treemap: {
      shadow: false,
      dataLabels: {
          enabled: true,
          useHTML: true,
          format: '<center>{point.name} supply   {point.percentage}</center>',
          //format: '{point.name}',
          //distance: 5,
          //color: 'white',
          //connectorWidth:0,
          align: 'center',
          //verticalAlign: 'top',
          style: {
            //color:'white',
            fontSize: '20px',
            //fontWeight:300,
            textOutline: false,
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
    enabled: false
    // formatter: function() {
    //   return '<b>'+ this.point.name +'</b>: '+ this.y +' bn tonnes';
    // }
  },
  });
  });
