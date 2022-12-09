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

router.get("/khachhang/dsdt", isAuth.authKH, khController.getDsdt);

router.get("/khachhang/dsch/:dtId", isAuth.authKH, khController.getDsch);

router.get("/khachhang/dsma/:dtId/:chId", isAuth.authKH, khController.getDsma);

router.get("/khachhang/giohang", isAuth.authKH, khController.getGioHang);

router.get("/khachhang/dsdh", isAuth.authKH, khController.getDsdh);

router.get("/khachhang/dh/:dhId", isAuth.authKH, khController.getDhDetail);

router.get("/khachhang/dsdh/lichsu", isAuth.authKH, khController.getDsdhs);

router.post("/khachhang/addgiohang", khController.postAddMonAn);

router.post("/khachhang/delete-monan", khController.postXoaMonAnGioHang);

router.post("/khachhang/order", khController.postOrderMonAn);

router.post("/khachhang/dh-delete/", khController.postDeleteDH);

module.exports = router;
