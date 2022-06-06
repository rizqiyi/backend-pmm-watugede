const express = require("express");

const {
  getAdminData,
  postLoginAdmin,
  registerAdmin,
  deleteAdmin,
  updateAdmin,
  getAllAdminData,
} = require("../controllers/admin.controller");
const middleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/role");

const router = express.Router();

router
  .route("/delete/:id")
  .all(middleware)
  .all(roleMiddleware)
  .delete(deleteAdmin);

router
  .route("/update/:id")
  .all(middleware)
  .all(roleMiddleware)
  .put(updateAdmin);

router.route("/all").all(middleware).all(roleMiddleware).get(getAllAdminData);

router.route("/").all(middleware).get(getAdminData);

router.route("/admin").post(postLoginAdmin);

router
  .route("/register")
  .all(middleware)
  .all(roleMiddleware)
  .post(registerAdmin);

module.exports = router;
