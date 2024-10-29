import React from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';

const PieDonutChart = (props) => {
    
    const { datum ,labelType='percent', height=300}= props;
    const valueformat =d3.format('d')

    const chartOptions={
      type:"pieChart",
      datum:datum,
      x:"key",
      y:"y",
      donut:true,
      labelType:labelType,
      donutRatio:0.3,
      padAngle:0.03,
      valueformat:valueformat,
      cornerRadius:true,
      legendPosition:"bottom",
      height:height,
    }
   
    return <NVD3Chart {...chartOptions} />;
};

export default React.memo(PieDonutChart);
