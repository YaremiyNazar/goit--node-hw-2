const express = require("express");

const contactsSchema = require("../../schemas/contacts");
const { validateData } = require("../../utils");

const router = express.Router();
const contactsController = require("../../controllers/contacts-controllers");

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateData(contactsSchema.contactsSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.removeContact);

router.put(
  "/:contactId",
  validateData(contactsSchema.contactsSchema),
  contactsController.updateContact
);

module.exports = router;
