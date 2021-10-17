import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {offers} from './mocks/offers';

const Setting = {
  OFFERS_COUNT: offers.length,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      offersCount = {Setting.OFFERS_COUNT}
      offers = {offers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
