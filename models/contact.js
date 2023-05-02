const { Schema, model } = require("mongoose");
const { mongooseError } = require("../helpers");
const joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
 
  },
  { versionKey: false }
);

const contactsSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: joi.boolean(),

});

const favoriteSchema = joi.object({
  favorite: joi.boolean().required().messages({
    "any.required": "favorite must be true or false",
  }),
});

const schemas = {
  contactsSchema,
  favoriteSchema,

};

contactSchema.post("save", mongooseError);
const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
