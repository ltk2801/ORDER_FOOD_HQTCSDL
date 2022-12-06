const userM = require("../models/user");
const doitacM = require("../models/doitac");

exports.getRegisterDT = async function (req, res, next) {
  res.render("registerdt", {
    pageTitle: "Register Đối Tác",
  });
};

exports.postRegisterDT = async function (req, res, next) {
  const user = req.body;

  userM
    .getLastID()
    .then((index) => {
      user.id = index + 1;
      user.per = 3;
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
