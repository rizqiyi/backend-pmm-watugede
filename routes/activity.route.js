const express = require("express");

const { getActivityData } = require("../controllers/activity.controller");

const router = express.Router();

router.route("/").get(getActivityData);

module.exports = router;
