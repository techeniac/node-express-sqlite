const express = require("express");
const usersRouter = express.Router();
const { UsersController } = require("../controllers");
const { AuthMiddleware } = require('../middleware');

usersRouter.get("/", UsersController.get);
usersRouter.get("/all", UsersController.getAll);
usersRouter.get("/:id", UsersController.show);
usersRouter.post("/", UsersController.store);
usersRouter.put("/:id", AuthMiddleware.verifyToken, UsersController.update);
usersRouter.put("/:id/soft-delete", UsersController.softDelete);
usersRouter.put("/:id/restore", UsersController.restore);
usersRouter.delete("/:id", UsersController.destroy);

module.exports = usersRouter;