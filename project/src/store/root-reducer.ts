import {combineReducers} from '@reduxjs/toolkit';
import {mainData} from './main-data/main-data';
import {propertyData} from './property-data/property-data';
import {userProcess} from './user-process/user-process';
import {favoriteData} from './favorite-data/favorite-data';

export enum NameSpace {
  main = 'MAIN',
  property = 'PROPERTY',
  user = 'USER',
  favorite = 'FAVORITE'
}

export  const rootReducer = combineReducers({
  [NameSpace.main]: mainData,
  [NameSpace.property]: propertyData,
  [NameSpace.user]: userProcess,
  [NameSpace.favorite]: favoriteData,
});

export type RootState = ReturnType<typeof rootReducer>;
