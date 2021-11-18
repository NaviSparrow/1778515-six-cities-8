import React from 'react';

type CommentType = string;
type RatingType = number;

export type ReviewPostType = {
  comment: CommentType,
  rating: RatingType,
  id?: number,
};

export type ActionsOnFormSubmit = {
  onSuccessResetForm: () => void
  setDisableForm: React.Dispatch<React.SetStateAction<boolean>>
};
