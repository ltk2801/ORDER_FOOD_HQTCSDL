const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const txController = require("../controllers/taixe");

router.get("/register/taixe", isAuth.authHaveUser, txController.getRegisterTX);

router.post("/register/taixe", txController.postRegisterTX);
