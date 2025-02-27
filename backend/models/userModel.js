const mongoose = require("mongoose");
//create schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }//ehde nl timestamo ajegi hrek document de piche basicallt created at and updated at ayega
);

//create model
const User = mongoose.model("User", userSchema);
module.exports = User;
