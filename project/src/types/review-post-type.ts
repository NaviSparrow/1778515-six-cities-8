type CommentType = string;
type RatingType = number;

export type ReviewPostType = {
  comment: CommentType,
  rating: RatingType,
  id?: number,
}
