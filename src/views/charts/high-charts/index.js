import React, { useEffect, useMemo, useState } from 'react';
import { Row, Col} from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { creatDatumMutiBarChart, createAgeDatum, createDatum, createDatumTrancheRecievedCurrent } from '../../../utils/services';
import { colors, dashboardChartDisplayText, GraphType } from '../../../config/constant';
import WidgetCard from '../custom-cards/WidgetCard';
import HighChartMultiBar from './charts/high-chart-multibar';
import HighChartMultiBarHorizontal from './charts/high-chart-multibar-horizontal';
import { getHighChartsCategories, getHighChartsStackedBarSeriesData } from '../../../utils/highcharts.services';

const HighChart = () => {
    const selectedDistricts = useSelector((state) => state.dashboardReducer.selectedDistricts);
    const selectedPalikas = useSelector((state) => state.dashboardReducer.selectedPalikas);

    const selectionCategoryForTargetProgress= selectedPalikas.length>0?'reg_palika':'reg_district'

    const getHouseHoldShelterTargetProgress= useSelector((state)=> state.dashboardReducerv1.household_shelter_target_progress); 
    const getLivelihoodTrainingAttendanceTargetProgress= useSelector((state)=> state.dashboardReducerv1.livelihood_training_attendance_target_progress); 
    

    // const datumgetHouseholdShelterTargetProgress = creatDatumMutiBarChart(['actual_shelter_hh_completed','target_shelter_hh'], selectionForTargetProgress, getHouseholdShelterTargetProgress, colors,);

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

   
    const dataCat=getHighChartsCategories(getHouseHoldShelterTargetProgress, selectionCategoryForTargetProgress)
    const chartOptionsHouseHoldShelterTargetProgress=useMemo(()=>{
        return {
            chartType :'column',
            chartTitle:'House Hold Shelter (Target Vs Progress)',
            categories:dataCat,
            xAxisTitle:selectedPalikas.length>0?'Muncipals':'Districts', 
            yAxistitle:'',
           seriesData:getHighChartsStackedBarSeriesData(getHouseHoldShelterTargetProgress,dataCat,selectionCategoryForTargetProgress,
            ['actual','target'])
            
        }
    },[getHouseHoldShelterTargetProgress])
    const dataCatLta=getHighChartsCategories(getLivelihoodTrainingAttendanceTargetProgress, selectionCategoryForTargetProgress)

    const chartOptionsLivelihoodTrainingAttendancewTargetProgress=useMemo(()=>{
        return {
            chartType :'bar',
            chartTitle:'Livelihood Training Attendance (Target Vs Progress)',
            categories:dataCatLta,
            xAxisTitle:selectedPalikas.length>0?'Muncipals':'Districts', 
            yAxistitle:'',
           seriesData:getHighChartsStackedBarSeriesData(getLivelihoodTrainingAttendanceTargetProgress,dataCatLta,selectionCategoryForTargetProgress,
            ['actual'])
            
        }
    },[getHouseHoldShelterTargetProgress])
    



    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <HighChartMultiBar {...chartOptionsHouseHoldShelterTargetProgress} />
                </Col>
                <Col md={6}>
                    <HighChartMultiBarHorizontal {...chartOptionsLivelihoodTrainingAttendancewTargetProgress} />
                </Col>
                
            </Row>
        </React.Fragment>
    );
};

export default HighChart;
