import { useSelector } from 'react-redux';
import axiosServices from '../utils/axios';
import { GET_DETAIL_USER_DATA } from './actions';
export const getCSRDataDetail = (caseId) => async (dispatch) => {
    try {
        const response = await axiosServices.get(`/crs/getCRSData/${caseId}`);
        dispatch({
            type: GET_DETAIL_USER_DATA,
            payload: response.data.data[0]
        });
    } catch (error) {
        throw new Error(error);
    }
};
