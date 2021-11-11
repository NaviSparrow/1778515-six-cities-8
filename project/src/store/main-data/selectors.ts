import {State} from '../../types/state';
import {CityType, OfferListType} from '../../types/offer';
import {NameSpace} from '../root-reducer';

export const getCity = (state: State): CityType => state[NameSpace.main].city;
export const getOfferList = (state: State): OfferListType => state[NameSpace.main].offerList;
export const getLoadedDataStatus = (state: State):boolean => state[NameSpace.main].isDataLoaded;
