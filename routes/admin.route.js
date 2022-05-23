const express = require("express");

const {
  getAdminData,
  postLoginAdmin,
  registerAdmin,
} = require("../controllers/admin.controller");
const middleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

const router = express.Router();

router.route("/").all(middleware).get(getAdminData);

router.route("/admin").post(postLoginAdmin);

router
  .route("/register")
  .all(middleware)
  .all(roleMiddleware)
  .post(registerAdmin);

module.exports = router;
