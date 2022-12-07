const session = require("express-session");
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

exports.authNV = async function (req, res, next) {
  if (req.session.user.Permission == 2) {
    return next();
  } else {
    return res.redirect("/404");
  }
};

exports.authDT = async function (req, res, next) {
  if (req.session.user.Permission == 3) {
    return next();
  } else {
    return res.redirect("/404");
  }
};

exports.authTX = async function (req, res, next) {
  if (req.session.user.Permission == 4) {
    return next();
  } else {
    return res.redirect("/404");
  }
};

exports.authKH = async function (req, res, next) {
  if (req.session.user.Permission == 5) {
    return next();
  } else {
    return res.redirect("/404");
  }
};
