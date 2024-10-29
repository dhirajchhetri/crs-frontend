import React from 'react';
import { GraphType } from '../../../config/constant';
import BarDiscreteChart from '../nvd3-chart/chart/BarDiscreteChart';
import LineChart from '../nvd3-chart/chart/LineChart';
import MultiBarChart from '../nvd3-chart/chart/MultiBarChart';
import PieBasicChart from '../nvd3-chart/chart/PieBasicChart';
import PieDonutChart from '../nvd3-chart/chart/PieDonutChart';

function ChartDisplayByType({ chartType, datum, labelType = 'percent', height = 250 }) {
    switch (chartType) {
        case GraphType.PieDonutChart:
            return <PieDonutChart datum={datum} height={height} labelType={labelType} />;
        case GraphType.PieBasicChart:
            return <PieBasicChart datum={datum} height={height} labelType={labelType} />;
        case GraphType.BarDiscreteChart:
            return <BarDiscreteChart datum={datum} height={height} labelType={labelType} />;
        case GraphType.MultiBarChart:
            return <MultiBarChart datum={datum} height={height} />;
        case GraphType.LineChart:
            return <LineChart datum={datum} height={height} />;
        default:
            <></>;
    }
}

export default React.memo(ChartDisplayByType);
