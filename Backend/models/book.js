const { Schema, model, ObjectId } = require("mongoose");

const RatingSchema = new Schema({
  userId: { type: String, require: true },
  grade: { type: Number, require: true },
});

const Rating = model("Rating", RatingSchema);

const BookSchema = new Schema({
  userId: { type: String, require: true },
  title: { type: String, require: true },
  author: { type: String, require: true },
  imageUrl: { type: String, require: true },
  year: { type: Number, require: true },
  genre: { type: String, require: true },
  ratings: {
    type: ObjectId,
    ref: "Rating",
  },
  averageRating: { type: Number, require: true },
});

const Book = model("Book", BookSchema);

module.exports = {
  Rating,
  Book,
};
