const multer = require("multer");

const IMAGE_FOLDER = "images";
const IMAGE_FIELD_NAME = "image";

const MIME_TYPES = {
  "image/jpg": ".jpg",
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

function removeExtension(fileName) {
  return fileName.substring(0, fileName.lastIndexOf("."));
}

const cleanRegex = /([\s]|[.])+/g;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, IMAGE_FOLDER);
  },
  filename: (req, file, callback) => {
    const cleanFileName = removeExtension(file.originalname).replaceAll(
      cleanRegex,
      "_"
    );
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${cleanFileName}_${Date.now()}${extension}`);
  },
});

const multerModule = (module.exports = multer({ storage }).single(
  IMAGE_FIELD_NAME
));
multerModule.IMAGE_FOLDER = IMAGE_FOLDER;
