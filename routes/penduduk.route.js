const express = require("express");
const {
  getPenduduk,
  postPenduduk,
  updatePenduduk,
  deletePenduduk,
  getPendudukByName,
  getPendudukById,
  deletePendudukPadaKK,
  getPendudukByNamaKepalaKeluarga,
  getPendudukByNoKK,
  getKepalaKeluargaById,
} = require("../controllers/penduduk.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

//@desc     GET Penduduk by Name
//@routes   GET
//@endpoint /api/penduduk/s
//@access   Private
router.route("/s").all(middleware).get(getPendudukByName);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk/s/kk
//@access   Private
router.route("/s/kk").all(middleware).get(getPendudukByNoKK);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private

//@desc     POST Penduduk
//@routes   POST
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/").all(middleware).get(getPenduduk);
router.route("/:id").all(middleware).post(postPenduduk);

//@desc     Update Penduduk
//@routes   PUT
//@endpoint /api/penduduk/:id
//@access   Private

//@desc     Delete Penduduk
//@routes   DELETE
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").all(middleware).put(updatePenduduk).delete(deletePenduduk);
router
  .route("/:id_penduduk/d/:id_kk")
  .all(middleware)
  .delete(deletePendudukPadaKK);

//@desc     GET Penduduk by Nama Kepala Keluarga
//@routes   GET
//@endpoint /api/penduduk/k
//@access   Private
router.route("/k").all(middleware).get(getPendudukByNamaKepalaKeluarga);

//@desc     GET Penduduk by Nama Kepala Keluarga spesific id
//@routes   GET
//@endpoint /api/penduduk/k/:id
//@access   Private
router.route("/k/:id").all(middleware).get(getKepalaKeluargaById);

//@desc     GET Penduduk by id
//@routes   GET
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").all(middleware).get(getPendudukById);

module.exports = router;
