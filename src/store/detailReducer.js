import { GET_DETAIL_USER_DATA } from './actions';

export const initialState = {
    detailData: []
};

const detailDataReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case GET_DETAIL_USER_DATA: {
            const json = action.payload;
            console.log(json, 'this is json');
            return {
                ...state,
                detailData: json
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default detailDataReducer;
