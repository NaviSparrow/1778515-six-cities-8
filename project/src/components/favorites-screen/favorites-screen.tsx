import FavoritesOffersList from '../favorites-offers-list/favorites-offers-list';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import FavoritesScreenEmpty from '../favorites-screen-empty/favorites-screen-empty';
import ScreenHeader from '../header/screen-header';

const mapStateToProps = ({offerList}: State) => ({
  offerList,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesScreen({offerList}: PropsFromRedux):JSX.Element {
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

      <div className="page">
        <ScreenHeader />

        <main className={`page__main page__main--favorites ${offerList.length === 0 ? 'page__main--favorites-empty': ''}`}>
          <div className="page__favorites-container container">
            {offerList.length !== 0
              ? <FavoritesOffersList offersList={offerList.filter((offer) => offer.isFavorite)} />
              : <FavoritesScreenEmpty />};
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </a>
        </footer>
      </div>
    </>
  );
}

export default connector(FavoritesScreen);
