import React, { useMemo } from 'react';
import NVD3Chart from 'react-nvd3';
import * as d3 from 'd3';

const BarDiscreteChart = (props) => {
    const { datum =[] , height=300} = props
    
    const upperBoundY=useMemo(()=>{
        const maxy = datum.length>0 ? d3.max(datum.map(d=>  d3.max(d.values.map(x=>x.value)))):null
        return maxy? Number((Number(String(maxy)[0]) +1)+'0'.repeat(String(maxy).length-1)):null
        
    },[datum,height])

    const yaxis={
        tickFormat:  d3.format('d') ,
       
    }
    const valueformat =d3.format('d')

    const chartOptions={
        type:"discreteBarChart",
        x:"label",
        y:"value",
        height:height,
        tooltip:{
            enabled:true
        },
        datum:datum,
        yAxis:yaxis,
        valueFormat:valueformat,
        forceY:[0,upperBoundY],
        duration:300
        

    }
    return <NVD3Chart {...chartOptions}/>;
};

export default  React.memo(BarDiscreteChart)
