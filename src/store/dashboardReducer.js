import { performanceIndicators, sectors } from '../config/constant';
import {
    GET_DISTRICTS,
    SELECTED_DISTRICTS,
    GET_PALIKAS,
    SELECTED_PALIKAS,
    GET_PARTICIPANTS_BY_GENDER,
    GET_PARTICIPANTS,
    GET_PARTICIPANTS_BY_AGE,
    GET_PARTICIPANTS_BY_ETHINICITY,
    CRS_HH_REGISTRATION_DATA,
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
    SELECTED_WARDS,
    GET_WARDS,
    KPI_MODEL_ONE_DATA,
    KPI_MODEL_TWO_DATA,
    KPI_MODEL_THREE_DATA,
    KPI_MODEL_FOUR_DATA,
    KPI_MODEL_FIVE_DATA,
    SECTOR_SELECTED,
    INDICATOR_SELECTED,
} from './actions';

export const initialState = {
    districts: [],
    palikas: [],
    wards: [],
    selectedDistricts: [],
    selectedPalikas: [],
    selectedWards: [],
    PARTICIPANTS_BY_AGE: [],
    PARTICIPANTS_BY_GENDER: [],
    PARTICIPANTS_BY_ETHINICITY: [],
    PARTICIPANTS: [],
    csrHHRegistrationData: [],
    tranche_data: [],
    head_pwd: [],
    other_member_pwd: [],
    hh_tranche_baseline: [],
    hh_tranche_current: [],
    years: [],
    selectedYears: [],
    selectedQuarters: [],
    hh_construction_type: [],
    average_earning: [],
    kpi_model_one_data: [],
    kpi_model_two_data: [],
    kpi_model_three_data: [],
    kpi_model_four_data: [],
    kpi_model_five_data: [],
    tranche_data:[],
    head_pwd:[],
    other_member_pwd:[],
    hh_tranche_baseline:[],
    hh_tranche_current:[],
    years:[],
    selectedYears:[],
    selectedQuarters:[],
    hh_construction_type:[],
    average_earning: [],
    selectedSector:[], 
    selectedIndicator:performanceIndicators[0]

};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DISTRICTS: {
            const { json } = action.payload;
            return {
                ...state,
                districts: json
            };
        }
        case GET_PALIKAS: {
            const { json } = action.payload;
            return {
                ...state,
                palikas: json
            };
        }
        case GET_WARDS: {
            const { json } = action.payload;
            return {
                ...state,
                wards: json
            };
        }
        case SELECTED_DISTRICTS: {
            const { selected } = action.payload;
            return {
                ...state,
                selectedDistricts: selected
            };
        }
        case SELECTED_PALIKAS: {
            const { selected } = action.payload;
            return {
                ...state,
                selectedPalikas: selected
            };
        }
        case SELECTED_WARDS: {
            const { selected } = action.payload;
            return {
                ...state,
                selectedWards: selected
            };
        }
        case GET_PARTICIPANTS_BY_AGE: {
            const { data } = action.payload;
            return {
                ...state,
                PARTICIPANTS_BY_AGE: data
            };
        }
        case GET_PARTICIPANTS_BY_GENDER: {
            const { data } = action.payload;
            return {
                ...state,
                PARTICIPANTS_BY_GENDER: data
            };
        }
        case GET_PARTICIPANTS_BY_ETHINICITY: {
            const { data } = action.payload;
            return {
                ...state,
                PARTICIPANTS_BY_ETHINICITY: data
            };
        }
        case GET_PARTICIPANTS: {
            const { data } = action.payload;
            return {
                ...state,
                PARTICIPANTS: data
            };
        }
        case CRS_HH_REGISTRATION_DATA: {
            const { data } = action.payload;
            return {
                ...state,
                csrHHRegistrationData: data
            };
        }
        case CRS_TRANCHE_DATA: {
            const { data } = action.payload;
            return {
                ...state,
                tranche_data: data
            };
        }
        case HEAD_PWD: {
            const { data } = action.payload;
            return {
                ...state,
                head_pwd: data
            };
        }
        case OTHER_MEMBER_PWD: {
            const { data } = action.payload;
            return {
                ...state,
                other_member_pwd: data
            };
        }
        case HH_TRANCHE_BASELINE: {
            const { data } = action.payload;
            return {
                ...state,
                hh_tranche_baseline: data
            };
        }
        case HH_TRANCHE_CURRENT: {
            const { data } = action.payload;
            return {
                ...state,
                hh_tranche_current: data
            };
        }
        case YEARS: {
            const data = action.payload;
            return {
                ...state,
                years: data
                
            };
        }
        case SELECTED_YEARS: {
            const data = action.payload;
            return {
                ...state,
                selectedYears: data
            };
        }
        case SELECTED_QUARTERS: {
            const data = action.payload;
            return {
                ...state,
                selectedQuarters: data
            };
        }
        case HH_CONSTRUCTION_TYPE: {
            const data = action.payload;
            return {
                ...state,
                hh_construction_type: data
            };
        }
        case HH_AVERAGE_EARN: {
            const data = action.payload;
            return {
                ...state,
                average_earning: data
            };
        }
        case KPI_MODEL_ONE_DATA: {
            const data = action.payload;
            return {
                ...state,
                kpi_model_one_data: data
            };
        }
        case KPI_MODEL_TWO_DATA: {
            const data = action.payload;
            return {
                ...state,
                kpi_model_two_data: data
            };
        }
        case KPI_MODEL_THREE_DATA: {
            const data = action.payload;
            return {
                ...state,
                kpi_model_three_data: data
            };
        }
        case KPI_MODEL_FOUR_DATA: {
            const data = action.payload;
            return {
                ...state,
                kpi_model_four_data: data
            };
        }
        case KPI_MODEL_FIVE_DATA: {
            const data = action.payload;
            return {
                ...state,
                kpi_model_five_data: data
            };
        }
        case SECTOR_SELECTED: {
            const data = action.payload;
            return {
                ...state,
                selectedSector: data
            };
        }
        case INDICATOR_SELECTED: {
            const data = action.payload;
            return {
                ...state,
                selectedIndicator: data
            };
        }

        default: {
            return { ...state };
        }
    }
};

export default dashboardReducer;
