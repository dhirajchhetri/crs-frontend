import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsExporting from 'highcharts/modules/exporting';
import hightLandChartsExportData from 'highcharts/modules/export-data';
import hightLandChartsAccessebility from 'highcharts/modules/accessibility';
highchartsExporting(Highcharts);
hightLandChartsExportData(Highcharts);
hightLandChartsAccessebility(Highcharts);

const initialState = {
    chartType: '',
    chartTitle: '',
    categories: [],
    xAxisTitle: '',
    yAxistitle: '',
    seriesData: [
        {
            name: '',
            data: [],
            pointInterval: '',
            pointIntervalUnit: '',
            pointStart: '',
        }
    ]
};

function HighChartMultiLines(props = initialState) {
    const { chartType, chartTitle, categories, xAxisTitle, yAxistitle, seriesData } = props;
    Highcharts.dateFormats = {
        q: function(timestamp) {
          var date = new Date(timestamp),
            quarter = (Math.floor(date.getUTCMonth() / 3) + 1);
          return quarter;
        } 
        
      };
    const chartOptions = {
        chart: {
            type: chartType
        },

        title: {
            text: chartTitle
        },

        xAxis: {
            type: 'datetime',
            units: [ // responsive ticks
              ['month', [3]],
            ],
            labels: {
              format: '{value:%y\'Q%q}',
              rotation: -30
            }
          },
        
         
       

        tooltip: {
            formatter: function () {
                return  '</b><br/>' + this.series.name + ': ' + this.y;
            }
        },
      
        series: seriesData

        
    };
    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default React.memo(HighChartMultiLines);
