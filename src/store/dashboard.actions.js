import { dispatch, filter } from 'd3';
import { useSelector } from 'react-redux';
import axiosServices from '../utils/axios';
import { formatDistricts, formatPalikas, formatWards, formatYear } from '../utils/services';
import {
    GET_DISTRICTS,
    GET_PALIKAS,
    GET_PARTICIPANTS,
    GET_PARTICIPANTS_BY_AGE,
    GET_PARTICIPANTS_BY_ETHINICITY,
    GET_PARTICIPANTS_BY_GENDER,
    SELECTED_DISTRICTS,
    CRS_HH_REGISTRATION_DATA,
    SELECTED_PALIKAS,
    CRS_TRANCHE_DATA,
    HEAD_PWD,
    OTHER_MEMBER_PWD,
    YEARS,
    SELECTED_YEARS,
    HH_CONSTRUCTION_TYPE,
    HH_AVERAGE_EARN,
    SELECTED_QUARTERS,
    HH_TRANCHE_BASELINE,
    HH_TRANCHE_CURRENT,
    GET_WARDS,
    SELECTED_WARDS,
    KPI_MODEL_ONE_DATA,
    KPI_MODEL_TWO_DATA,
    KPI_MODEL_THREE_DATA,
    KPI_MODEL_FOUR_DATA,
    KPI_MODEL_FIVE_DATA,
    SECTOR_SELECTED,
    INDICATOR_SELECTED
} from './actions';
import { getHouseholdShelterTargetProgress, getlivelihoodTrainingAttendanceTargetProgress } from './dashboard.actionsv1';

export const dashBoardFilterChange = (selectedDistricts=[], selectedPalikas=[],selectedYears=[], selectedQuarters=[], selectedWards=[   ]) => async (dispatch) => {
    let filters = {};
    if (selectedDistricts.length>0) Object.assign(filters, { district: selectedDistricts.map(x=>x.value) });
    if (selectedPalikas.length>0) Object.assign(filters, { palika: selectedPalikas.map(x=>x.value) });
    if (selectedYears.length>0) Object.assign(filters, { year: selectedYears.map(x=>x.value) });
    if (selectedQuarters.length>0) Object.assign(filters, { quarter: selectedQuarters });
    if(selectedWards.length>0) Object.assign(filters,{ward:selectedWards.map(x=>x.value)});
    dispatch(getPartipantsByAge(filters));
    dispatch(getParticpantsByGender(filters));
    dispatch(getPartipantsByEthinicity(filters));
    dispatch(getTotalParticpants(filters));
    dispatch(getTrancheData(filters));
    dispatch(getHeadPWD(filters));
    dispatch(getOtherMemberPWD(filters));
    dispatch(getHouseHoldTrancheBaseline(filters));
    dispatch(getHouseHoldTrancheCurrent(filters));
    dispatch(getCsrHHRegistrationData(filters));
    dispatch(getHHConstructionType(filters));
    dispatch(getAverageEarning(filters));
    dispatch(getHouseholdShelterTargetProgress(filters));
    dispatch(getlivelihoodTrainingAttendanceTargetProgress(filters));

};

