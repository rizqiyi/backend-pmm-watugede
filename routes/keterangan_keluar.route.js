const express = require("express");
const {
  getKeteranganPendudukKeluar,
  updateKeteranganPendudukKeluar,
  deleteKeteranganPendudukKeluar,
  postKeteranganPendudukKeluar,
} = require("../controllers/keterangan_keluar.controller");

const router = express.Router();

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
      )}.jpg`
    );
  },
});

const upload = multer({
  storage,
});

router
  .route("/:id_penduduk_keluar")
  .all(middleware)
  .post(upload.single("foto_pengusul"), postKeteranganPendudukKeluar);

router.route("/:id").all(middleware).get(getKeteranganPendudukKeluar);

router
  .route("/:id")
  .all(middleware)
  .put(upload.single("foto_pengusul"), updateKeteranganPendudukKeluar);

router
  .route("/:id_penduduk_keluar/d/:id_keterangan_keluar")
  .all(middleware)
  .delete(deleteKeteranganPendudukKeluar);

module.exports = router;
