const express = require("express");
const {
  getSignatureByID,
  postSignatureKelahiran,
  postSignatureKematian,
  postSignaturePendudukKeluar,
  updateSignatureByID,
} = require("../controllers/letters-signature.controller");

const router = express.Router();

//@desc     Fetch signature data
//@routes   GET
//@endpoint /api/signature/:id
//@access   Private
router.route("/:id").get(getSignatureByID);

//@desc     Create kelahiran letter signature
//@routes   POST
//@endpoint /api/signature/:id/p/kelahiran
//@access   Private
router.route("/:id/p/kelahiran").post(postSignatureKelahiran);

//@desc     Create kematian letter signature
//@routes   POST
//@endpoint /api/signature/:id/p/kematian
//@access   Private
router.route("/:id/p/kematian").post(postSignatureKematian);

//@desc     Create keluar letter signature
//@routes   POST
//@endpoint /api/signature/:id/p/keluar
//@access   Private
router.route("/:id/p/keluar").post(postSignaturePendudukKeluar);

//@desc     Update signature data
//@routes   PUT
//@endpoint /api/signature/:id/u
//@access   Private
router.route("/:id/u").put(updateSignatureByID);

module.exports = router;
