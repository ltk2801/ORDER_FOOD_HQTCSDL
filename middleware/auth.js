const { pgp, db } = require("../config/connectStr");

exports.authHaveUser = async function (req, res, next) {
  if (!req.session.isLoggedIn) {
    console.log("chưa đăng nhập");
  } else {
    console.log("Đã đăng nhập rồi");
    return res.redirect("/404");
  }
  next();
};

exports.authUser = async function (req, res, next) {
  if (req.session.isLoggedIn) {
    console.log("Đã đăng nhập rồi");
    return next();
  } else {
    console.log("chưa đăng nhập");
    return res.redirect("/404");
  }
};
