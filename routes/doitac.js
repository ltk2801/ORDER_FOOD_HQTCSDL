const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const dtController = require("../controllers/doitac");

router.get("/register/doitac", isAuth.authHaveUser, dtController.getRegisterDT);

router.post("/register/doitac", dtController.postRegisterDT);
