import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {reducer} from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {offers} from './mocks/offers';
import {fillOffersList} from './store/action';

const store = createStore(reducer, composeWithDevTools());
store.dispatch(fillOffersList(offers));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
