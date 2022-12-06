exports.getHome = async function (req, res, next) {
  res.render("home", {
    pageTitle: "Home",
  });
};

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

exports.getRegisterTX = async function (req, res, next) {
  res.render("registertx", {
    pageTitle: "Register Tài Xế",
  });
};

exports.getRegisterDT = async function (req, res, next) {
  res.render("registerdt", {
    pageTitle: "Register Đối Tác",
  });
};

exports.getRegisterNV = async function (req, res, next) {
  res.render("registernv", {
    pageTitle: "Register Nhân Viên",
  });
};

exports.getRegisterKH = async function (req, res, next) {
  res.render("registerkh", {
    pageTitle: "Register Khách Hàng",
  });
};
