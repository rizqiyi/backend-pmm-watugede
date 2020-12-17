const express = require("express");

const {
  getDataPendudukKeluarByName,
  getDataPendudukKeluar,
  postDataPendudukKeluar,
  updateDataPendudukKeluar,
  deleteDataPendudukKeluar,
  getDataPendudukKeluarByID,
  getDataPengikutKeluarByID,
} = require("../controllers/penduduk_keluar.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

//@desc     GET Spesific Penduduk Keluar
//@routes   GET
//@endpoint /api/penduduk_keluar/s
//@access   Private
router.route("/s").all(middleware).get(getDataPendudukKeluarByName);

//@desc     GET Penduduk Keluar
//@routes   GET
//@endpoint /api/penduduk_keluar
//@access   Private
router.route("/").all(middleware).get(getDataPendudukKeluar);
router.route("/:id_penduduk").all(middleware).get(getDataPendudukKeluarByID);

//@desc     POST Penduduk Keluar
//@routes   POST
//@endpoint /api/penduduk_keluar/:id_penduduk
//@access   Private
router.route("/:id_penduduk").all(middleware).post(postDataPendudukKeluar);

//@desc     Update Penduduk Keluar
//@routes   PUT
//@endpoint /api/penduduk_keluar/:id_penduduk/u/:id_penduduk_keluar
//@access   Private
router
  .route("/:id_penduduk/u/:id_penduduk_keluar")
  .all(middleware)
  .put(updateDataPendudukKeluar);

//@desc     Delete Penduduk Keluar
//@routes   DELETE
//@endpoint /api/penduduk_keluar/:id_penduduk/d/:id_penduduk_keluar
//@access   Private
router
  .route("/:id_penduduk/d/:id_penduduk_keluar")
  .all(middleware)
  .delete(deleteDataPendudukKeluar);

module.exports = router;
