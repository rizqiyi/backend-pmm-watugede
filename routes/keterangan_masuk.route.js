const express = require("express");

const {
  getDataPendudukMasuk,
  getDataPendudukMasukByID,
  postKeteranganPendudukMasuk,
  updateDataKeteranganMasuk,
  deleteDataKeteranganMasuk,
} = require("../controllers/keterangan_masuk.controller");

const router = express.Router({ mergeParams: true });

const multer = require("multer");
const middleware = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}_${Math.floor(
        Math.random() * 100000
      )}_penduduk_masuk.jpg`
    );
  },
});

const upload = multer({
  storage,
});

router.route("/k").all(middleware).get(getDataPendudukMasuk);

router.route("/:id").all(middleware).get(getDataPendudukMasukByID);

router
  .route("/:id/p")
  .all(middleware)
  .post(
    upload.fields([
      { name: "foto_kk", maxCount: 1 },
      { name: "foto_surat_masuk", maxCount: 1 },
    ]),
    postKeteranganPendudukMasuk
  );

router
  .route("/:id_keterangan_masuk")
  .all(middleware)
  .put(
    upload.fields([
      { name: "foto_kk", maxCount: 1 },
      { name: "foto_surat_masuk", maxCount: 1 },
    ]),
    updateDataKeteranganMasuk
  );

router
  .route("/:id_kartu_keluarga/d/:id_keterangan_masuk")
  .all(middleware)
  .delete(deleteDataKeteranganMasuk);

module.exports = router;
