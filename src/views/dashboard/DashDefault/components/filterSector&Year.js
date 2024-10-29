import { MemoSectorFilter, SectorFilter } from './sectorFilter';
import React, { useCallback, useEffect, useState } from 'react';
import { MemoYearFilter } from './yearFilter';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
    dashBoardFilterChange,
    getPalikas,
    getWards,
    setSelectedDistricts,
    setSelectedPalikas,
    setSelectedQuarterFilter,
    setSelectedWards,
    setSelectedYearFilter
} from '../../../../store/dashboard.actions';
import { MemoPerformanceFilter } from './performanceIndicatorFilter';
import { removeItemFromArray } from '../../../../utils/services';
import { DropDown } from './dropdown';
import { MemoQuarterFilter } from './quarterFilter';
import { Quarters } from '../../../../config/constant';

const FilterSectorYear = ({}) => {
    const dispatch = useDispatch();
    const districts = useSelector((state) => state.dashboardReducer.districts);
    const palikas = useSelector((state) => state.dashboardReducer.palikas);
    const wards = useSelector((state) => state.dashboardReducer.wards);
    const years = useSelector((state) => state.dashboardReducer.years);

    const selectedDistricts = useSelector((state) => state.dashboardReducer.selectedDistricts);
    const selectedPalikas = useSelector((state) => state.dashboardReducer.selectedPalikas);
    const selectedWards = useSelector((state) => state.dashboardReducer.selectedWards);
    const selectedYears = useSelector((state) => state.dashboardReducer.selectedYears);
    const selectedQuarters = useSelector((state) => state.dashboardReducer.selectedQuarters);
    useEffect(() => {
        dispatch(dashBoardFilterChange(selectedDistricts, selectedPalikas, selectedYears, selectedQuarters, selectedWards));
    }, [selectedPalikas, selectedDistricts, selectedYears, selectedQuarters, selectedWards]);

    const [Quater, setQuater] = useState(false);
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
    const handleYearFilterChange = useCallback(
        (e) => {
            const valueClicked = Number(e.target.value);
            const checkedStatus = e.target.checked;
            if (checkedStatus) {
                dispatch(setSelectedYearFilter([...selectedYears, valueClicked]));
                setQuater(true);
            } else {
                dispatch(setSelectedYearFilter([...removeItemFromArray(selectedYears, valueClicked)]));
                if (selectedYears.length === 0) {
                    dispatch(setSelectedQuarterFilter([]));
                    setQuater(false);
                }
            }
        },
        [selectedYears]
    );
    const handleQuarterFilterChange = useCallback(
        (e) => {
            const valueClicked = Number(e.target.value);
            const checkedStatus = e.target.checked;
            if (checkedStatus) {
                dispatch(setSelectedQuarterFilter([...selectedQuarters, valueClicked]));
            } else {
                dispatch(setSelectedQuarterFilter([...removeItemFromArray(selectedQuarters, valueClicked)]));
            }
        },
        [selectedQuarters]
    );
    return (
        <>
            <Card>
                <Card.Header>
                    <i className="feather icon-filter mr-2" />
                    <Card.Title as="h5"> FILTERS </Card.Title>
                    <Button className="card-header-right pt-1">Reset</Button>
                </Card.Header>

                <Row style={{ padding: '15px' }}>
                    <Col md={6}>
                        <MemoSectorFilter />
                    </Col>
                    <Col md={3}>
                        {/* <MemoPerformanceFilter />    */}
                        <MemoYearFilter years={years} handleYearFilterChange={handleYearFilterChange} />
                        {/* <MemoQuarterFilter quarters={Quarters} handleQuarterFilterChange={handleQuarterFilterChange} isDisabled={!selectedYears.length} /> */}
                    </Col>
                    <Col md={3}>
                        {Quater && (
                            <MemoQuarterFilter
                                quarters={Quarters}
                                handleQuarterFilterChange={handleQuarterFilterChange}
                                isDisabled={!selectedYears.length}
                            />
                        )}
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default FilterSectorYear;
