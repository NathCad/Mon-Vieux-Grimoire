const { Rating, Book } = require("../models/book.js");
const { IMAGE_FOLDER } = require("../middlewares/multerConfig.js");

function findAll(req, res) {
  Book.find({})
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
}

function findById(req, res) {
  Book.findById(req.params.id)
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
}

function findBestRated(req, res) {}

function create(req, res) {
  //récupérer le book
  console.log(req.body);
  try {
    const postBook = JSON.parse(req.body.book);
    //créer un nouveau book
    const book = new Book({
      userId: req.auth.userId,
      title: postBook.title,
      author: postBook.author,
      imageUrl: `${req.protocol}://${req.get("host")}/${IMAGE_FOLDER}/${
        req.file.filename
      }`,
      year: postBook.year,
      genre: postBook.genre,
      ratings: [],
      averageRating: 0,
    });
    book
      .save()
      .then(() => res.status(201).json({ message: "Book créé" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(400).json({ error });
  }
}

function update(req, res) {}

function remove(req, res) {
  //Controler le
}
function addRating(req, res) {}

module.exports = {
  findAll,
  findById,
  findBestRated,
  create,
  update,
  remove,
  addRating,
};
