const express = require("express");
const {
  getDataByName,
  getKematian,
  postKematian,
  updateKematian,
  deleteKematian,
} = require("../controllers/kematian.controller");

const middleware = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

//@desc     GET Spesific Data Kematian
//@routes   GET
//@endpoint /api/kematian/s
//@access   Private
router.route("/s").all(middleware).get(getDataByName);

//@desc     GET All Data Kematian
//@routes   GET
//@endpoint /api/kematian
//@access   Private

//@desc     POST Data Kematian
//@routes   POST
//@endpoint /api/kematian
//@access   Private
router.route("/").all(middleware).get(getKematian).post(postKematian);

//@desc     Update Data Kematian
//@routes   PUT
//@endpoint /api/kematian/:id
//@access   Private

//@desc     Delete Data Kematian
//@routes   DELETE
//@endpoint /api/kematian/:id
//@access   Private
router.route("/:id").all(middleware).put(updateKematian).delete(deleteKematian);

module.exports = router;
