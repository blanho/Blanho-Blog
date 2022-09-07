const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your First Name"],
    minLength: 2,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your Last Name"],
    minLength: 2,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["author", "admin"],
    default: "author",
  },
  verificationToken: {
    type: String,
  },
  verified: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passwordToken: {
    type: String,
  },
  tokenExpirationDate: {
    passwordTokenExpiration: {
      type: String,
    },
    emailTokenExpiration: {
      type: String,
    },
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
