const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");

const dtController = require("../controllers/doitac");

router.get("/register/doitac", isAuth.authHaveUser, dtController.getRegisterDT);

router.post("/register/doitac", dtController.postRegisterDT);

router.get("/doitac/cuahang", isAuth.authDT, dtController.getCuaHang);

router.get("/doitac/donhang", isAuth.authDT, dtController.getDonHang);

router.get("/doitac/themcuahang", isAuth.authDT, dtController.addCuahang);

router.get(
  "/doitac/edit-cuahang/:chId",
  isAuth.authDT,
  dtController.getEditCuaHang
);

router.get(
  "/doitac/cuahang/:chId",
  isAuth.authDT,
  dtController.getDetailCuaHang
);

router.get("/doitac/themmonan", isAuth.authDT, dtController.getThemMonAn);

router.get(
  "/doitac/edit-monan/:monanId",
  isAuth.authDT,
  dtController.getEditMonAn
);

router.get("/doitac/donhang/:chId", dtController.getDonHangCuaHang);

router.get("/doitac/donhangs/:dhId", dtController.getDonHangCuaHangX);

router.get("/doitac/donhang-edit/:chId/:dhId", dtController.getEditTinhTrang);

router.post("/doitac/donhang-edit", dtController.postEditTinhTrang);

router.post("/doitac/themcuahang", isAuth.authDT, dtController.postAddCuaHang);

router.post(
  "/doitac/delete-cuahang",
  isAuth.authDT,
  dtController.postDeleteCuaHang
);

router.post("/doitac/edit-cuahang", dtController.postEditCuaHang);

router.post("/doitac/themmonan", isAuth.authDT, dtController.postThemMonAn);

router.post(
  "/doitac/delete-monan",
  isAuth.authDT,
  dtController.postDeleteMonAn
);

router.post("/doitac/edit-monan", dtController.postEditMonAn);

module.exports = router;
