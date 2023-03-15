const express = require("express");
const authRouter = express.Router();
const { AuthController } = require("../controllers");

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);

module.exports = authRouter;