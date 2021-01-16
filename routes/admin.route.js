const express = require("express");

const {
  getAdminData,
  postLoginAdmin,
  registerAdmin,
} = require("../controllers/admin.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

//@desc     GET Admin Data
//@routes   GET
//@endpoint /api/auth
//@access   Private
router.route("/").all(middleware).get(getAdminData);

//@desc     POST Login Admin
//@routes   POST
//@endpoint /api/auth/admin
//@access   Private
router.route("/admin").post(postLoginAdmin);

//@desc     POST Register Admin
//@routes   POST
//@endpoint /api/auth/register
//@access   Private
router.route("/register").all(middleware).post(registerAdmin);

module.exports = router;
