const express = require("express");

const {
  getActivityData,
  postActivityWhenLogOut,
  getAllCountedData,
} = require("../controllers/activity.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

router.route("/").all(middleware).get(getActivityData);

router.route("/all").all(middleware).get(getAllCountedData);

router.route("/:id").all(middleware).post(postActivityWhenLogOut);

module.exports = router;
