const express = require("express");
const {
  getPenduduk,
  postPenduduk,
  updatePenduduk,
  getPendudukByNameOnlyHead,
  getPendudukById,
  deletePendudukPadaKK,
  getPendudukByNoKK,
  getPendudukByName,
  getPendudukByNIK,
} = require("../controllers/penduduk.controller");
const middleware = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

//@desc     GET Penduduk by Name
//@routes   GET
//@endpoint /api/penduduk/s
//@access   Private
router.route("/s").all(middleware).get(getPendudukByNameOnlyHead);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk/s/kk
//@access   Private
router.route("/s/kk").all(middleware).get(getPendudukByNoKK);

//@desc     GET Penduduk by Name
//@routes   GET
//@endpoint /api/penduduk/all/nik/s
//@access   Private
router.route("/all/nik/s").all(middleware).get(getPendudukByNIK);

//@desc     GET Penduduk by Name
//@routes   GET
//@endpoint /api/penduduk/all/s
//@access   Private
router.route("/all/s").all(middleware).get(getPendudukByName);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private
router.route("/").all(middleware).get(getPenduduk);

//@desc     POST Penduduk
//@routes   POST
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").all(middleware).post(postPenduduk);

//@desc     Update Penduduk
//@routes   PUT
//@endpoint /api/penduduk/:id
//@access   Private

//@desc     Delete Penduduk
//@routes   DELETE
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").all(middleware).put(updatePenduduk);
router
  .route("/:id_penduduk/d/:id_kk")
  .all(middleware)
  .delete(deletePendudukPadaKK);

//@desc     GET Penduduk by id
//@routes   GET
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").all(middleware).get(getPendudukById);

module.exports = router;
