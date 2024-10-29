import React, { useState } from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsExporting from "highcharts/modules/exporting";
import hightLandChartsExportData from "highcharts/modules/export-data"
import hightLandChartsAccessebility from "highcharts/modules/accessibility"
highchartsExporting(Highcharts);
hightLandChartsExportData(Highcharts);
hightLandChartsAccessebility(Highcharts);

const initialState ={
    chartType :'',
    chartTitle:'',
    categories:[],
    xAxisTitle:'', 
    yAxistitle:'',
   seriesData:[{
       name:'',
       data:[]
       

   }]

}

function HighChartMultiBar(props=initialState) {
    
     const { chartType, chartTitle, categories, xAxisTitle, yAxistitle, seriesData} = props 
  

  const chartOptions={

      chart: {
          type: chartType
      },
  
      title: {
          text: chartTitle
      },
  
      xAxis: {
          categories: categories,
          title:{
              text:xAxisTitle
          }
      },
  
      yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
              text: yAxistitle
          }
      },
  
      tooltip: {
          formatter: function () {
              return '<b>' + this.x + '</b><br/>' +
                  this.series.name + ': ' + this.y + '<br/>'
          }
      },
  
      plotOptions: {
        column: {
            borderWidth: 0
        }
      },
  
      series: seriesData
    }
  return (
    <HighchartsReact
    highcharts={Highcharts}
    options={chartOptions}
  />
  )
}

export default React.memo(HighChartMultiBar)