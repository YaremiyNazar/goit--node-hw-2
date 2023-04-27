const express = require("express");
const { validateData } = require("../../utils");
const { schemas } = require("../../models/user");
const authController = require("../../controllers/auth-controllers");


const {authenticate} = require("../../middlewares")


const router = express.Router();
router.post("/register", validateData(schemas.userRegistrationSchema), authController.register);
router.post("/login", validateData(schemas.userLoginSchema), authController.login);
router.get("/current", authenticate, authController.current);
router.post("/logout", authenticate, authController.logout);

module.exports = router;