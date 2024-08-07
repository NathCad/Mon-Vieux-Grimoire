const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ERROR_MESSAGE = "Email et/ou mot de passe incorrects";

const PASSWORD_VALIDATION_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W])(?=.*).{8,}$/g;

function signup(req, res) {
  const password = req.body.password;
  if (!password || !PASSWORD_VALIDATION_REGEX.test(password)) {
    return res
      .status(400)
      .json({
        error:
          "Le password est invalide, une longueur de 8 minimum, une minuscule, une majuscule, un nombre et un caractère spécial sont requis.",
      });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}
function login(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: ERROR_MESSAGE });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isValid) => {
          if (!isValid) {
            return res.status(401).json({ message: ERROR_MESSAGE });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}
module.exports = {
  signup,
  login,
};
