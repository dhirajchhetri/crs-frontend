import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

import LineChart from './chart/LineChart';
import BarDiscreteChart from './chart/BarDiscreteChart';
import PieDonutChart from './chart/PieDonutChart';
import PieBasicChart from './chart/PieBasicChart';
import MultiBarChart from './chart/MultiBarChart';
import { useSelector } from 'react-redux';
import { creatDatumMutiBarChart, createAgeDatum, createDatum, createDatumTrancheRecievedCurrent } from '../../../utils/services';
import { colors, dashboardChartDisplayText, GraphType } from '../../../config/constant';
import WidgetCard from '../custom-cards/WidgetCard';

const Nvd3Chart = () => {
    const particpants = useSelector((state) => state.dashboardReducer.PARTICIPANTS);
    const participantsByGender = useSelector((state) => state.dashboardReducer.PARTICIPANTS_BY_GENDER);
    const participantsByEthinicity = useSelector((state) => state.dashboardReducer.PARTICIPANTS_BY_ETHINICITY);
    const participantsByAge = useSelector((state) => state.dashboardReducer.PARTICIPANTS_BY_AGE);
    const getHeadPWD = useSelector((state) => state.dashboardReducer.head_pwd);
    const getOtherMemberPWD = useSelector((state) => state.dashboardReducer.other_member_pwd);
    const getHHTrancheBaseline = useSelector((state) => state.dashboardReducer.hh_tranche_baseline);
    const getHHTrancheCurrent = useSelector((state) => state.dashboardReducer.hh_tranche_current);
    const getHHConstructionType = useSelector((state) => state.dashboardReducer.hh_construction_type);
    const getAverageEarning = useSelector((state) => state.dashboardReducer.average_earning);
    console.log(particpants, 'datum particpants');

    const datumParticipants = createDatum('vulnearabilty', particpants, colors);
    console.log(datumParticipants, 'datum');
    const datumparticipantsByGender = createDatum('gender', participantsByGender, colors);
    const datumParticipantsByEthinicity = createDatum('ethinity', participantsByEthinicity, colors);
    const datumparticipantsByAge = createAgeDatum('age', participantsByAge, colors);
    const datumgetHeadPWD = createDatum('head_pwd', getHeadPWD, colors);
    const datumgetOtherMemberPWD = createDatum('other_member_pwd', getOtherMemberPWD, colors);
    const datumgetHHTrancheBaseline = createDatum('hh_tranche_received', getHHTrancheBaseline, colors);
    const datumgetHHTrancheCurrent = createDatumTrancheRecievedCurrent(getHHTrancheCurrent, colors);
    const datumgetHHConstructionType = creatDatumMutiBarChart('house_contruct', 'district', getHHConstructionType, colors);
    const datumgetAverageEarning = createDatum('avg_earn', getAverageEarning, colors);

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

    const widgetCardPropsProjectParticipants = useMemo(() => {
        return {
            index: 0,
            title: 'Total Project Participants',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumParticipants,
            chartType: GraphType.PieDonutChart,
            labelType: 'percent',
            infoText: dashboardChartDisplayText.chart0,
            height: 250
        };
    }, [show, menu, datumParticipants]);
    const widgetCardPropsParticipantsByGender = useMemo(() => {
        return {
            index: 1,
            title: 'Participants By Gender',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumparticipantsByGender,
            chartType: GraphType.PieDonutChart,
            labelType: 'percent',
            height: 250,
            infoText: dashboardChartDisplayText.chart1
        };
    }, [show, menu, datumparticipantsByGender]);
    const widgetCardPropsParticipantsByEthinicity = useMemo(() => {
        return {
            index: 2,
            title: 'Participant Distribution By Ethinicity',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumParticipantsByEthinicity,
            chartType: GraphType.PieBasicChart,
            labelType: 'percent',
            height: 250,
            infoText: dashboardChartDisplayText.chart2
        };
    }, [show, menu, datumParticipantsByEthinicity]);
    const widgetCardPropsParticipantAgeDistribution = useMemo(() => {
        return {
            index: 3,
            title: 'Participant Distribution By Age',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumparticipantsByAge,
            chartType: GraphType.BarDiscreteChart,
            labelType: 'percent',
            height: 350,
            infoText: dashboardChartDisplayText.chart3
        };
    }, [show, menu, datumparticipantsByAge]);
    const widgetCardPropsParticipantTrancheStatus = useMemo(() => {
        return {
            index: 4,
            graphs: 2,
            title: 'Participant Trache Status',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: [datumgetHHTrancheBaseline, datumgetHHTrancheCurrent],
            chartType: GraphType.PieDonutChart,
            labelType: 'percent',
            height: 350,
            infoText: dashboardChartDisplayText.chart4
        };
    }, [show, menu, datumgetHHTrancheBaseline, datumgetHHTrancheCurrent]);
    const widgetCardPropsPwdHeadHouseHold = useMemo(() => {
        return {
            index: 5,
            title: 'PWD HEAD Household',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumgetHeadPWD,
            chartType: GraphType.PieDonutChart,
            labelType: 'percent',
            height: 350,
            infoText: dashboardChartDisplayText.chart5
        };
    }, [show, menu, datumgetHeadPWD]);
    const widgetCardPropsPwdOtherThanHH = useMemo(() => {
        return {
            index: 6,
            title: 'PWD IF OTHER THAN HEAD HH',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumgetOtherMemberPWD,
            chartType: GraphType.PieDonutChart,
            labelType: 'percent',
            height: 350,
            infoText: dashboardChartDisplayText.chart6
        };
    }, [show, menu, datumgetOtherMemberPWD]);
    const widgetCardPropsAverageEarning = useMemo(() => {
        return {
            index: 7,
            title: "Participant's Average Income",
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumgetAverageEarning,
            chartType: GraphType.PieDonutChart,
            labelType: 'percent',
            height: 350,
            infoText: dashboardChartDisplayText.chart7
        };
    }, [show, menu, datumgetAverageEarning]);
    const widgetCardPropsHHConstructionType = useMemo(() => {
        return {
            index: 8,
            title: 'Housing Construction Type',
            handleHover,
            handleWidgetMenuClick,
            menu,
            show,
            datum: datumgetHHConstructionType,
            chartType: GraphType.MultiBarChart,
            labelType: 'percent',
            height: 350,
            infoText: dashboardChartDisplayText.chart8
        };
    }, [show, menu, datumgetHHConstructionType]);

    return (
        <React.Fragment>
            <Row>
                <Col md={3}>
                    <WidgetCard {...widgetCardPropsProjectParticipants} />
                </Col>
                <Col md={3}>
                    <WidgetCard {...widgetCardPropsParticipantsByGender} />
                </Col>
                <Col md={6}>
                    <WidgetCard {...widgetCardPropsParticipantsByEthinicity} />
                </Col>
                <Col md={6}>
                    <WidgetCard {...widgetCardPropsParticipantAgeDistribution} />
                </Col>
                <Col md={6}>
                    <WidgetCard {...widgetCardPropsParticipantTrancheStatus} />
                </Col>
                <Col md={4}>
                    <WidgetCard {...widgetCardPropsPwdHeadHouseHold} />
                </Col>
                <Col md={4}>
                    <WidgetCard {...widgetCardPropsPwdOtherThanHH} />
                </Col>
                <Col md={4}>
                    <WidgetCard {...widgetCardPropsAverageEarning} />
                </Col>
                <Col md={8}>
                    <WidgetCard {...widgetCardPropsHHConstructionType} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Nvd3Chart;
