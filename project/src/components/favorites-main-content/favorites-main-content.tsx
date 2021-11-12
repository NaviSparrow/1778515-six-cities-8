import FavoritesOffersList from '../favorites-offers-list/favorites-offers-list';
import FavoritesScreenEmpty from '../favorites-screen-empty/favorites-screen-empty';
import {State} from '../../types/state';
import {getFavoritesOfferList} from '../../store/favorite-data/selectors';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: State) => ({
  favoritesOfferList: getFavoritesOfferList(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FavoritesMainContent(props: PropsFromRedux):JSX.Element {
  const {favoritesOfferList} = props;
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

export {FavoritesScreenEmpty};
export default connector(FavoritesMainContent);
