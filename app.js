const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const homeRoutes = require("./routes/home");

const app = express();
const PORT = process.env.PORT || 3000;

//loger
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());

require("./config/hbs")(app);

app.use(homeRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode | 500;
  res.status(statusCode).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
