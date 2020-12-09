const express = require("express");

const {
  getDataPendudukKeluarByName,
  getDataPendudukKeluar,
  postDataPendudukKeluar,
  updateDataPendudukKeluar,
  deleteDataPendudukKeluar,
} = require("../controllers/penduduk_keluar.controller");

const router = express.Router();

//@desc     GET Spesific Penduduk Keluar
//@routes   GET
//@endpoint /api/penduduk_keluar/s
//@access   Private
router.route("/s").get(getDataPendudukKeluarByName);

//@desc     GET Penduduk Keluar
//@routes   GET
//@endpoint /api/penduduk_keluar
//@access   Private
router.route("/").get(getDataPendudukKeluar);

//@desc     POST Penduduk Keluar
//@routes   POST
//@endpoint /api/penduduk_keluar/:id_penduduk
//@access   Private
router.route("/:id_penduduk").post(postDataPendudukKeluar);

//@desc     Update Penduduk Keluar
//@routes   PUT
//@endpoint /api/penduduk_keluar/:id_penduduk/u/:id_penduduk_keluar
//@access   Private
router
  .route("/:id_penduduk/u/:id_penduduk_keluar")
  .put(updateDataPendudukKeluar);

//@desc     Delete Penduduk Keluar
//@routes   DELETE
//@endpoint /api/penduduk_keluar/:id_penduduk/d/:id_penduduk_keluar
//@access   Private
router
  .route("/:id_penduduk/d/:id_penduduk_keluar")
  .delete(deleteDataPendudukKeluar);

module.exports = router;
