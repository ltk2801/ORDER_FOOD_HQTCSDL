exports.getHome = async function (req, res, next) {
  res.render("home", {
    pageTitle: "Home",
  });
};

exports.getDetailP = async function (req, res, next) {
  let user = req.user;

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
  }
  if (taixe) {
    pageTitle = "Tài Xế Page";
  }
  if (khachhang) {
    pageTitle = "Khách Hàng Page";
  }
  if (nhanvien) {
    pageTitle = "Nhân Viên Page";
  }
  res.render("userP", {
    pageTitle: pageTitle,
    admin: admin,
    nhanvien: nhanvien,
    khachhang: khachhang,
    taixe: taixe,
    doitac: doitac,
  });
};
