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

function HighChartsMultiLineBasic(props = initialState) {
    const { chartType, chartTitle, categories, xAxisTitle, yAxistitle, seriesData ,seriesStartDate} = props;

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
                formatter : function() {
                    var quarter = Math.ceil((new Date(this.value).getMonth() + 1) / 3);
                    return Highcharts.dateFormat('Q' + quarter + ' %Y' , this.value);
                },
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

export default React.memo(HighChartsMultiLineBasic);
