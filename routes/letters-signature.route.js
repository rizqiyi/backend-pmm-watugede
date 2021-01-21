const express = require("express");
const {
  getSignatureByID,
  postSignatureKelahiran,
} = require("../controllers/letters-signature.controller");
const router = express.Router();

router.route("/:id").get(getSignatureByID);

router.route("/:id").post(postSignatureKelahiran);

module.exports = router;
