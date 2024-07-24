const { Rating, Book } = require("../models/book.js");

function findAll(req, res) {
  Book.findAll({ _id: req.params.id })
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
}
function findOne(req, res) {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
}
function findBestRated(req, res) {
  
}
function create(req, res) {

}

function update(req, res) {
  
}
function remove(req, res) {
  
}
function addRating(req, res) {
  
}

module.exports = {
  findAll,
  findOne,
  findBestRated,
  create,
  update,
  remove,
  addRating,
};
