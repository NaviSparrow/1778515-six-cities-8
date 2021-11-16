import FavoritesOffersList from '../favorites-offers-list/favorites-offers-list';
import FavoritesScreenEmpty from '../favorites-screen-empty/favorites-screen-empty';
import {getFavoritesOfferList} from '../../store/favorite-data/selectors';
import {useSelector} from 'react-redux';

function FavoritesMainContent():JSX.Element {
  const favoritesOfferList = useSelector(getFavoritesOfferList);
  return (
    <main className={`page__main page__main--favorites ${favoritesOfferList.length === 0 ? 'page__main--favorites-empty': ''}`}>
      <div className="page__favorites-container container">
        {favoritesOfferList.length !== 0
          ? <FavoritesOffersList offersList={favoritesOfferList} />
          : <FavoritesScreenEmpty />};
      </div>
    </main>
  );
}

export default FavoritesMainContent;
