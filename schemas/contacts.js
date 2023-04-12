const joi = require("joi");
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
});
module.exports = {
  contactsSchema,
};
