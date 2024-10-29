import React, { useMemo } from 'react';
import NVD3Chart from 'react-nvd3';
import * as  d3 from 'd3';

// { "key": "Stream #0",
// "color": "#A389D4",
// "values":[
//    { 
//    x:0,
//    y:0
    
// ]}



const MultiBarChart = ({datum =[], height=350}) => {
    const upperBoundY=
    useMemo(()=>{
        const maxy = datum.length>0 ? d3.max(datum.map(d=>  d3.max(d.values.map(x=>x.y)))):null
        return maxy? Number((Number(String(maxy)[0]) +1)+'0'.repeat(String(maxy).length-1)):null

    },[datum])

    const yaxis={
        tickFormat:  d3.format('d') ,
    }
   

    const chartOptions ={
        type:"multiBarChart",
        datum:datum,
        x:"x",
        y:"y", 
        showValues:true,
        groupSpacing:0.2,
        yAxis:yaxis, 
        showControls:false,
        height:height,
        forceY:[0,upperBoundY],
        useInteractiveGuideline:true
    }
    return <NVD3Chart {...chartOptions}

     />;
};

export default React.memo(MultiBarChart);
