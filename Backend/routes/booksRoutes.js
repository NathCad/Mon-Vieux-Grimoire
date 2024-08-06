const router = require("express").Router();

const multer = require("multer");
const {
  findAll,
  findById,
  create,
  findBestRated,
  remove,
  update,
  addRating,
} = require("../controllers/booksController.js");
const requireAuthentification = require("../middlewares/requireAuthentification.js");
const sharp = require("../middlewares/sharp.js");

const storage = multer.memoryStorage();
const multerMiddleware = multer({ storage }).single("image")

router.get("/", findAll);
//Attention à l'ordre des routes rique de confusion avec findById si /:id est en premier
router.get("/bestrating", findBestRated);
router.get("/:id", findById);
router.post("/", requireAuthentification, multerMiddleware, sharp, create);
router.put("/:id", requireAuthentification, multerMiddleware, sharp, update);
router.delete("/:id", requireAuthentification, remove);
router.post("/:id/rating", requireAuthentification, addRating);

module.exports = router;
