const { IMAGE_FOLDER } = require("../middlewares/multerConfig.js");

function getFileUrl(req) {
  if (!req.file) {
    return null;
  }
  return `${req.protocol}://${req.get("host")}/${IMAGE_FOLDER}/${
    req.file.filename
  }`;
}

function computeAverageRating(ratings) {
  let totalRatings = 0;
  for (const rating of ratings) {
    totalRatings += rating.grade;
  }
  return totalRatings / ratings.length;
}

module.exports = {
  getFileUrl,
  computeAverageRating,
};
