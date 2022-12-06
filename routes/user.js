const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const userController = require("../controllers/user");

router.get("/register", isAuth.authHaveUser, userController.getRegister);

router.get("/login", isAuth.authHaveUser, userController.getLogin);

router.post("/login", userController.postLogin);

router.post("/logout", userController.postLogout);

module.exports = router;
