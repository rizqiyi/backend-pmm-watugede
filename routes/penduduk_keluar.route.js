const express = require("express");

const {
  getDataPendudukKeluarByName,
  getDataPendudukKeluar,
  postDataPendudukKeluar,
  updateDataPendudukKeluar,
  deleteDataPendudukKeluar,
} = require("../controllers/penduduk_keluar.controller");

const router = express.Router();

router.route("/s").get(getDataPendudukKeluarByName);

router.route("/").get(getDataPendudukKeluar);

router.route("/:id_penduduk").post(postDataPendudukKeluar);

router
  .route("/:id")
  .put(updateDataPendudukKeluar)
  .delete(deleteDataPendudukKeluar);

module.exports = router;
