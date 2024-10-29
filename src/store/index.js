import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware, compose } from "redux";

import reducers from './reducers';

import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
  );
  

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

const persister = persistStore(store);

export { store, persister };
