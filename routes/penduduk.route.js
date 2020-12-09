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

router
  .route("/:id/mutasi_keluar")
  .post(upload.single("foto_pengusul"), postMutasiKeluar);
router.route("/").get(getPenduduk).post(postPenduduk);
router.route("/s").get(getPendudukByName);
router.route("/:id").put(updatePenduduk).delete(deletePenduduk);

module.exports = router;
