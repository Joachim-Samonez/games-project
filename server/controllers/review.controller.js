import Review from "../models/review.model.js";
import { errorHandler } from "../utils/error.js";

export const createReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    return res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(errorHandler(404, "Review is not found!"));
  }

  if (req.user.id !== review.userRef) {
    return next(errorHandler(401, "You can only delete your own review!"));
  }

  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json("Review has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(errorHandler(404, "Review not found!"));
  }
  if (req.user.id !== review.userRef) {
    return next(errorHandler(401, "You can only update your own reviews!"));
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return next(errorHandler(404, "Review not found!"));
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const author = req.query.author;
    const query = author ? { author: author } : {};

    const reviews = await Review.find(query)
      .sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
