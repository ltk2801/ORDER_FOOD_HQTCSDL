const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const txController = require("../controllers/taixe");

router.get("/register/taixe", isAuth.authHaveUser, txController.getRegisterTX);

router.get("/taixe/chondonhang", txController.getChonDonHang);

router.get("/taixe/donhang", txController.getDonHang);

router.get("/taixe/donhang/:dhId", txController.getChiTietDonHangTaiXe);

router.get("/taixe/edit-donhang/:dhId", txController.getEditDonHang);

router.get("/taixe/lichsudonhang", txController.getLichSuGiaoHang);

router.post("/register/taixe", txController.postRegisterTX);

router.post("/taixe/chondonhang", txController.postChonDonHang);

router.post("/taixe/edit-donhang", txController.postEditDonHang);

module.exports = router;
