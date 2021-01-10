const express = require("express");

const {
  getActivityData,
  postActivityWhenLogOut,
  getAllCountedData,
} = require("../controllers/activity.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

//@desc     GET Data Activity
//@routes   GET
//@endpoint /api/activity
//@access   Private
router.route("/").all(middleware).get(getActivityData);

//@desc     GET Data Activity
//@routes   GET
//@endpoint /api/activity
//@access   Private
router.route("/all").all(middleware).get(getAllCountedData);

//@desc     POST Data Activity
//@routes   POST
//@endpoint /api/activity/:id
//@access   Private
router.route("/:id").all(middleware).post(postActivityWhenLogOut);

module.exports = router;
