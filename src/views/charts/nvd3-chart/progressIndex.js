import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { createKPIDatum } from '../../../utils/services';
import { colors, dashboardChartDisplayText, GraphType } from '../../../config/constant';
import WidgetCard from '../custom-cards/WidgetCard';

const ProgressNvd3Chart = () => {
    const getModelOneKpiData = useSelector((state) => state.dashboardReducer.kpi_model_one_data);
    const getModelTwoKpiData = useSelector((state) => state.dashboardReducer.kpi_model_two_data);
    const getModelThreeKpiData = useSelector((state) => state.dashboardReducer.kpi_model_three_data);

    const datumKpiModelOneData = createKPIDatum('KPI Model One', getModelOneKpiData, colors);
    const datumKpiModelTwoData = createKPIDatum('KPI Model Two', getModelTwoKpiData, colors);
    const datumKpiModelThreeData = createKPIDatum('KPI Model Three', getModelThreeKpiData, colors);

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

    const handleWidgetMenuClick = (index) => {
        setMenu(() => {
            menu[index] = !menu[index];
            return [...menu];
        });
    };

    const widgetCardPropsKpiModelOneData = useMemo(() => {
        return {
            index: 0,
            title: 'Total Project Participants',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumKpiModelOneData,
            chartType: GraphType.LineChart,
            labelType: 'number',
            infoText: dashboardChartDisplayText.chart0,
            height: 250
        };
    }, [show, menu, datumKpiModelOneData]);

    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <WidgetCard {...widgetCardPropsKpiModelOneData} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ProgressNvd3Chart;
