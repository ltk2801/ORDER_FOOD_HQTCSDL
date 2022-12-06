const userM = require("../models/user");
const doitacM = require("../models/doitac");

exports.getRegisterKH = async function (req, res, next) {
  res.render("registerkh", {
    pageTitle: "Register Khách Hàng",
  });
};

exports.postRegisterKH = async function (req, res, next) {
  const user = req.body;

  // console.log(user);
  userM
    .getLastID()
    .then((index) => {
      user.id = index + 1;
      user.per = 5;
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
