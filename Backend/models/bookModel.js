const { Schema, model, ObjectId } = require("mongoose");

const RatingSchema = new Schema({
  userId: { type: String, required: true },
  grade: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

const Rating = model("Rating", RatingSchema);

function ratingsValids(ratings) {
  console.log("!!!!", ratings);
  const idsRead = [];
  for (const rating of ratings) {
    if (idsRead.includes(rating.userId)) {
      return false;
    } else {
      idsRead.push(rating.userId);
    }
  }
  return true;
}

const BookSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: {
    type: Number,
    required: true,
    validate: {
      validator: (year) => year <= new Date().getFullYear(),
      message: "La date est invalide",
    },
  },
  genre: { type: String, required: true },
  ratings: {
    type: [RatingSchema],
    required: true,
    default: [],
    validate: {
      validator: ratingsValids,
      message: "Livre déjà noté",
    },
  },
  averageRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
});

const Book = model("Book", BookSchema);

module.exports = {
  Rating,
  Book,
};
