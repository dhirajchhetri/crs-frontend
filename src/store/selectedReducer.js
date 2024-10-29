import { SECTOR_SELECTED, SELECTED } from './actions';

export const initialState = {
    selected: {
        currentSelected: undefined,
        type: 'nepal',
        previousSelected: undefined,
        label: 'नेपाल',
        selectedProvince: undefined,
        selectedDistrict: undefined,
        selectedLGP: undefined
    },
    // sectorSelected: 'livelihood',
};

const selectedReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECTED: {
            const json = action.payload;
            return {
                ...state,
                selected: json
            };
        }
        break;
        // case SECTOR_SELECTED:{
        //     const json = action.payload;
        //     return {
        //         ...state,
        //         sectorSelected: json
        //     };
        // }
        break
        default: {
            return { ...state };
        }
    }
};

export default selectedReducer;
