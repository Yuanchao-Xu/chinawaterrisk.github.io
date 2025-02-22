jQuery( document ).ready(function() {


  rivers = ['Yellow','Yangtze','Pearl','Songhua','Huai','Hai','Liao','Northwest','Southwest','Southeast','Major rivers']



// Get water quality data
var surfacewater_quality_csv_url='https://raw.githubusercontent.com/chinawaterrisk/chinawaterrisk.github.io/master/resources/csv/water_quality/surfacewater_quality.csv'

var surfacewater_grade_I_III_2017 = {};
var surfacewater_grade_IV_V_2017 = {};
var surfacewater_grade_VI_2017 = {};


d3.csv(surfacewater_quality_csv_url, function(error, surfacewater_quality){

    surfacewater_quality_2017 = surfacewater_quality.filter(function(row){
      return row['Year']=='2017'
    }
    )
      surfacewater_quality_2017.forEach(function(row){
        if(rivers.includes(row['River'])){
            if(row['Grade'] == 'Grade I-III'){
              surfacewater_grade_I_III_2017[row['River']] = parseFloat(row['Value']);
            }else if(row['Grade'] == 'Grade IV-V'){
              surfacewater_grade_IV_V_2017[row['River']] = parseFloat(row['Value']);
            }else if(row['Grade'] == 'Grade V+'){
              surfacewater_grade_VI_2017[row['River']] = parseFloat(row['Value']);
            }
        }
      })


// from dict to highcharts data
grade_I_III_data = rivers.map(function(river){return surfacewater_grade_I_III_2017[river]})
grade_IV_V_data = rivers.map(function(river){return surfacewater_grade_IV_V_2017[river]})
grade_VI_data = rivers.map(function(river){return surfacewater_grade_VI_2017[river]})

grade_VI_data.push(0);
rivers_legend = rivers;
rivers_legend[rivers_legend.indexOf('Major rivers')]='Main Rivers';
rivers_legend.push(" ")

rivers_legend.push(" ");

// Create the chart
chart = new Highcharts.Chart({
  chart: {
    renderTo: 'basins_water_quality',
    type: 'column',
    style: {
           fontFamily: 'Arial Narrow',
       },
    backgroundColor:"transparent",
    spacingTop: 0
  },
  title: {
    enabled:false,
    text:'',
    //text: 'Top-5 Sown Land',
    margin: 0
  },
  plotOptions: {
    series: {
           stacking: 'normal',
           marker:{
               radius:0
           }
       },
       line: {
         marker:{
           enabled:false
         },
         lineWidth: 4
       },
    column: {
      stacking: 'normal',
      shadow: false,
      //colors: ["#560008","#ac0010","#c54d58","#d68088","#e6b3b7","#BDBFC3"],
      dataLabels: {
          enabled: false,
          //format: '<center><b>{point.name}</b><br /><center>{point.y}</center></center>',
          format: '{point.percentage}',
          //distance: 5,
          //color: 'white',
          //connectorWidth:0,
          align: 'right',
          //verticalAlign: 'top',
          style: {
            color:'white',
            fontSize: '12px',
            fontWeight:300,
            textOutline: false,
          }
      }
    }
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
    categories : rivers_legend, // tickAmount: 0,
    tickWidth:0,
    // gridLineWidth: 0
  },
  legend: {
    enabled: true,
    reversed: true,
    symbolRadius:0

  },
  credits: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  tooltip: {
    enabled: true,
    formatter: function(){
      if(this.series.type=='line'){
        return false;
      }
      return '<b>'+ this.series.name +'</b>: '+ Math.round(this.y*1000)/10 +' %';
    }
  },
  annotations: [{
   labelOptions: {
     shape: 'rect',
     backgroundColor: 'rgba(0,0,0,0)',
     borderWidth: 0,
      align: 'right',
      justify: false,
      crop: true,
      y: 20,
      x: -10,
      style: {
           color: '#9F171E',
          fontSize: '1.2em',
          //textOutline: '1px white'
      }
   },
   labels: [{
       point: {
           xAxis: 0,
           yAxis: 0,
           x: 12.4,
           y: 0.8
       },
       text: '2020 Target<br>70% in Grade I-III '
   }]
 }],

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
    },
  {
    name: '2020 Target (Grade I-III)',
    type: 'line',
    color: "#9F171E",
    data: [0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7,0.7]
  }]
  });
  });
})
