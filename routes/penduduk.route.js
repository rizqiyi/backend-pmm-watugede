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
} = require("../controllers/penduduk.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private

//@desc     POST Penduduk
//@routes   POST
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/").get(getPenduduk);
router.route("/:id").post(postPenduduk);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private
router.route("/s").all(middleware).get(getPendudukByName);

//@desc     Update Penduduk
//@routes   PUT
//@endpoint /api/penduduk/:id
//@access   Private

//@desc     Delete Penduduk
//@routes   DELETE
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").put(updatePenduduk).delete(deletePenduduk);
router.route("/:id_penduduk/d/:id_kk").delete(deletePendudukPadaKK);

//@desc     GET Penduduk by Nama Kepala Keluarga
//@routes   GET
//@endpoint /api/penduduk/k
//@access   Private
router.route("/k").get(getPendudukByNamaKepalaKeluarga);

//@desc     GET Penduduk by id
//@routes   GET
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").get(getPendudukById);

module.exports = router;
