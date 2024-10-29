import React from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';

const PieBasicChart = (props) => {
    const { datum , height=300, labelType='percent'}= props;
    const valueformat =d3.format('d')


    return <NVD3Chart id="chart" height={height} type="pieChart" datum={datum} x="key" y="y" labelType={labelType} showLegend={true} legendPosition="bottom" padAngle={0.03} valueFormat={valueformat}/>;
};

export default React.memo(PieBasicChart);
