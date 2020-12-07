const express = require("express");
const {
  getKelahiran,
  postKelahiran,
} = require("../controllers/kelahiran.controller");

const router = express.Router();

router.route("/").post(postKelahiran).get(getKelahiran);

module.exports = router;
