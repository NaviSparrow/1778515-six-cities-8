import OffersList from '../offers-list/offers-list';
import CitiesList from '../cities-list/cities-list';
import {useDispatch, useSelector} from 'react-redux';
import {changeCity} from '../../store/action';
import MainScreenEmpty from '../main-screen-empty/main-screen-empty';
import {filterOffersByCity} from '../../const';
import Header from '../header/header';
import Map from '../map/map';
import React, {useState} from 'react';
import {CityType, Offer} from '../../types/offer';
import {getCity, getOfferList} from '../../store/main-data/selectors';

function MainScreen(): JSX.Element {
  const city = useSelector(getCity);
  const offerList = useSelector(getOfferList);
  const dispatch = useDispatch();

  const onChangeCity = (cityName: CityType) => {
    dispatch(changeCity(cityName));
  };
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const currentOffers = filterOffersByCity(offerList, city);
  const styleForMap = '762px';
  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="icon-arrow-select" viewBox="0 0 7 4">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path>
          </symbol>
          <symbol id="icon-bookmark" viewBox="0 0 17 18">
            <path
              d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"
            >
            </path>
          </symbol>
          <symbol id="icon-star" viewBox="0 0 13 12">
            <path fillRule="evenodd" clipRule="evenodd"
              d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
            >
            </path>
          </symbol>
        </svg>
      </div>

      <div className="page page--gray page--main">
        <Header />

        <main className={`page__main page__main--index ${currentOffers.length === 0 ? 'page__main--index-empty': ''}`}>
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                activeCity={city}
                onChangeCity={onChangeCity}
              />
            </section>
          </div>
          <div className="cities">
            <div className={`cities__places-container ${currentOffers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
              {currentOffers.length !== 0
                ? <OffersList city={city} offerList={currentOffers} onActiveOfferChange={setActiveOffer} />
                : <MainScreenEmpty city={city} />};
              <div className="cities__right-section">
                {currentOffers.length !== 0
                  ? <section className="cities__map map"><Map offers={currentOffers} activeOffer={activeOffer} styleForMap={styleForMap} /></section>
                  : ''};
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default MainScreen;
