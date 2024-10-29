import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { createKPIDatum } from '../../../utils/services';
import { colors } from '../../../config/constant';

import { getHighChartsCategories } from '../../../utils/highcharts.services';
import HighChartMultiline from './charts/high-chart-multiline';
import HighChartMultilinebasic from './charts/high-chart-multilinebasic';

const HighChartKPIData = () => {
   
    const getModelOneKpiData = useSelector((state) => state.dashboardReducer.kpi_model_one_data);
    const getModelTwoKpiData = useSelector((state) => state.dashboardReducer.kpi_model_two_data);
    const getModelThreeKpiData = useSelector((state) => state.dashboardReducer.kpi_model_three_data);
    const getModelfourKpiData = useSelector((state) => state.dashboardReducer.kpi_model_four_data);
    const getModelfiveKpiData = useSelector((state) => state.dashboardReducer.kpi_model_five_data);


    const datumKpiModelOneData = createKPIDatum('KPI Model One', getModelOneKpiData, colors);
    const datumKpiModelTwoData = createKPIDatum('KPI Model Two', getModelTwoKpiData, colors);
    const datumKpiModelThreeData = createKPIDatum('KPI Model Three', getModelThreeKpiData, colors);
    const datumKpiModelFourData = createKPIDatum('Livelihoods Materials',getModelfourKpiData, colors);
    const datumKpiModeFiveData = createKPIDatum('Water Infrastructure', getModelfiveKpiData, colors);

    const [show, setShow] = useState(new Array(10).fill(false));
    const [menu, setMenu] = useState(new Array(10).fill(false));
    const [graphMenu, setGraphMenu] = useState('');
    const [graphShow, setGraphShow] = useState('');
    const handleHover = (index) => {
        setShow(() => {
            show[index] = !show[index];
            return [...show];
        });
    };

    const chartOptionsKpiModelOneData = {
        chartType: 'line',
        chartTitle: 'KPI MODEL- 1',
        xAxisTitle: 'Time',
        yAxistitle: 'Number',
        seriesData: datumKpiModelOneData,
        seriesStartDate:Date.UTC(2020, 12, 1)
    };

    const chartOptionsKpiModelTwoData = {
        chartType: 'line',
        chartTitle: 'KPI MODEL-2',
        xAxisTitle: 'Time',
        yAxistitle: 'Number',
        seriesData: datumKpiModelTwoData
    };

    const chartOptionsKpiModelThreeData = {
        chartType: 'line',
        chartTitle: 'KPI MODEL-3',
        xAxisTitle: 'Time',
        yAxistitle: 'Number',
        seriesData: datumKpiModelThreeData
    };

    const chartOptionsKpiModelFourData = {
        chartType: 'line',
        chartTitle: 'Livelihoods Materials',
        xAxisTitle: 'Time',
        yAxistitle: 'Number',
        seriesData: datumKpiModelFourData
    };

    const chartOptionsKpiModelFiveData = {
        chartType: 'line',
        chartTitle: 'Water Infrastructure',
        xAxisTitle: 'Time',
        yAxistitle: 'Number',
        seriesData: datumKpiModeFiveData
    };
    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <HighChartMultilinebasic {...chartOptionsKpiModelOneData} />
                </Col>
                {/* <Col md={6}>
                    <HighChartMultiline {...chartOptionsKpiModelTwoData} />
                </Col>
                <Col md={6} className="mt-5">
                    <HighChartMultiline {...chartOptionsKpiModelThreeData} />
                </Col>
                <Col md={6} className="mt-5">
                    <HighChartMultiline {...chartOptionsKpiModelFourData} />
                </Col>
                <Col md={6} className="mt-5">
                    <HighChartMultiline {...chartOptionsKpiModelFiveData} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
};

export default HighChartKPIData;
