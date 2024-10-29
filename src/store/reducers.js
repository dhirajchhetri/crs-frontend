import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dashboardReducer from './dashboardReducer';
import detailDataReducer from './detailReducer';
import selectedReducer from './selectedReducer';
import dashboardReducerv1 from './dashboardReducerv1';

const reducers = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'datta-'
        },
        accountReducer
    ),
    dashboardReducer,
    dashboardReducerv1,
    detailDataReducer,
    selectedReducer,
    form: formReducer
});

export default reducers;
