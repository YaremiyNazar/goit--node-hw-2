const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

isValidContactId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(404, `${contactId}  has an invalid format `));
  }
  next();
};
module.exports = isValidContactId;
