const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

router.get("/", homeController.getHome);

router.get("/register", homeController.getRegister);

router.get("/register/doitac", homeController.getRegisterDT);

router.get("/register/taixe", homeController.getRegisterTX);

router.get("/register/khachhang", homeController.getRegisterKH);

router.get("/register/nhanvien", homeController.getRegisterNV);

router.get("/login", homeController.getLogin);

module.exports = router;
