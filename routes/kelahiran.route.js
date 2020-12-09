const express = require("express");
const {
  getKelahiran,
  postKelahiran,
  getDataByName,
  updateDataById,
  deleteDataById,
} = require("../controllers/kelahiran.controller");

const router = express.Router({ mergeParams: true });

//@desc     Get Spesific Data Penduduk
//@routes   GET
//@endpoint /api/kelahiran/s
//@access   Private
router.route("/s").get(getDataByName);

//@desc     POST Data Penduduk
//@routes   POST
//@endpoint /api/kelahiran
//@access   Private

//@desc     GET Data Penduduk
//@routes   GET
//@endpoint /api/kelahiran
//@access   Private
router.route("/").post(postKelahiran).get(getKelahiran);

//@desc     Update Data Penduduk
//@routes   PUT
//@endpoint /api/kelahiran/:id
//@access   Private

//@desc     Delete Data Penduduk
//@routes   DELETE
//@endpoint /api/kelahiran/:id
//@access   Private
router.route("/:id").put(updateDataById).delete(deleteDataById);

module.exports = router;
