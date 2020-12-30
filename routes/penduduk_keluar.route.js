const express = require("express");

const {
  getDataPendudukKeluarByName,
  getDataPendudukKeluar,
  postDataPendudukKeluar,
  deleteDataPendudukKeluar,
  getDataPendudukKeluarByID,
  deleteAllDataPendudukKeluar,
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

//@desc     GET Penduduk Keluar By ID
//@routes   GET
//@endpoint /api/penduduk_keluar/:id_penduduk
//@access   Private
router.route("/:id_penduduk").all(middleware).get(getDataPendudukKeluarByID);

//@desc     POST Penduduk Keluar
//@routes   POST
//@endpoint /api/penduduk_keluar/:id_penduduk
//@access   Private
router.route("/:id_penduduk").all(middleware).post(postDataPendudukKeluar);

//@desc     Delete Penduduk Keluar
//@routes   DELETE
//@endpoint /api/penduduk_keluar/:id_penduduk/d/:id_penduduk_keluar
//@access   Private
router
  .route("/:id_penduduk/d/:id_penduduk_keluar")
  .all(middleware)
  .delete(deleteDataPendudukKeluar);

router.route("/:id_data/d").delete(deleteAllDataPendudukKeluar);

module.exports = router;
