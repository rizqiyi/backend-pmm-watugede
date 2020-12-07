const express = require("express");
const {
  getDataByName,
  getKematian,
  postKematian,
  updateKematian,
  deleteKematian,
} = require("../controllers/kematian.controller");

const router = express.Router({ mergeParams: true });

router.route("/s").get(getDataByName);
router.route("/").get(getKematian).post(postKematian);
router.route("/:id").put(updateKematian).delete(deleteKematian);

module.exports = router;
