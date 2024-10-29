import axiosServices from "../utils/axios";
import { GET_HOUSEHOLD_SHELTER_TARGET_PROGRESS, GET_LIVELIHOOD_TRAINING_ATTENDANCE_TARGET_PROGRESS } from "./actionsv1";

export const getHouseholdShelterTargetProgress = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crsV1/householdShelterTargetProgress', { 
            filters
        });
        dispatch({
            type: GET_HOUSEHOLD_SHELTER_TARGET_PROGRESS,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};
export const getlivelihoodTrainingAttendanceTargetProgress = (filters) => async (dispatch) => {
    try {
        const response = await axiosServices.post('/crsV1/livelihoodTrainingAttendanceTargetProgress', { 
            filters
        });
        dispatch({
            type: GET_LIVELIHOOD_TRAINING_ATTENDANCE_TARGET_PROGRESS,
            payload: response.data
        });
    } catch (error) {
        throw new Error(error);
    }
};