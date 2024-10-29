import React, { useMemo } from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';

const LineChart = (props) => {
    const { datum = [], height = 300 } = props;

    console.log('LineChart', datum.length);

    const xaxis = {
        axisLabel: 'Time (v)',
        tickFormat: d3.format(',r')
    };

    const yaxis = {
        axisLabel: 'Voltage (v)',
        tickFormat: d3.format('d')
    };

    const chartOptions = {
        type: 'lineChart',
        datum: datum,
        showLegend: true,
        yAxis: yaxis,
        xaxis: xaxis,
        height: height,
        showYAxis: true,
        showXAxis: true,
        useInteractiveGuideline: true
    };
    return <NVD3Chart {...chartOptions} />;
};

export default LineChart;
