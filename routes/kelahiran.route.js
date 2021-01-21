const express = require("express");
const {
  getKelahiran,
  postKelahiran,
  updateDataById,
  deleteDataById,
  getKelahiranById,
} = require("../controllers/kelahiran.controller");
const middleware = require("../middlewares/auth");

const router = express.Router();

//@desc     POST Data Kelahiran
//@routes   POST
//@endpoint /api/kelahiran
//@access   Private

//@desc     GET Data Kelahiran
//@routes   GET
//@endpoint /api/kelahiran
//@access   Private
router.route("/").all(middleware).post(postKelahiran).get(getKelahiran);

//@desc     GET Data Kelahiran By ID
//@routes   GET
//@endpoint /api/kelahiran/:id
//@access   Private
router.route("/:id").all(middleware).get(getKelahiranById);

//@desc     Update Data Kelahiran
//@routes   PUT
//@endpoint /api/kelahiran/:id
//@access   Private

//@desc     Delete Data Kelahiran
//@routes   DELETE
//@endpoint /api/kelahiran/:id
//@access   Private
router.route("/:id").all(middleware).put(updateDataById).delete(deleteDataById);

module.exports = router;
