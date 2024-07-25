const router = require("express").Router();

const {
  findAll,
  findById,
  create,
  findBestRated,
  remove,
  update,
  addRating,
} = require("../controllers/books.js");
const multerConfig = require("../middlewares/multerConfig.js");
const requireAuthentification = require("../middlewares/requireAuthentification.js");

router.get("/", findAll);
router.get("/:id", findById);
router.get("/bestrating", findBestRated);
router.post("/", requireAuthentification, multerConfig, create);
router.put("/:id", requireAuthentification, update);
router.delete("/:id", requireAuthentification, remove);
router.post("/:id/rating", requireAuthentification, addRating);

module.exports = router;
