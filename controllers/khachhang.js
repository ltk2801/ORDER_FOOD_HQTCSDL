const userM = require("../models/user");
const khachhangM = require("../models/khachhang");

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
