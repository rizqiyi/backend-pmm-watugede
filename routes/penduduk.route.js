const express = require("express");
const {
  getPenduduk,
  postPenduduk,
  updatePenduduk,
  deletePenduduk,
  getPendudukByName,
  getPendudukById,
} = require("../controllers/penduduk.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private

//@desc     POST Penduduk
//@routes   POST
//@endpoint /api/penduduk
//@access   Private
router.route("/").all(middleware).get(getPenduduk).post(postPenduduk);

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
router.route("/:id").all(middleware).put(updatePenduduk).delete(deletePenduduk);

//@desc     GET Penduduk by id
//@routes   GET
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").all(middleware).get(getPendudukById);

module.exports = router;
