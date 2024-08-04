const { Schema, model, ObjectId } = require("mongoose");

const RatingSchema = new Schema({
  userId: { type: String, require: true },
  grade: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
  },
});

const Rating = model("Rating", RatingSchema);

function ratingsValids(ratings) {
  const idsRead = [];
  for (const rating of ratings) {
    if (idsRead.includes(rating.userId)) {
      return false;
    }
  }
  return true;
}

const BookSchema = new Schema({
  userId: { type: String, require: true },
  title: { type: String, require: true },
  author: { type: String, require: true },
  imageUrl: { type: String, require: true },
  year: {
    type: Number,
    require: true,
    validate: {
      validator: (year) => year <= new Date().getFullYear(),
      message: "La date est invalide",
    },
  },
  genre: { type: String, require: true },
  ratings: {
    type: [RatingSchema],
    require: true,
    default: [],
    validate: {
      validator: ratingsValids,
      message: "Livre déjà noté",
    }, 
  },
  averageRating: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
    default: 0
  },
});

const Book = model("Book", BookSchema);

module.exports = {
  Rating,
  Book,
};
