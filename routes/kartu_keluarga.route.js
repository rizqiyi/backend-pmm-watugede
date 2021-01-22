const express = require("express");
const {
  getAllKartuKeluarga,
  postKartuKeluarga,
  postKartuKeluargaPendudukMasuk,
  updateKartuKeluarga,
  deleteKartuKeluarga,
  getKartuKeluargaByID,
  getKartuKeluarOnlyWithKepalaKeluarga,
} = require("../controllers/kartu_keluarga.controller");
const router = express.Router();
const middleware = require("../middlewares/auth");

router
  .route("/")
  .all(middleware)
  .get(getAllKartuKeluarga)
  .post(postKartuKeluarga);

router.route("/in").all(middleware).post(postKartuKeluargaPendudukMasuk);

router.route("/k").all(middleware).get(getKartuKeluarOnlyWithKepalaKeluarga);

router.route("/:id").all(middleware).get(getKartuKeluargaByID);

router
  .route("/:id")
  .all(middleware)
  .put(updateKartuKeluarga)
  .delete(deleteKartuKeluarga);

module.exports = router;
