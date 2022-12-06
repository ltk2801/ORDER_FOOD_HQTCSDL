const userM = require("../models/user");
const doitacM = require("../models/doitac");

exports.getRegisterNV = async function (req, res, next) {
  res.render("registernv", {
    pageTitle: "Register Nhân Viên",
  });
};

exports.postRegisterNV = async function (req, res, next) {
  const user = req.body;

  userM
    .getLastID()
    .then((index) => {
      user.id = index + 1;
      user.per = 2;
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
