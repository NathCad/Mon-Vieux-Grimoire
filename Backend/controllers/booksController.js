const { Rating, Book } = require("../models/bookModel.js");
const { IMAGE_FOLDER } = require("../middlewares/sharp.js");
const { getFileUrl, computeAverageRating } = require("../utils/utils.js");
const fs = require("fs");

const FORBIDDEN_ERROR_MESSAGE = "403: unauthorized request";

function deleteImage(imageUrl) {
  if (!imageUrl) {
    return;
  }
  //supprimer l'image à partir de imageUrl
  const filePathParts = imageUrl.split("/");
  const filePath = IMAGE_FOLDER + "/" + filePathParts[filePathParts.length - 1];
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function findAll(req, res) {
  Book.find({})
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(500).json({ error }));
}

async function findById(req, res) {
  try {
    const foundBook = await Book.findById(req.params.id);
    if (!foundBook) {
      return res.sendStatus(404);
    }
    return res.status(200).json(foundBook);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

async function findBestRated(req, res) {
  try {
    const bestRated = await Book.find({})
      .sort({ averageRating: -1 })
      .limit(3)
      .exec();
    return res.status(200).json(bestRated);
    //dans le cas ou mongodb a planté
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function create(req, res) {
  //récupérer le book
  try {
    const bodyBook = JSON.parse(req.body.book);
    //créer un nouveau book
    const book = new Book({
      userId: req.auth.userId,
      title: bodyBook.title,
      author: bodyBook.author,
      imageUrl: req.imageUrl,
      year: bodyBook.year,
      genre: bodyBook.genre,
    });
    await book.save();
    return res.status(200).json({ message: "Book créé" });
  } catch (error) {
    deleteImage(req.imageUrl);
    res.status(400).json({ error });
  }
}

async function update(req, res) {
  const bodyBook = req.file ? JSON.parse(req.body.book) : req.body;
  const newImageUrl = req.imageUrl;
  const savedBook = await Book.findById(req.params.id).exec();
  if (!savedBook) {
    return res.sendStatus(404);
  }
  const currentImageUrl = savedBook.imageUrl;
  //controler le user id
  if (req.auth.userId !== savedBook.userId) {
    return res.status(403).json({ error: FORBIDDEN_ERROR_MESSAGE });
  }
  //creer ton new book et le save
  try {
    savedBook.title = bodyBook.title;
    savedBook.author = bodyBook.author;
    if (newImageUrl) {
      savedBook.imageUrl = newImageUrl;
    }
    savedBook.year = bodyBook.year;
    savedBook.genre = bodyBook.genre;
    await savedBook.save();
    if(newImageUrl) {
      deleteImage(currentImageUrl);
    }
    return res.status(200).json({ message: "Book mis à jour" });
  } catch (error) {
    deleteImage(newImageUrl);
    return res.status(400).json({ error });
  }
}

async function remove(req, res) {
  //recuperer le book
  const savedBook = await Book.findById(req.params.id).exec();
  if (!savedBook) {
    return res.sendStatus(404);
  }
  //controler le user id
  if (req.auth.userId !== savedBook.userId) {
    return res.status(403).json({ error: FORBIDDEN_ERROR_MESSAGE });
  }
  //effacer le book
  await Book.deleteOne({ _id: req.params.id });
  deleteImage(savedBook.imageUrl);
  return res.status(200).json({ message: "Book supprimé" });
}

async function addRating(req, res) {
  try {
    const savedBook = await Book.findById(req.params.id).exec();
    if (!savedBook) {
      return res.sendStatus(404);
    }
    savedBook.ratings.push(
      new Rating({ userId: req.auth.userId, grade: req.body.rating })
    );
    savedBook.averageRating = computeAverageRating(savedBook.ratings);
    await savedBook.save();
    return res.status(200).json(savedBook);
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  findAll,
  findById,
  findBestRated,
  create,
  update,
  remove,
  addRating,
};
