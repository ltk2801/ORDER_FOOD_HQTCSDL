const userM = require("../models/user");
const khachhangM = require("../models/khachhang");
const doitacM = require("../models/doitac");
const { as } = require("pg-promise");

exports.getRegisterKH = async function (req, res, next) {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  res.render("registerkh", {
    pageTitle: "Register Khách Hàng",
    errorMessage: message,
  });
};

exports.postRegisterKH = async function (req, res, next) {
  const user = req.body;

  userM
    .findUName(user.name)
    .then((userDoc) => {
      if (!user.password || !user.password1) {
        req.flash("error", "You should input password !");
        return res.redirect("/register/khachhang");
      }
      if (userDoc.length !== 0) {
        req.flash("error", "Tên tài khoản exists already !");
        return res.redirect("/register/khachhang");
      }
      if (user.password !== user.password1) {
        req.flash("error", "Incorrect password entered !");
        return res.redirect("/register/khachhang");
      }
      userM
        .findEmail(user.email)
        .then((userDoc) => {
          if (userDoc.length !== 0) {
            req.flash("error", "E-mail exists already !");
            return res.redirect("/register/khachhang");
          }

          userM
            .getLastID()
            .then((index) => {
              user.id = index + 1;
              user.per = 5;
              userM
                .Signin(user)
                .then((result) => {
                  khachhangM.getLastID_KH().then((index) => {
                    user.idkh = Number(index) + 1;
                    khachhangM
                      .addKH(user)
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

exports.getDsdt = async function (req, res, next) {
  let report = req.flash("report");

  if (report.length > 0) {
    report = report;
  } else {
    report = null;
  }
  const dtArr = await khachhangM.getDT();

  res.render("dsdt", {
    pageTitle: "Danh sách đối tác",
    doitacs: dtArr,
  });
};

exports.getDsch = async function (req, res, next) {
  const dtId = req.params.dtId;

  const shopArr = await doitacM.getCuaHang(dtId);
  const infoDt = await doitacM.getInfoID(dtId);

  shopArr.map((obj) => {
    obj.TenQuan = infoDt[0].TenQuanAn;
    obj.MaDoiTac = infoDt[0].MaDoiTac;
  });
  res.render("dsch", {
    pageTitle: "Danh sách cửa hàng",
    dtId: dtId,
    shops: shopArr,
  });
};

exports.getDsma = async function (req, res, next) {
  const chId = req.params.chId;
  const dtId = req.params.dtId;

  const menuArr = await doitacM.getMenus(chId, dtId);

  res.render("dsma", {
    pageTitle: "Danh sách món ăn",
    chId: chId,
    menus: menuArr,
    dtId: dtId,
  });
};

exports.postAddMonAn = async function (req, res, next) {
  const infoAdd = req.body;
  // console.log(infoAdd);
  const idCart = await khachhangM.getLastID_Carts();
  const infoMon = await khachhangM.getMenu(infoAdd.mmId);
  infoAdd.idCart = Number(idCart) + 1;
  infoAdd.MonAn = infoMon[0];

  infoAdd.TongGia = infoAdd.sl * infoMon[0].GiaThanh;

  // const gia = await khachhangM.addTongGia();
  // console.log(gia.sum);
  khachhangM
    .addCart(infoAdd)
    .then((result) => {
      req.flash("report", "Bạn đã thêm món ăn vào giỏ hàng thành công !");
      res.redirect(`/khachhang/dsma/${infoAdd.dtId}/${infoAdd.chId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getGioHang = async function (req, res, next) {
  let report = req.flash("report");

  if (report.length > 0) {
    report = report;
  } else {
    report = null;
  }

  const user = req.user;
  // console.log(user);
  const infoKhachHang = await khachhangM.getInfo(user.Email);

  const cartArr = await khachhangM.getCart();
  if (cartArr.length != 0) {
    const infoChDt = await khachhangM.getInfoChDt(cartArr[0].MaMon);
    const gia = await khachhangM.addTongGia();
    const total = Number(gia.sum) + 20000;
    return res.render("giohang-kh", {
      pageTitle: "Giỏ Hàng Của Khách Hàng",
      carts: cartArr,
      sum: gia.sum,
      total: total,
      idKH: infoKhachHang[0].MaKH,
      idCH: infoChDt[0].MaCuaHang,
      idDT: infoChDt[0].MaDoiTac,
      mess: null,
    });
  }
  res.render("giohang-kh", {
    pageTitle: "Giỏ Hàng Của Khách Hàng",
    mess: "Giỏ hàng của khách hàng hiện đang trống",
  });
};

exports.postXoaMonAnGioHang = async function (req, res, next) {
  const id = req.body.id;

  khachhangM
    .deleteMonAnCart(id)
    .then((result) => {
      req.flash("report", "Bạn đã xóa món ăn khỏi giỏ hàng thành công !");
      res.redirect("/khachhang/giohang");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrderMonAn = async function (req, res, next) {
  const infoOrder = req.body;
  const index = await khachhangM.getLastID_DH();
  const carts = await khachhangM.getCart();

  infoOrder.madh = Number(index) + 1;
  infoOrder.carts = carts;
  // console.log(infoOrder);
  khachhangM
    .addDH(infoOrder)
    .then((result) => {
      khachhangM
        .addCTDH(infoOrder)
        .then((result) => {
          khachhangM
            .deleteCart()
            .then((result) => {
              req.flash(
                "report",
                "Bạn đã đặt đơn hàng thành công ! Vui lòng xem đơn hàng của bạn "
              );
              res.redirect("/khachhang/dsdh");
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

  // console.log(infoOrder);
};

exports.getDsdh = async function (req, res, next) {
  let report = req.flash("report");
  let message = req.flash("error");
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  if (report.length > 0) {
    report = report;
  } else {
    report = null;
  }
  const user = req.user;
  const infoKhachHang = await khachhangM.getInfo(user.Email);

  const dhArr = await khachhangM.getDH(infoKhachHang[0].MaKH);

  // // console.log(dhArr);
  const dhhientai = dhArr.filter((obj) => {
    if (obj.TinhTrangDH == "Đã giao hàng") {
      return false;
    }
    return true;
  });

  res.render("donhang-kh", {
    pageTitle: "Danh sách đơn hàng đang đặt của đối tác",
    dhArr: dhhientai,
  });
};

exports.getDhDetail = async function (req, res, next) {
  const dhId = req.params.dhId;

  // console.log(dhId);

  const infoDh = await khachhangM.getCTDH(dhId);
  // console.log(infoDh);
  const info = await khachhangM.getInfoMon(infoDh);
  let total = 0;
  // console.log(info);
  info.map((data) => {
    data.sum = data.GiaThanh * data.SoluongMon;
    total += data.sum;
  });
  res.render("donhang-detail", {
    pageTitle: "Chi Tiết Đơn Hàng",
    infoArr: info,
    total: total,
    totalsum: total + 20000,
  });
};

exports.postDeleteDH = async function (req, res, next) {
  const id = req.body.dhId;

  const infoDH = await khachhangM.getDH_ID(id);
  // console.log(infoDH);
  if (infoDH[0].TinhTrangDH == "Đang chờ nhận đơn") {
    khachhangM
      .deleteCTDH(infoDH[0].MaDH)
      .then((result) => {
        khachhangM
          .deleteDH(infoDH[0].MaDH)
          .then((result) => {
            req.flash("report", "Bạn đã hủy đơn hàng thành công ! ");
            return res.redirect("/khachhang/dsdh");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    req.flash(
      "error",
      "Không thể hủy đơn hàng này vì cửa hàng đang chuẩn bị món ! "
    );
    return res.redirect("/khachhang/dsdh");
  }
};

exports.getDsdhs = async function (req, res, next) {
  const user = req.user;
  const infoKhachHang = await khachhangM.getInfo(user.Email);

  const dhArr = await khachhangM.getDH(infoKhachHang[0].MaKH);

  // // console.log(dhArr);
  const dhhientai = dhArr.filter((obj) => {
    if (obj.TinhTrangDH != "Đã giao hàng") {
      return false;
    }
    return true;
  });

  res.render("donhangs-kh", {
    pageTitle: "Lịch sử đơn hàng của đối tác",
    dhArr: dhhientai,
  });
};
