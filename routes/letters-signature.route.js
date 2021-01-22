const express = require("express");
const {
  getSignatureByID,
  postSignatureKelahiran,
  postSignatureKematian,
  postSignaturePendudukKeluar,
  updateSignatureByID,
} = require("../controllers/letters-signature.controller");

const router = express.Router();

router.route("/:id").get(getSignatureByID);

router.route("/:id/p/kelahiran").post(postSignatureKelahiran);

router.route("/:id/p/kematian").post(postSignatureKematian);

router.route("/:id/p/keluar").post(postSignaturePendudukKeluar);

router.route("/:id/u").put(updateSignatureByID);

module.exports = router;
