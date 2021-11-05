import {User} from './offer';

export type ReviewType = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export type ReviewListType = ReviewType [] | [];
