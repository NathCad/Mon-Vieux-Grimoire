const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
});

const USer = model("User", UserSchema);

module.exports = User;
