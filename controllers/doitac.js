const userM = require("../models/user");
const doitacM = require("../models/doitac");

exports.getRegisterDT = async function (req, res, next) {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  res.render("registerdt", {
    pageTitle: "Register Đối Tác",
    errorMessage: message,
  });
};

exports.postRegisterDT = async function (req, res, next) {
  const user = req.body;

  userM
    .findUName(user.name)
    .then((userDoc) => {
      if (!user.password || !user.password1) {
        req.flash("error", "You should input password !");
        return res.redirect("/register/doitac");
      }
      if (userDoc.length !== 0) {
        req.flash("error", "Tên tài khoản exists already !");
        return res.redirect("/register/doitac");
      }
      if (user.password !== user.password1) {
        req.flash("error", "Incorrect password entered !");
        return res.redirect("/register/doitac");
      }
      userM
        .findEmail(user.email)
        .then((userDoc) => {
          if (userDoc.length !== 0) {
            req.flash("error", "E-mail exists already !");
            return res.redirect("/register/doitac");
          }

          userM
            .getLastID()
            .then((index) => {
              user.id = index + 1;
              user.per = 3;
              userM
                .Signin(user)
                .then((result) => {
                  doitacM.getLastIDDT().then((index) => {
                    user.iddt = Number(index) + 1;
                    doitacM.getLastIDHDCD().then((index) => {
                      user.idhd = Number(index) + 1;
                      let mydate = new Date();
                      let day = mydate.toLocaleString("en-US", {
                        day: "2-digit",
                      });
                      let month = mydate.toLocaleString("en-US", {
                        month: "2-digit",
                      });
                      let year = mydate.getFullYear();

                      let nbd = `${year}-${month}-${day}`;
                      let nkt = `${year + 1}-${month}-${day}`;
                      user.nbd = nbd;
                      user.nkt = nkt;
                      doitacM.AddDT(user).then((result) => {
                        doitacM
                          .AddHDCD(user)
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

exports.getCuaHang = async function (req, res, next) {
  const user = req.user;
  const infoDoiTac = await doitacM.getInfo(user.Email);
  const chArr = await doitacM.getCuaHang(infoDoiTac[0].MaDoiTac);
  let infodt = infoDoiTac[0];
  chArr.map((obj) => {
    return (obj.TenQuan = infodt.TenQuanAn);
  });
  let report = req.flash("report");

  if (report.length > 0) {
    report = report;
  } else {
    report = null;
  }

  res.render("cuahang", {
    pageTitle: "Cửa hàng của đối tác",
    shops: chArr,
    info: infodt.TenQuanAn,
  });
};

exports.addCuahang = async function (req, res, next) {
  res.render("themcuahang", {
    pageTitle: "Thêm cửa hàng của đối tác",
  });
};

exports.postAddCuaHang = async function (req, res, next) {
  const infoCuaHang = req.body;
  const user = req.user;
  const infoDoiTac = await doitacM.getInfo(user.Email);
  const indexCh = await doitacM.getLastIDCH(infoDoiTac[0].MaDoiTac);

  infoCuaHang.mach = Number(indexCh) + 1;
  infoCuaHang.madt = infoDoiTac[0].MaDoiTac;
  doitacM
    .addCuahang(infoCuaHang)
    .then((result) => {
      req.flash("report", "Bạn đã thêm thành công cửa hàng");
      res.redirect("/doitac/cuahang");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditCuaHang = async function (req, res, next) {
  const user = req.user;
  const idCH = req.params.chId;

  const infoDoiTac = await doitacM.getInfo(user.Email);

  const shop = await doitacM.getInfoCuaHang(idCH, infoDoiTac[0].MaDoiTac);
  shop[0].TenQuan = infoDoiTac[0].TenQuanAn;

  res.render("cuahang-edit", {
    pageTitle: "Edit cửa hàng",
    shop: shop[0],
  });
};

exports.postEditCuaHang = async function (req, res, next) {
  const shop = req.body;

  doitacM
    .updateCuaHang(shop)
    .then((result) => {
      req.flash("report", "Bạn đã chình sửa thành công cửa hàng");
      res.redirect("/doitac/cuahang");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDetailCuaHang = async function (req, res, next) {
  let report = req.flash("report");

  if (report.length > 0) {
    report = report;
  } else {
    report = null;
  }
  const idCH = req.params.chId;
  const user = req.user;
  const infoDoiTac = await doitacM.getInfo(user.Email);
  const idDT = infoDoiTac[0].MaDoiTac;

  const menus = await doitacM.getMenus(idCH, idDT);

  res.render("cuahang-detail", {
    pageTitle: "Menu Cửa Hàng",
    idCH: idCH,
    menus: menus,
  });
};

exports.getThemMonAn = async function (req, res, next) {
  const idCH = req.query.chId;
  res.render("themmonan", {
    pageTitle: "Thêm món ăn của cửa hàng",
    idCH: idCH,
  });
};

exports.postThemMonAn = async function (req, res, next) {
  const infoMonAn = req.body;
  const user = req.user;
  const infoDoiTac = await doitacM.getInfo(user.Email);
  const lastID = await doitacM.getLastIDMA(
    infoMonAn.chId,
    infoDoiTac[0].MaDoiTac
  );

  infoMonAn.id = Number(lastID) + 1;
  infoMonAn.madt = infoDoiTac[0].MaDoiTac;

  doitacM
    .addMonAn(infoMonAn)
    .then((result) => {
      req.flash("report", "Bạn đã thêm món ăn vào cửa hàng thành công");
      res.redirect(`/doitac/cuahang/${infoMonAn.chId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteCuaHang = async function (req, res, next) {
  const user = req.user;
  const idCH = req.body.chId;
  const infoDoiTac = await doitacM.getInfo(user.Email);

  doitacM
    .deleteCH(idCH, infoDoiTac[0].MaDoiTac)
    .then((result) => {
      req.flash("report", "Bạn đã xóa thành công cửa hàng");
      res.redirect("/doitac/cuahang");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteMonAn = async function (req, res, next) {
  const idma = req.body.monanId;
  const idch = req.body.chId;
  doitacM
    .deleteMA(idma)
    .then((result) => {
      req.flash("report", "Bạn đã xóa thành công món ăn");
      res.redirect(`/doitac/cuahang/${idch}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getDonHang = async function (req, res, next) {
  res.render("donhangdt", {
    pageTitle: "Đơn hàng của đối tác",
  });
};

exports.getEditMonAn = async function (req, res, next) {
  const idma = req.params.monanId;

  const food = await doitacM.getInfoMonAn(idma);

  console.log(food);
  res.render("monan-edit", {
    pageTitle: "Edit món ăn",
    food: food[0],
  });
};

exports.postEditMonAn = async function (req, res, next) {
  const food = req.body;

  doitacM
    .updateMonAn(food)
    .then((result) => {
      req.flash("report", "Bạn đã edit thành công món ăn");
      res.redirect(`/doitac/cuahang/${food.chId}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
