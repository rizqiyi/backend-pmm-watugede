const express = require("express");
const {
  getKeteranganKeluar,
  postKeteranganKeluar,
} = require("../controllers/keterangan_keluar.controller");

const router = express.Router({ mergeParams: true });

router.route("/").get(getKeteranganKeluar).post(postKeteranganKeluar);

module.exports = router;
