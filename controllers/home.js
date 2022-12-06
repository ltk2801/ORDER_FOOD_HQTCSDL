const doitacM = require("../models/doitac");
const nhanvienM = require("../models/nhanvien");
const khachhangM = require("../models/khachhang");
const taixeM = require("../models/taixe");

exports.getHome = async function (req, res, next) {
  res.render("home", {
    pageTitle: "Home",
  });
};

exports.getDetailP = async function (req, res, next) {
  let user = req.user;
  let curU;

  let admin = user.perAdmin;
  let doitac = user.perDt;
  let taixe = user.perTx;
  let khachhang = user.perKh;
  let nhanvien = user.perNv;

  let pageTitle;
  if (admin) {
    pageTitle = "Admin Page";
  }
  if (doitac) {
    pageTitle = "Đối Tác Page";
    const infoU = await doitacM.getInfo(user.Email);
    curU = infoU[0];
  }
  if (taixe) {
    pageTitle = "Tài Xế Page";
    const infoU = await taixeM.getInfo(user.Email);
    curU = infoU[0];
  }
  if (khachhang) {
    pageTitle = "Khách Hàng Page";
    const infoU = await khachhangM.getInfo(user.Email);
    curU = infoU[0];
  }
  if (nhanvien) {
    pageTitle = "Nhân Viên Page";
    const infoU = await nhanvienM.getInfo(user.Email);
    curU = infoU[0];
  }
  console.log(user);
  res.render("userP", {
    pageTitle: pageTitle,
    admin: admin,
    nhanvien: nhanvien,
    khachhang: khachhang,
    taixe: taixe,
    doitac: doitac,
    user: user,
    info: curU,
  });
};
