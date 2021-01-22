const express = require("express");

const {
  getDataPendudukKeluarByName,
  getDataPendudukKeluar,
  postDataPendudukKeluar,
  postManyDataPendudukKeluar,
  deleteDataPendudukKeluar,
  getDataPendudukKeluarByID,
  deleteAllDataPendudukKeluar,
} = require("../controllers/penduduk_keluar.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

router.route("/s").all(middleware).get(getDataPendudukKeluarByName);

router.route("/").all(middleware).get(getDataPendudukKeluar);

router.route("/:id_penduduk").all(middleware).get(getDataPendudukKeluarByID);

router.route("/:id_penduduk").all(middleware).post(postDataPendudukKeluar);

router
  .route("/:id_penduduk/m")
  .all(middleware)
  .post(postManyDataPendudukKeluar);

router
  .route("/:id_penduduk/d/:id_penduduk_keluar")
  .all(middleware)
  .delete(deleteDataPendudukKeluar);

router.route("/:id_data/d").delete(deleteAllDataPendudukKeluar);

module.exports = router;
