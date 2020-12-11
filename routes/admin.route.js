const express = require("express");

const {
  getAdminData,
  postLoginAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();

router.route("/").get(getAdminData).post(postLoginAdmin);

module.exports = router;