export const setSelectedDistricts = (districtSelected) => async (dispatch) => {
    dispatch({
        type: SELECTED_DISTRICTS,
        payload: {
            selected: districtSelected
        }
    });
};
export const setSelectedPalikas = (palikasSelected) => async (dispatch) => {
    dispatch({
        type: SELECTED_PALIKAS,
        payload: {
            selected: palikasSelected
        }
    });
};
export const setSelectedWards = (wardsSelected) => async (dispatch) => {
    dispatch({
        type: SELECTED_WARDS,
        payload: {
            selected: wardsSelected
        }
    });
};
export const setSelectedYearFilter = (years) => async (dispatch) => {
    dispatch({
        type: SELECTED_YEARS,
        payload: years
    });
};
export const setSelectedQuarterFilter = (quarters) => async (dispatch) => {
    dispatch({
        type: SELECTED_QUARTERS,
        payload: quarters
    });
};
export const getPalikas = (selectedDistricts) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crs/palikas/search', { districts: selectedDistricts.map((x) => x.value) });
        dispatch({
            type: GET_PALIKAS,
            payload: formatPalikas(response.data)
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getDistricts = () => async (dispatch) => {
    try {
        const response = await axiosServices.get('/crs/districts');
        dispatch({
            type: GET_DISTRICTS,
            payload: formatDistricts(response.data)
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getWards = (selectedPalikas) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crs/wards/search', { palikas: selectedPalikas.map((x) => x.value) });
        dispatch({
            type: GET_WARDS,
            payload: formatWards(response.data)
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getYears = () => async (dispatch) => {
    try {
        const response = await axiosServices.get('/crs/getHHYears');
        dispatch({
            type: YEARS,
            payload: formatYear( response.data.data[0].year)
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getPartipantsByAge = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crs/getPartipantsByAge', { filters });
        dispatch({
            type: GET_PARTICIPANTS_BY_AGE,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getParticpantsByGender = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crs/getParticpantsByGender', { filters });
        dispatch({
            type: GET_PARTICIPANTS_BY_GENDER,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getPartipantsByEthinicity = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crs/getPartipantsByEthinicity', { filters });
        dispatch({
            type: GET_PARTICIPANTS_BY_ETHINICITY,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getTotalParticpants = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crs/getTotalParticpants', { filters });
        dispatch({
            type: GET_PARTICIPANTS,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getCsrHHRegistrationData = (filters) => async (dispatch) => {
    try {
        // let filters;
        // if (type === 'district') {
        //     filters = { district: [filter] };
        // } else if (type === 'palika') {
        //     filters = { palika: [filter] };
        // }
        const response = await axiosServices.post('crs/hhRegistration/search', { filters });
        dispatch({
            type: CRS_HH_REGISTRATION_DATA,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getTrancheData = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('crs/getGovtTranchStatus/search', { filters });
        dispatch({
            type: CRS_TRANCHE_DATA,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getHeadPWD = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('crs/getHeadPWD', { filters });
        dispatch({
            type: HEAD_PWD,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getOtherMemberPWD = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('crs/getOtherMemberPWD', { filters });
        dispatch({
            type: OTHER_MEMBER_PWD,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getHouseHoldTrancheBaseline = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('crs/getHouseHoldTrancheBaseline', { filters });
        dispatch({
            type: HH_TRANCHE_BASELINE,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getHouseHoldTrancheCurrent = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('crs/getHouseHoldTrancheCurrent', { filters });
        dispatch({
            type: HH_TRANCHE_CURRENT,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getHHConstructionType = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('crs/getHousingConstructionType/search', { filters });
        dispatch({
            type: HH_CONSTRUCTION_TYPE,
            payload: response.data.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getAverageEarning = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('crs/getParticipantsAverageIncome', { filters });
        dispatch({
            type: HH_AVERAGE_EARN,
            payload: response.data.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getModelOneKpiGraph = () => async (dispatch) => {
    try {
        const response = await axiosServices.post('kpi/getmodelOne');
        dispatch({
            type: KPI_MODEL_ONE_DATA,
            payload: response.data?.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getModelTwoKpiGraph = () => async (dispatch) => {
    try {
        const response = await axiosServices.post('kpi/getmodeltwo');
        dispatch({
            type: KPI_MODEL_TWO_DATA,
            payload: response.data?.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getModelThreeKpiGraph = () => async (dispatch) => {
    try {
        const response = await axiosServices.post('kpi/getmodelthree');
        dispatch({
            type: KPI_MODEL_THREE_DATA,
            payload: response.data?.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getModelfourKpiGraph = () => async (dispatch) => {
    try {
        const response = await axiosServices.post('kpi/getModelLivelihood');
        dispatch({
            type: KPI_MODEL_FOUR_DATA,
            payload: response.data?.data
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const getModelfiveKpiGraph = () => async (dispatch) => {
    try {
        const response = await axiosServices.post('kpi/getModelWaterInfrastucture');
        dispatch({
            type: KPI_MODEL_FIVE_DATA,
            payload: response.data?.data
        });
    } catch (error) {
        throw new Error(error);
    }
}

export const setSectorSelected = (selected) => async (dispatch) => {
    try {
        dispatch({
            type: SECTOR_SELECTED,
            payload: selected

        });
    } catch (error) {
        throw new Error(error);
    }
};
export const setIndicatorSeleced = (selected) => async (dispatch) => {
    try {
        dispatch({
            type: INDICATOR_SELECTED,
            payload: selected
        });
    } catch (error) {
        throw new Error(error);
    }
};
