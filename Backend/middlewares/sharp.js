const sharp = require("sharp");
const { getFileUrl } = require("../utils/utils");

const cleanRegex = /([\s]|[.])+/g;

const IMAGE_FOLDER = "images";

function removeExtension(fileName) {
    return fileName.substring(0, fileName.lastIndexOf("."));
  }

const sharpConfig = async (req, res, next) => {
  if (req.file) {
    const { buffer, originalname } = req.file;
    const cleanFileName = removeExtension(originalname).replaceAll(
      cleanRegex,
      "_"
    );
    const fileName = `${Date.now()}-${cleanFileName}.webp`;
    await sharp(buffer)
      .webp({ quality: 70 })
      .toFile(IMAGE_FOLDER + "/" + fileName);
    const link = getFileUrl(
      req.protocol,
      req.get("host"),
      IMAGE_FOLDER,
      fileName
    );
    req.imageUrl = link;
    next();
  }
};
const sharpModule = (module.exports = sharpConfig);
sharpModule.IMAGE_FOLDER = IMAGE_FOLDER;