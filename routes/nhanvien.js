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

router.get("/nhanvien/danhsachhopdong", isAuth.authNV, nvController.getDSHD);

router.get(
  "/nhanvien/danhsachhopdongchoduyet",
  isAuth.authNV,
  nvController.getDSHDCD
);

router.get("/hopdongs/:hopdongid", isAuth.authNV, nvController.getHD);

router.post("/nhanvien/duyethopdong", isAuth.authNV, nvController.postHD);

module.exports = router;
