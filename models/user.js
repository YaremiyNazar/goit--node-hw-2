const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");
const joi = require("joi");

const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    }
  },
  { versionKey: false }
);

userSchema.post("save", mongooseError);

const userRegistrationSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
  subscription: joi.string(),
});

const userLoginSchema = joi.object({
  email: joi.string().pattern(emailRegexp).required(),
  password: joi.string().min(6).required(),
});

const userEmailSchema = joi.object({
   email: joi.string().pattern(emailRegexp).required(),
})

const schemas = {
  userRegistrationSchema,
  userLoginSchema,
  userEmailSchema,

};
const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
