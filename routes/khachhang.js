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

router.get("/khachhang/dsdt", khController.getDsdt);

router.get("/khachhang/dsch/:dtId", khController.getDsch);

router.get("/khachhang/dsma/:dtId/:chId", khController.getDsma);

router.get("/khachhang/giohang", khController.getGioHang);

router.get("/khachhang/dsdh", khController.getDsdh);

router.get("/khachhang/dh/:dhId", khController.getDhDetail);

router.get("/khachhang/dsdh/lichsu", khController.getDsdhs);

router.post("/khachhang/addgiohang", khController.postAddMonAn);

router.post("/khachhang/delete-monan", khController.postXoaMonAnGioHang);

router.post("/khachhang/order", khController.postOrderMonAn);

router.post("/khachhang/dh-delete/", khController.postDeleteDH);

module.exports = router;
