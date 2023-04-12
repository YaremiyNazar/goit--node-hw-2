const { HttpError } = require("../helpers");
const validateData = (contactsSchema) => {
  const func = (req, res, next) => {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
      next();
  }
    return func
};
module.exports = validateData;