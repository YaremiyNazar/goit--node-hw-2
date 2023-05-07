const express = require("express");
const { validateData, validateDataEmail } = require("../../utils");
const { schemas } = require("../../models/user");
const authController = require("../../controllers/auth-controllers");
const {authenticate, upload } = require("../../middlewares")

const router = express.Router();
router.post("/register", validateData(schemas.userRegistrationSchema), authController.register);
router.post("/login", validateData(schemas.userLoginSchema), authController.login);
router.get("/current", authenticate, authController.current);
router.post("/logout", authenticate, authController.logout);
router.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);
router.get("/verify/:verificationToken", authController.verifyEmail);
router.post("/verify", validateDataEmail(schemas.userEmailSchema), authController.resendVerifyEmail);

module.exports = router;