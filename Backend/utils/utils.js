function getFileUrl(protocol, host, imageFolder, fileName) {
  return `${protocol}://${host}/${imageFolder}/${fileName}`;
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
