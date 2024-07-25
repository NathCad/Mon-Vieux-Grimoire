const { Schema, model, ObjectId } = require("mongoose");

const ratingSchema = new Schema({
  userId: { type: String, require: true },
  grade: { type: Number, require: true },
});

const Rating = model("Rating", ratingSchema);

const bookSchema = new Schema({
  userId: { type: String, require: true },
  title: { type: String, require: true },
  author: { type: String, require: true },
  imageUrl: { type: String, require: true },
  year: { type: Number, require: true },
  genre: { type: String, require: true },
  ratings: [{
    type: ObjectId,
    ref: "Rating",
  }],
  averageRating: { type: Number, require: true },
});

const Book = model("Book", bookSchema);

module.exports = {
  Rating,
  Book,
};
