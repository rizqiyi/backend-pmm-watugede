const express = require("express");

const {
  getDataPendudukMasuk,
  postDataPendudukMasuk,
  postKeteranganPendudukMasuk,
} = require("../controllers/keterangan_masuk.controller");

const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.originalname}_${Date.now()}_${Math.floor(
        Math.random() * 100000
      )}_penduduk_masuk.jpg`
    );
  },
});

const upload = multer({
  storage,
});

router.route("/").get(getDataPendudukMasuk).post(postDataPendudukMasuk);

router.route("/:id/p").post(
  upload.fields([
    { name: "foto_nik", maxCount: 1 },
    { name: "foto_surat_masuk", maxCount: 1 },
  ]),
  postKeteranganPendudukMasuk
);

module.exports = router;
