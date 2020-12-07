const express = require("express");
const {
  getKelahiran,
  postKelahiran,
  getDataByName,
  updateDataById,
  deleteDataById,
} = require("../controllers/kelahiran.controller");

const router = express.Router({ mergeParams: true });

router.route("/s").get(getDataByName);
router.route("/").post(postKelahiran).get(getKelahiran);
router.route("/:id").put(updateDataById).delete(deleteDataById);

module.exports = router;
