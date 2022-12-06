const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const userM = require("./models/user");

const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/user");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

//loger
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

require("./config/hbs")(app);
require("./config/session")(app);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  // userM
  //   .findUName(req.session.user.UName)
  //   .then((user) => {
  //     req.user = user[0];
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  req.user = req.session.user;
  next();
});

// locals
app.use((req, res, next) => {
  res.locals.haveUser = req.session.isLoggedIn;
  next();
});

app.use(homeRoutes);
app.use(userRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
