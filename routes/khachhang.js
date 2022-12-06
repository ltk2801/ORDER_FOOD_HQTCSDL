const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const khController = require("../controllers/khachhang");

router.get(
  "/register/khachhang",
  isAuth.authHaveUser,
  khController.getRegisterKH
);

router.post("/register/khachhang", khController.postRegisterKH);

module.exports = router;
