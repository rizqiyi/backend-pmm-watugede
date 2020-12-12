const express = require("express");

const {
  getAdminData,
  postLoginAdmin,
  registerAdmin,
} = require("../controllers/admin.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

router.route("/").all(middleware).get(getAdminData);

router.route("/admin").post(postLoginAdmin);

router.route("/register").all(middleware).post(registerAdmin);

module.exports = router;
