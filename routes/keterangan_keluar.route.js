const express = require("express");
const {
  getKeteranganPenduduk,
  updateKeteranganPenduduk,
} = require("../controllers/keterangan_keluar.controller");

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

router.route("/:id").get(getKeteranganPenduduk);

router
  .route("/:id")
  .put(upload.single("foto_pengusul"), updateKeteranganPenduduk);

module.exports = router;
