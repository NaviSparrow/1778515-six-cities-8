import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';

export const getFavoritesOfferList = (state: State) => state[NameSpace.favorite].favoritesOfferList;
