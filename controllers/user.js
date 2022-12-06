const userM = require("../models/user");

exports.getRegister = async function (req, res, next) {
  res.render("register", {
    pageTitle: "Register",
  });
};

exports.getLogin = async function (req, res, next) {
  res.render("login", {
    pageTitle: "Login",
  });
};

exports.postLogin = async function (req, res, next) {
  const nameUser = req.body.name;
  const passwordUser = req.body.password;
  userM
    .findUName(nameUser)
    .then((user) => {
      if (user.length == 0) {
        console.log("ko tim thay tai khoan");
        return res.redirect("/login");
      }
      if (user[0].Password != passwordUser) {
        console.log("sai pass");
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
        console.log(req.session);
        console.log(err);
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
