const express = require("express");
const {
  getPenduduk,
  postPenduduk,
  updatePenduduk,
  deletePenduduk,
  getPendudukByName,
  postMutasiKeluar,
} = require("../controllers/penduduk.controller");

const router = express.Router();

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private

//@desc     POST Penduduk
//@routes   POST
//@endpoint /api/penduduk
//@access   Private
router.route("/").get(getPenduduk).post(postPenduduk);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private
router.route("/s").get(getPendudukByName);

//@desc     Update Penduduk
//@routes   PUT
//@endpoint /api/penduduk/:id
//@access   Private

//@desc     Delete Penduduk
//@routes   DELETE
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").put(updatePenduduk).delete(deletePenduduk);

module.exports = router;
