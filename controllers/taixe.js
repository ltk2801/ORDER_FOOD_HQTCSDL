const userM = require("../models/user");
const taixeM = require("../models/taixe");
const doitacM = require("../models/doitac");

exports.getRegisterTX = async function (req, res, next) {
  res.render("tx-register", {
    pageTitle: "Register Tài Xế",
  });
};

exports.postRegisterTX = async function (req, res, next) {
  const user = req.body;

  userM
    .findUName(user.name)
    .then((userDoc) => {
      if (!user.password || !user.password1) {
        req.flash("error", "You should input password !");
        return res.redirect("/register/taixe");
      }
      if (userDoc.length !== 0) {
        req.flash("error", "Tên tài khoản exists already !");
        return res.redirect("/register/taixe");
      }
      if (user.password !== user.password1) {
        req.flash("error", "Incorrect password entered !");
        return res.redirect("/register/taixe");
      }
      userM
        .findEmail(user.email)
        .then((userDoc) => {
          if (userDoc.length !== 0) {
            req.flash("error", "E-mail exists already !");
            return res.redirect("/register/taixe");
          }
          taixeM
            .findCmnd(user.cmnd)
            .then((result) => {
              if (result.length !== 0) {
                req.flash("error", "CMND exists already !");
                return res.redirect("/register/taixe");
              }
              userM
                .getLastID()
                .then((index) => {
                  user.id = index + 1;
                  user.per = 4;
                  userM
                    .Signin(user)
                    .then((result) => {
                      taixeM
                        .addTX(user)
                        .then((result) => {
                          req.flash(
                            "report",
                            "You have successfully registered an account! Login now"
                          );
                          res.redirect("/login");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getChonDonHang = async function (req, res, next) {
  const user = req.user;

  const donhangArr = await taixeM.getDanhSachDonHang();
  donhangArr.map((data) => {
    data.GiaDoAn = data.TongGia - 20000;
    data.PhiVanChuyen = 20000;
  });
  const dharr = donhangArr.filter((data) => {
    if (data.TinhTrangDH == "Đang chờ nhận đơn") {
      return false;
    }
    return true;
  });
  res.render("tx-chondonhang", {
    pageTitle: "Danh sách đơn hàng",
    donhangs: dharr,
  });
};

exports.postChonDonHang = async function (req, res, next) {
  const dhId = req.body.dhId;
  const user = req.user;

  const infoTaiXe = await taixeM.getInfo(user.Email);

  taixeM
    .updateDonHangTaiXe(dhId, infoTaiXe[0].CMND)
    .then((result) => {
      req.flash("report", "Bạn Chọn Đơn Hàng Thành Công !");
      res.redirect("/taixe/donhang");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDonHang = async function (req, res, next) {
  const user = req.user;

  const infoTaiXe = await taixeM.getInfo(user.Email);

  const donhangArr = await taixeM.getDanhSachDonHangTaiXe(infoTaiXe[0].CMND);

  donhangArr.map((data) => {
    data.GiaDoAn = data.TongGia - 20000;
    data.PhiVanChuyen = 20000;
  });
  const dharr = donhangArr.filter((data) => {
    if (data.TinhTrangDH == "Đã giao hàng") {
      return false;
    }
    return true;
  });

  res.render("tx-donhang", {
    pageTitle: "Danh Sách Đơn Hàng Của Tài Xế",
    donhangs: dharr,
  });
};

exports.getChiTietDonHangTaiXe = async function (req, res, next) {
  const dhId = req.params.dhId;

  const infos = await doitacM.getInfoDH(dhId);
  let total = 0;
  infos.map((data) => {
    data.TongGia = data.SoluongMon * data.GiaThanh;
    total += data.TongGia;
  });

  res.render("tx-donhang-detail", {
    pageTitle: "Chi tiết đơn hàng",
    info: infos,
    total: total,
    dhId: dhId,
  });
};

exports.getEditDonHang = async function (req, res, next) {
  const dhId = req.params.dhId;

  const infoDH = await doitacM.getTTDH(dhId);

  res.render("tx-donhang-edit", {
    pageTitle: "Edit Tình Trạng Đơn Hàng",
    info: infoDH,
    dhId: dhId,
  });
};

exports.postEditDonHang = async function (req, res, next) {
  const info = req.body;

  // console.log(info);
  taixeM
    .updateTinhTrangDonHangTaiXe(info)
    .then((result) => {
      req.flash("report", "Bạn Đã Cập Nhật Tình Trạng Đơn Hàng Thành Công !");
      res.redirect("/taixe/donhang");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLichSuGiaoHang = async function (req, res, next) {
  const user = req.user;

  const infoTaiXe = await taixeM.getInfo(user.Email);

  const donhangArr = await taixeM.getDanhSachDonHangTaiXe(infoTaiXe[0].CMND);
  let count = 0;
  const dharr = donhangArr.filter((data) => {
    if (data.TinhTrangDH == "Đã giao hàng") {
      count += 1;
      return true;
    }
    return false;
  });
  const thunhap = count * 20000;
  res.render("tx-lichsudonhang", {
    pageTitle: "Lịch Sử Giao Hàng Của Tài Xế",
    thunhap: thunhap,
    dharr: dharr,
  });
};
