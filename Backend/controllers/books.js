const { Rating, Book } = require("../models/book.js");

function findAll(req, res) {
  Book.findAll({ _id: req.params.id })
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
}
function findById(req, res) {
  Book.findById(req.params.id)
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
}
function findBestRated(req, res) {
  
}
function create(req, res) {
  //récupérer le book
  const postBook = JSON.parse(req.body.book)
  //delete l'id de la req car on va utiliser celui de l'authentification
  //car on est sur que c'est l'id que nous avons mis dans le token
  delete postBook.userId;
  //delete l'id mongo, s'il y en a un, car sinon doublon en base
  delete postBook._id;
}

function update(req, res) {
  
}
function remove(req, res) {
  //Controler le 
}
function addRating(req, res) {
  
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
