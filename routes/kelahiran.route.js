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

router.route("/").all(middleware).post(postKelahiran).get(getKelahiran);

router.route("/:id").all(middleware).get(getKelahiranById);

router.route("/:id").all(middleware).put(updateDataById).delete(deleteDataById);

module.exports = router;
