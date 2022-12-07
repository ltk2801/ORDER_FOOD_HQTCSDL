const userM = require("../models/user");
const nhanvienM = require("../models/nhanvien");

exports.getRegisterNV = async function (req, res, next) {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  res.render("registernv", {
    pageTitle: "Register Nhân Viên",
    errorMessage: message,
  });
};

exports.postRegisterNV = async function (req, res, next) {
  const user = req.body;
  userM
    .findUName(user.name)
    .then((userDoc) => {
      if (!user.password || !user.password1) {
        req.flash("error", "You should input password !");
        return res.redirect("/register/nhanvien");
      }
      if (userDoc.length !== 0) {
        req.flash("error", "Tên tài khoản exists already !");
        return res.redirect("/register/nhanvien");
      }
      if (user.password !== user.password1) {
        req.flash("error", "Incorrect password entered !");
        return res.redirect("/register/nhanvien");
      }
      userM
        .findEmail(user.email)
        .then((userDoc) => {
          if (userDoc.length !== 0) {
            req.flash("error", "E-mail exists already !");
            return res.redirect("/register/nhanvien");
          }

          userM
            .getLastID()
            .then((index) => {
              user.id = index + 1;
              user.per = 2;
              userM
                .Signin(user)
                .then((result) => {
                  nhanvienM.getLastID_NV().then((index) => {
                    user.idnv = Number(index) + 1;
                    nhanvienM
                      .addNV(user)
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

exports.getDSHD = async function (req, res, next) {
  let report = req.flash("report");

  if (report.length > 0) {
    report = report;
  } else {
    report = null;
  }
  const hdArr = await nhanvienM.getDSHD();
  res.render("dshd", {
    pageTitle: "Danh Sách Hợp Đồng",
    hopdongs: hdArr,
    reportMessage: report,
  });
};

exports.getDSHDCD = async function (req, res, next) {
  const hdArr = await nhanvienM.getDSHDCD();
  res.render("dshdcd", {
    pageTitle: "Danh Sách Hợp Đồng Chờ Duyệt",
    hopdongs: hdArr,
  });
};

exports.getHD = async function (req, res, next) {
  const hdId = req.params.hopdongid;

  const hd = await nhanvienM.findHD(hdId);
  res.render("hd-detail", {
    pageTitle: "Hợp đồng",
    HD: hd[0],
  });
};

exports.postHD = async function (req, res, next) {
  const hdId = req.body.mhd;
  const hd = await nhanvienM.findHD(hdId);

  nhanvienM
    .addHD(hd[0])
    .then((result) => {
      nhanvienM
        .deleteHDCD(hdId)
        .then((result) => {
          req.flash("report", "Bạn Đã Duyệt Hợp Đồng Thành Công !");
          res.redirect("/nhanvien/danhsachhopdong");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
