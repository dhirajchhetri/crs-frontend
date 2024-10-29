import { GET_HOUSEHOLD_SHELTER_TARGET_PROGRESS, GET_LIVELIHOOD_TRAINING_ATTENDANCE_TARGET_PROGRESS } from "./actionsv1";

export const initialState={
    household_shelter_target_progress:[],
    livelihood_training_attendance_target_progress:[]
}

const dashboardReducerv1 = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOUSEHOLD_SHELTER_TARGET_PROGRESS: {
            const { data } = action.payload;
            return {
                ...state,
                household_shelter_target_progress: data
            };
        }
        case GET_LIVELIHOOD_TRAINING_ATTENDANCE_TARGET_PROGRESS: {
            const { data } = action.payload;
            return {
                ...state,
                livelihood_training_attendance_target_progress: data
            };
        }
        default: {
            return { ...state };
        }
    }

}

export default dashboardReducerv1

