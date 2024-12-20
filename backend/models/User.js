const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    mssv: {
      type: String,
      require: true,
      minlength: 1,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      minlength: 1,
      unique: true,
    },
    name: {
      type: String,
      minlength: 1,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 1,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
