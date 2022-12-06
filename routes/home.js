const express = require("express");

const homeController = require("../controllers/home");

const router = express.Router();

const isAuth = require("../middleware/auth");

router.get("/", homeController.getHome);

router.get("/user", isAuth.authUser, homeController.getDetailP);

module.exports = router;
