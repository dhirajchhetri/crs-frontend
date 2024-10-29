import { MemoSectorFilter, SectorFilter } from './sectorFilter';
import React, { useCallback, useEffect ,useState} from 'react';
import { MemoYearFilter } from './yearFilter';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    dashBoardFilterChange,
    getPalikas,
    setSectorSelected,
    getWards,
    setSelectedDistricts,
    setSelectedPalikas,
    setSelectedQuarterFilter,
    setSelectedWards,
    setSelectedYearFilter,
    setIndicatorSeleced
} from '../../../../store/dashboard.actions';
import { MemoPerformanceFilter } from './performanceIndicatorFilter';
import { removeItemFromArray } from '../../../../utils/services';
import { DropDown } from './dropdown';
import { MemoQuarterFilter } from './quarterFilter';
import { performanceIndicators, Quarters, sectors } from '../../../../config/constant';

const Filter = ({}) => {
    const dispatch = useDispatch();
    const districts = useSelector((state) => state.dashboardReducer.districts);
    const palikas = useSelector((state) => state.dashboardReducer.palikas);
    const wards = useSelector((state) => state.dashboardReducer.wards);
    const years = useSelector((state) => state.dashboardReducer.years);

    const selectedDistricts = useSelector((state) => state.dashboardReducer.selectedDistricts);
    const selectedPalikas = useSelector((state) => state.dashboardReducer.selectedPalikas);
    const selectedWards = useSelector((state) => state.dashboardReducer.selectedWards);
    const selectedYears = useSelector((state) => state.dashboardReducer.selectedYears);
    // const selectedQuarters = useSelector((state) => state.dashboardReducer.selectedQuarters);
    const selectedSector= useSelector((state)=>state.dashboardReducer.selectedSector)
    const selectedIndicator= useSelector((state)=>state.dashboardReducer.selectedIndicator)
    useEffect(() => {
        dispatch(dashBoardFilterChange(selectedDistricts, selectedPalikas, selectedYears, selectedWards));
    }, [selectedPalikas, selectedDistricts, selectedYears, selectedWards,selectedSector, selectedIndicator]);
    useEffect(()=>{
        dispatch(setSelectedYearFilter(years[1]))
    },[years])
    useEffect(()=>{
        dispatch(setSectorSelected(sectors[0]))
    },[sectors])
    
    const [performanceIndicatorsOptions,setPerformanceIndicatorsOptions]= useState(performanceIndicators);

    useEffect(()=>{
        setPerformanceIndicatorsOptions(()=>{
            const options =performanceIndicators.filter(x=>x.sector===selectedSector.value);
            return options
        })
    },[selectedSector])


    const onDistrictSelectionChange = useCallback((e) => {
        dispatch(setSelectedDistricts(e));
        dispatch(setSelectedPalikas([]));
        dispatch(setSelectedWards([]));
        dispatch(getPalikas(e));
    }, []);
    const onPalikaSelectionChange = useCallback((e) => {
        dispatch(setSelectedPalikas(e));
        dispatch(setSelectedWards([]));
        dispatch(getWards(e));
    }, []);
    const onWardSelectionchange = useCallback((e) => {
        dispatch(setSelectedWards(e));
    }, []);
   
    const onSectorSelectionChange = (value) => {
        dispatch(setSectorSelected(sectors.find(x=> x.value===value)));
        dispatch(setIndicatorSeleced(null))


    };
    const onIndicatorSelectionChange = (value) => {
        dispatch(setIndicatorSeleced(performanceIndicators.find(x=> x.value===value)));
    };

    const handleYearFilterChange = useCallback(
        (e) => {
            dispatch(setSelectedYearFilter(e));
        },
        [selectedYears]
    );
    // const handleQuarterFilterChange = useCallback(
    //     (e) => {
    //         const valueClicked = Number(e.target.value);
    //         const checkedStatus = e.target.checked;
    //         if (checkedStatus) {
    //             dispatch(setSelectedQuarterFilter([...selectedQuarters, valueClicked]));
    //         } else {
    //             dispatch(setSelectedQuarterFilter([...removeItemFromArray(selectedQuarters, valueClicked)]));
    //         }
    //     },
    //     [selectedQuarters]
    // );
    return (
        <>
            <Card>
                <Card.Header>
                    <i className="feather icon-filter mr-2" />
                    <Card.Title as="h5"> FILTERS </Card.Title>
                    <Button className="card-header-right pt-1">Reset</Button>
                </Card.Header>
      
                    <Row style={{padding:'10px'}}>
                        <Col md={4}>
                            <DropDown
                                multi={true}
                                handleChange={onDistrictSelectionChange}
                                options={districts}
                                label="Districts"
                                value={selectedDistricts}
                            />
                        </Col>
                        <Col md={4}>
                            <DropDown
                                multi={true}
                                handleChange={onPalikaSelectionChange}
                                options={palikas}
                                label="Municipal"
                                value={selectedPalikas}
                                disabled={!selectedDistricts.length}
                            />
                        </Col>
                        <Col md={4}>
                            <DropDown
                                multi={true}
                                handleChange={onWardSelectionchange}
                                options={wards}
                                label="Ward"
                                value={selectedWards}
                                disabled={!selectedPalikas.length}
                            />
                        
                            {/* <MemoPerformanceFilter />    */}
                            {/* <MemoYearFilter years={years} handleYearFilterChange={handleYearFilterChange} /> */}
                            {/* <MemoQuarterFilter quarters={Quarters} handleQuarterFilterChange={handleQuarterFilterChange} isDisabled={!selectedYears.length} /> */}
                        </Col>
                        <Col md={4} >
                        <DropDown
                                multi={false}
                                handleChange={onSectorSelectionChange}
                                options={sectors}
                                label="Sector"
                                value={selectedSector}
                                
                            />

                        </Col>
                        <Col md={4} >
                        <DropDown
                                multi={false}
                                handleChange={onIndicatorSelectionChange}
                                options={performanceIndicatorsOptions}
                                label="Performance Indicator"
                                value={selectedIndicator}
                                
                            />

                        </Col>
                        <Col md={4} >
                        <DropDown
                                multi={true}
                                handleChange={handleYearFilterChange}
                                options={years}
                                label="Year"
                                value={selectedYears}
                               
                                
                            />

                        </Col>
                    </Row>

            </Card>
        </>
    );
};




export default Filter;
