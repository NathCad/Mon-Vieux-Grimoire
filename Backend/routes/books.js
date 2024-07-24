const router = require("express").Router();

const {
  findAll,
  findOne,
  create,
  findBestRated,
  remove,
  update,
  addRating,
} = require("../controllers/books.js");

router.get("/", findAll);
router.get("/:id", findOne);
router.get("/bestrating", findBestRated);
router.post("/books", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.post(":id/rating", addRating);

module.exports = router;
