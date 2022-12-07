const userM = require("../models/user");

exports.getRegister = async function (req, res, next) {
  res.render("register", {
    pageTitle: "Register",
  });
};

exports.getLogin = async function (req, res, next) {
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

  res.render("login", {
    pageTitle: "Login",
    errorMessage: message,
    reportMessage: report,
  });
};

exports.postLogin = async function (req, res, next) {
  const nameUser = req.body.name;
  const passwordUser = req.body.password;
  userM
    .findUName(nameUser)
    .then((user) => {
      if (user.length == 0) {
        req.flash("error", "Invalid email or password !");
        return res.redirect("/login");
      }
      if (user[0].Password != passwordUser) {
        req.flash("error", "Password wrong ! ");
        return res.redirect("/login");
      }
      const perU = user[0].Permission;
      req.session.isLoggedIn = true;
      req.session.user = user[0];

      switch (perU) {
        case 1:
          req.session.user.perAdmin = true;
          break;
        case 2:
          req.session.user.perNv = true;
          break;
        case 3:
          req.session.user.perDt = true;
          break;
        case 4:
          req.session.user.perTx = true;
          break;
        case 5:
          req.session.user.perKh = true;
          break;
      }
      return req.session.save((err) => {
        // console.log(req.session.user.Permission);
        res.redirect("/user");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = async function (req, res, next) {
  req.session.destroy((err) => {
    res.redirect("/");
    console.log(err);
  });
};
