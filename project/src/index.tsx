import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {requireAuthorization} from './store/action';
import {createAPI} from './services/api';
import {ThunkAppDispatch} from './types/action';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {AuthorizationStatus} from './const';
import thunk from 'redux-thunk';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunk.withExtraArgument(api)),
  ));
(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
