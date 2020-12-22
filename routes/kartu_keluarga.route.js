const express = require("express");
const {
  getAllKartuKeluarga,
  postKartuKeluarga,
  updateKartuKeluarga,
  deleteKartuKeluarga,
} = require("../controllers/kartu_keluarga.controller");
const router = express.Router();

//@desc     GET All Kartu Keluarga
//@routes   GET
//@endpoint /api/kartukeluarga
//@access   Private

//@desc     POST Kartu Keluarga
//@routes   POST
//@endpoint /api/kartukeluarga
//@access   Private
router.route("/").get(getAllKartuKeluarga).post(postKartuKeluarga);

//@desc     Update Kartu Keluarga
//@routes   PUT
//@endpoint /api/kartukeluarga/:id
//@access   Private

//@desc     Delete Kartu Keluarga
//@routes   DELETE
//@endpoint /api/kartukeluarga/:id
//@access   Private
router.route("/:id").put(updateKartuKeluarga).delete(deleteKartuKeluarga);

module.exports = router;
