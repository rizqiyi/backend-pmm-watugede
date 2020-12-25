const express = require("express");
const {
  getAllKartuKeluarga,
  postKartuKeluarga,
  updateKartuKeluarga,
  deleteKartuKeluarga,
  getKartuKeluargaByID,
  getKartuKeluarOnlyWithKepalaKeluarga,
} = require("../controllers/kartu_keluarga.controller");
const router = express.Router();
const middleware = require("../middlewares/auth");

//@desc     GET All Kartu Keluarga
//@routes   GET
//@endpoint /api/kartu_keluarga
//@access   Private

//@desc     POST Kartu Keluarga
//@routes   POST
//@endpoint /api/kartu_keluarga
//@access   Private
router
  .route("/")
  .all(middleware)
  .get(getAllKartuKeluarga)
  .post(postKartuKeluarga);

router.route("/k").get(getKartuKeluarOnlyWithKepalaKeluarga);

//@desc     GET Kartu Keluarga By Id
//@routes   GET
//@endpoint /api/kartu_keluarga/:id
//@access   Private
router.route("/:id").all(middleware).get(getKartuKeluargaByID);

//@desc     Update Kartu Keluarga
//@routes   PUT
//@endpoint /api/kartu_keluarga/:id
//@access   Private

//@desc     Delete Kartu Keluarga
//@routes   DELETE
//@endpoint /api/kartu_keluarga/:id
//@access   Private
router
  .route("/:id")
  .all(middleware)
  .put(updateKartuKeluarga)
  .delete(deleteKartuKeluarga);

module.exports = router;
