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

function HighChartMultiBarHorizontal(props=initialState) {
    
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
              text: yAxistitle,
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
  
      tooltip: {
          formatter: function () {
              return '<b>' + this.x + '</b><br/>' +
                  this.series.name + ': ' + this.y + '<br/>'
          }
      },
  
      plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
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

export default React.memo(HighChartMultiBarHorizontal)