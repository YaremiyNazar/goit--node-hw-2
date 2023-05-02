const express = require("express");

const { schemas } = require("../../models/contact");
const { validateData, validateDataFavorite } = require("../../utils");
const { isValidContactId, authenticate} = require("../../middlewares");

const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");

router.get("/", authenticate, contactsController.listContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidContactId,
  contactsController.getContactById
);

router.post(
  "/", 
  authenticate,
  validateData(schemas.contactsSchema),
  contactsController.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidContactId,
  contactsController.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidContactId,
  validateData(schemas.contactsSchema),
  contactsController.updateContact
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidContactId,
  validateDataFavorite(schemas.favoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
