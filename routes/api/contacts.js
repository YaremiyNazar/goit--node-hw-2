const express = require("express");

const {schemas} = require("../../models/contact");
const { validateData, validateDataFavorite } = require("../../utils");
const {isValidContactId} = require("../../middlewares")

const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");

router.get("/", contactsController.listContacts);

router.get("/:contactId", isValidContactId, contactsController.getContactById);

router.post(
  "/",
  validateData(schemas.contactsSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidContactId, contactsController.removeContact);

router.put(
  "/:contactId", isValidContactId,
  validateData(schemas.contactsSchema),
  contactsController.updateContact
);
router.patch("/:contactId/favorite",isValidContactId, validateDataFavorite(schemas.favoriteSchema), contactsController.updateStatusContact)

module.exports = router;
