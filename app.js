const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const homeRoutes = require("./routes/home");
const userRoutes = require("./routes/user");
const dtRoutes = require("./routes/doitac");
const khRoutes = require("./routes/khachhang");
const nvRoutes = require("./routes/nhanvien");
const txRoutes = require("./routes/taixe");

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

  req.user = req.session.user;
  let doitac = req.user.perDt;
  let taixe = req.user.perTx;
  let khachhang = req.user.perKh;
  let nhanvien = req.user.perNv;
  if (doitac) {
    res.locals.perDT = true;
    return next();
  }
  if (taixe) {
    res.locals.perTX = true;
    return next();
  }
  if (khachhang) {
    res.locals.perKH = true;
    return next();
  }
  if (nhanvien) {
    res.locals.perNV = true;
    return next();
  }
});

// locals
app.use((req, res, next) => {
  res.locals.haveUser = req.session.isLoggedIn;
  res.locals.reportMessage = req.flash("report");
  next();
});

app.use(homeRoutes);
app.use(userRoutes);
app.use(dtRoutes);
app.use(khRoutes);
app.use(nvRoutes);
app.use(txRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
