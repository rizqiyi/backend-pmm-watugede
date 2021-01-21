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

router
  .route("/:id/p")
  .post(postSignatureKelahiran)
  .post(postSignatureKematian)
  .post(postSignaturePendudukKeluar);

router.route("/:id/u").put(updateSignatureByID);

module.exports = router;
