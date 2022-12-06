const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const nvController = require("../controllers/nhanvien");

router.get(
  "/register/nhanvien",
  isAuth.authHaveUser,
  nvController.getRegisterNV
);

router.post("/register/nhanvien", nvController.postRegisterNV);

module.exports = router;
