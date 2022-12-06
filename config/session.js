const session = require("express-session");
module.exports = (app) => {
  app.set("trust-proxy", 1);
  app.use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    })
  );
};
