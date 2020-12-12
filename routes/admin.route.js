const express = require("express");

const {
  getAdminData,
  postLoginAdmin,
  registerAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();

router.route("/").get(getAdminData);

router.route("/admin").post(postLoginAdmin);

router.route("/register").post(registerAdmin);

module.exports = router;
