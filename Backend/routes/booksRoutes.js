const router = require("express").Router();

const {
  findAll,
  findById,
  create,
  findBestRated,
  remove,
  update,
  addRating,
} = require("../controllers/booksController.js");
const multerConfig = require("../middlewares/multerConfig.js");
const requireAuthentification = require("../middlewares/requireAuthentification.js");

router.get("/", findAll);
//Attention à l'ordre des routes rique de confusion avec findById si /:id est en premier
router.get("/bestrating", findBestRated);
router.get("/:id", findById);
router.post("/", requireAuthentification, multerConfig, create);
router.put("/:id", requireAuthentification, multerConfig, update);
router.delete("/:id", requireAuthentification, remove);
router.post("/:id/rating", requireAuthentification, addRating);

module.exports = router;
