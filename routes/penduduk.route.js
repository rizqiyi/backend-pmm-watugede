const express = require("express");
const {
  getPenduduk,
  postPenduduk,
  updatePenduduk,
  deletePenduduk,
  getPendudukByName,
  postMutasiKeluar,
} = require("../controllers/penduduk.controller");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}_${Math.floor(
        Math.random() * 100000
      )}.jpg`
    );
  },
});

const upload = multer({
  storage,
});

//@desc     POST Penduduk Mutasi Keluar
//@routes   POST
//@endpoint /api/penduduk/:id/mutasi_keluar
//@access   Private
router
  .route("/:id/mutasi_keluar")
  .post(upload.single("foto_pengusul"), postMutasiKeluar);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private

//@desc     POST Penduduk
//@routes   POST
//@endpoint /api/penduduk
//@access   Private
router.route("/").get(getPenduduk).post(postPenduduk);

//@desc     GET Penduduk
//@routes   GET
//@endpoint /api/penduduk
//@access   Private
router.route("/s").get(getPendudukByName);

//@desc     Update Penduduk
//@routes   PUT
//@endpoint /api/penduduk/:id
//@access   Private

//@desc     Delete Penduduk
//@routes   DELETE
//@endpoint /api/penduduk/:id
//@access   Private
router.route("/:id").put(updatePenduduk).delete(deletePenduduk);

module.exports = router;
