import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highchartsExporting from 'highcharts/modules/exporting';
import hightLandChartsExportData from 'highcharts/modules/export-data';
import hightLandChartsAccessebility from 'highcharts/modules/accessibility';
import { data } from 'jquery';
import { line } from 'd3';
highchartsExporting(Highcharts);
hightLandChartsExportData(Highcharts);
hightLandChartsAccessebility(Highcharts);

const initialState = {
    chartType: '',
    chartTitle: '',
    categories: [],
    xAxisTitle: '',
    yAxistitle: '',
    seriesData: []

};

function HighChartLines(props = initialState) {
    const { chartType, chartTitle, categories, xAxisTitle, yAxistitle, seriesData } = props;
    Highcharts.dateFormats = {
        q: function (timestamp) {
            var date = new Date(timestamp),
                quarter = Math.floor(date.getUTCMonth() / 3) + 1;
            return quarter;
        }
    };
    console.log(seriesData, 'Ser');
    const chartOptions = {
        chart: {
            type: chartType
        },

        title: {
            text: chartTitle
        },

        xAxis: {
            type: 'datetime',
            units: [
                // responsive ticks
                ['month', [3]]
            ],
            labels: {
                format: "{value:20%y'Q%q}",
                rotation: -30
            }
        },

        tooltip: {
            formatter: function () {
                return '</b><br/>' + this.series.name + ': ' + this.y;
            }
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        series: [
            {
                type: 'line',
                data: seriesData.data,
                name: 'Actual Data',
                pointInterval: 3,
                pointIntervalUnit: 'month',
                pointStart: Date.UTC(2018, 0, 1)
            }
        ]
    };
    return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
}

export default React.memo(HighChartLines);
