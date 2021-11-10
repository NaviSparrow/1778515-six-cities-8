import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {composeWithDevTools} from 'redux-devtools-extension';
import {requireAuthorization} from './store/action';
import {createAPI} from './services/api';
import {ThunkAppDispatch} from './types/action';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {AuthorizationStatus} from './const';
import thunk from 'redux-thunk';
import {redirect} from './store/middlewares/redirect';
import {rootReducer} from './store/root-reducer';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
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
