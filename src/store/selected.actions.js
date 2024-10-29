import { SECTOR_SELECTED, SELECTED } from './actions';

export const getSelected = (selected) => async (dispatch) => {
    try {
        dispatch({
            type: SELECTED,
            payload: selected
        });
    } catch (error) {
        throw new Error(error);
    }
};

// export const getSectorSelected = (selected) => async (dispatch) => {
//     try {
//         dispatch({
//             type: SECTOR_SELECTED,
//             payload: selected
//         });
//     } catch (error) {
//         throw new Error(error);
//     }
// };