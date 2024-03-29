import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    pc: {
      type: Boolean,
      required: true,
    },
    playstation: {
      type: Boolean,
      required: true,
    },
    xbox: {
      type: Boolean,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
