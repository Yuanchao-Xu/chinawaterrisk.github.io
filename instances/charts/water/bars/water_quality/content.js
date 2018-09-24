jQuery( document ).ready(function() {


  rivers = ['Yellow','Yangtze','Pearl','Songhua','Huai','Hai','Liao','Northwest','Southwest','Southeast','National']

// Get water quality data
var surfacewater_quality_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/water_quality/surfacewater_quality.csv'

var surfacewater_grade_I_III_2016 = {};
var surfacewater_grade_IV_V_2016 = {};
var surfacewater_grade_VI_2016 = {};


d3.csv(surfacewater_quality_csv_url, function(error, surfacewater_quality){

      surfacewater_quality.forEach(function(row){
        if(rivers.includes(row['River'])){
            if(row['Grade'] == 'Grade I-III'){
              surfacewater_grade_I_III_2016[row['River']] = parseFloat(row['Value']);
            }else if(row['Grade'] == 'Grade IV-V'){
              surfacewater_grade_IV_V_2016[row['River']] = parseFloat(row['Value']);
            }else if(row['Grade'] == 'Grade V+'){
              surfacewater_grade_VI_2016[row['River']] = parseFloat(row['Value']);
            }
        }
      })


// from dict to highcharts data
grade_I_III_data = rivers.map(function(river){return surfacewater_grade_I_III_2016[river]})

grade_IV_V_data = rivers.map(function(river){return surfacewater_grade_IV_V_2016[river]})

grade_VI_data = rivers.map(function(river){return surfacewater_grade_VI_2016[river]})


// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'basins_water_quality',
    type: 'bar',
    style: {
           fontFamily: 'Arial Narrow',
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
    series: {
           stacking: 'normal'
       },
    // bar: {
    //   stacking: 'normal',
    //   shadow: false,
    //   //colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
    //   dataLabels: {
    //       enabled: true,
    //       //format: '<center><b>{point.name}</b><br /><center>{point.y}</center></center>',
    //       format: '{point.y:,.0f}',
    //       //distance: 5,
    //       //color: 'white',
    //       //connectorWidth:0,
    //       align: 'right',
    //       //verticalAlign: 'top',
    //       style: {
    //         color:'white',
    //         fontSize: '12px',
    //         fontWeight:300,
    //         textOutline: false,
    //       }
    //   }
    // }
  },

  yAxis: {
    visible: true,
    lineWidth: 0,
        tickWidth: 0,
        title: {
          enabled: false,
            align: 'high',
            offset: 0,
            useHtml: true,
            //text: "mm/year",
            rotation: 0,
            y: 0,
            x: -5
        },

        endOnTick: false,
                //max: 1000,
    labels:{
      enabled: false
    },
    tickAmount: 0,
    gridLineWidth: 0,
    max: 1
  },
  xAxis: {
    lineWidth: 0,
    labels:{
      enabled: true,

    },
    // type: "category",
    categories : rivers, // tickAmount: 0,
    tickWidth:0,
    // gridLineWidth: 0
  },
  legend: {
    enabled: true,
    reversed: true
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
        name: 'Grade V+',
        data: grade_VI_data,
        color: "#020303"
    }, {
        name: 'Grade IV-V',
        data: grade_IV_V_data,
        color: "#7C8388"
    }, {
        name: 'Grade I-III',
        data: grade_I_III_data,
        color: "#0D77B9"
    }]
  });
  });
})
