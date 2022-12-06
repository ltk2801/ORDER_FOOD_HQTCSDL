const userM = require("../models/user");
const doitacM = require("../models/doitac");

exports.getRegisterTX = async function (req, res, next) {
  res.render("registertx", {
    pageTitle: "Register Tài Xế",
  });
};

exports.postRegisterTX = async function (req, res, next) {
  const user = req.body;

  userM
    .getLastID()
    .then((index) => {
      user.id = index + 1;
      user.per = 4;
      userM
        .Signin(user)
        .then((result) => {
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
