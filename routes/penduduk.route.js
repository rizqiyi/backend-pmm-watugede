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

router.route("/s").all(middleware).get(getPendudukByNameOnlyHead);

router.route("/s/kk").all(middleware).get(getPendudukByNoKK);

router.route("/all/nik/s").all(middleware).get(getPendudukByNIK);

router.route("/all/s").all(middleware).get(getPendudukByName);

router.route("/").all(middleware).get(getPenduduk);

router.route("/:id").all(middleware).post(postPenduduk);

router.route("/:id").all(middleware).put(updatePenduduk);
router
  .route("/:id_penduduk/d/:id_kk")
  .all(middleware)
  .delete(deletePendudukPadaKK);

router.route("/:id").all(middleware).get(getPendudukById);

module.exports = router;
