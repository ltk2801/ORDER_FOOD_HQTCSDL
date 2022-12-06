const userM = require("../models/user");
const doitacM = require("../models/doitac");

exports.getRegisterDT = async function (req, res, next) {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  res.render("registerdt", {
    pageTitle: "Register Đối Tác",
    errorMessage: message,
  });
};

exports.postRegisterDT = async function (req, res, next) {
  const user = req.body;

  userM
    .findUName(user.name)
    .then((userDoc) => {
      if (!user.password || !user.password1) {
        req.flash("error", "You should input password !");
        return res.redirect("/register/doitac");
      }
      if (userDoc.length !== 0) {
        req.flash("error", "Tên tài khoản exists already !");
        return res.redirect("/register/doitac");
      }
      if (user.password !== user.password1) {
        req.flash("error", "Incorrect password entered !");
        return res.redirect("/register/doitac");
      }
      userM
        .findEmail(user.email)
        .then((userDoc) => {
          if (userDoc.length !== 0) {
            req.flash("error", "E-mail exists already !");
            return res.redirect("/register/doitac");
          }

          userM
            .getLastID()
            .then((index) => {
              user.id = index + 1;
              user.per = 3;
              userM
                .Signin(user)
                .then((result) => {
                  doitacM.getLastIDDT().then((index) => {
                    user.iddt = Number(index) + 1;
                    doitacM.getLastIDHDCD().then((index) => {
                      user.idhd = Number(index) + 1;
                      let mydate = new Date();
                      let day = mydate.toLocaleString("en-US", {
                        day: "2-digit",
                      });
                      let month = mydate.toLocaleString("en-US", {
                        month: "2-digit",
                      });
                      let year = mydate.getFullYear();

                      let nbd = `${year}-${month}-${day}`;
                      let nkt = `${year + 1}-${month}-${day}`;
                      user.nbd = nbd;
                      user.nkt = nkt;
                      doitacM.AddDT(user).then((result) => {
                        doitacM
                          .AddHDCD(user)
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
                      });
                    });
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
