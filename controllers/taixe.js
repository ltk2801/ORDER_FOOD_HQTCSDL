const userM = require("../models/user");
const taixeM = require("../models/taixe");

exports.getRegisterTX = async function (req, res, next) {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  res.render("registertx", {
    pageTitle: "Register Tài Xế",
    errorMessage: message,
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
