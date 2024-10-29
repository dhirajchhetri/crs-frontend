import React, { useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Table, Tab, Tabs, Nav, Form, Button } from 'react-bootstrap';
import { DistrictMap } from 'react-nepal-map';
import { useDispatch, useSelector } from 'react-redux';
import {
    getCsrHHRegistrationData,
    getDistricts,
    getModelfiveKpiGraph,
    getModelfourKpiGraph,
    getModelOneKpiGraph,
    getModelThreeKpiGraph,
    getModelTwoKpiGraph,
    getYears
} from '../../../store/dashboard.actions';
import Nvd3Chart from '../../charts/nvd3-chart';
import MapBox from './MapBox/map';
// import Map from './MapBox';
// import MapView from './MapBox/map';
import Filter from './components/filter';
import { MemoProgramProgress } from './components/programProgress';
import HighChart from '../../charts/high-charts';
import FilterSectorYear from './components/filterSector&Year';

const DashDefault = () => {
    // const dispatch = useDispatch();

    // const CsrHHRegistrationData = useSelector((state) => state.dashboardReducer.csrHHRegistrationData);

    // useEffect(() => {
    //     dispatch(getDistricts());
    //     dispatch(getCsrHHRegistrationData());
    //     dispatch(getYears());
    //     dispatch(getModelOneKpiGraph());
    //     dispatch(getModelTwoKpiGraph());
    //     dispatch(getModelThreeKpiGraph());
    //     dispatch(getModelfourKpiGraph());
    //     dispatch(getModelfiveKpiGraph());

    // }, []);


    return (
        <React.Fragment>
            <Tabs variant="pills" defaultActiveKey="home" className="mb-3">
                <Tab eventKey="home" title="Participant">
                    <Row>
                        <Col sm={12} md={12} lg={12} xl={12}>
                            <Filter />
                        </Col>
                        <Col sm={12} md={12} lg={12} xl={12}>
                            <Card>
                                {/* <Card.Body> */}
                                <MapBox />
                                {/* </Card.Body> */}
                            </Card>
                            {/* <Nvd3Chart /> */}
                            {/* <FilterSectorYear /> */}
                            <HighChart />
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="program_progress" title="Progress">
                    <MemoProgramProgress />
                </Tab>
            </Tabs>
        </React.Fragment>
    );
};

export default DashDefault;
