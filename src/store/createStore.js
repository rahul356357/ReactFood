import { createStore, compose, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { default as reduxThunk } from 'redux-thunk';
import api from '../api/api';
import rootReducer from './rootReducer';

const middlewares = [
  reduxPackMiddleware,
  reduxThunk.withExtraArgument({ api }),
].filter(Boolean);

const storeEnhancers = [
  applyMiddleware(...middlewares),
  __LOCAL__ && window.devToolsExtension && window.devToolsExtension(),
].filter(Boolean);

const persistConfig = {
  key: 'test_key',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (initialState={}) => {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(...storeEnhancers),
  );
  return store;
};
