const express = require("express");

const { getActivityData } = require("../controllers/activity.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

router.route("/").all(middleware).get(getActivityData);

module.exports = router;
