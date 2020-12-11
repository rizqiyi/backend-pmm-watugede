const express = require("express");

const {
  getDataPendudukMasuk,
  postDataPendudukMasuk,
  postKeteranganPendudukMasuk,
  getDataPendudukMasukByName,
  updateDataKeteranganMasuk,
  deleteDataKeteranganMasuk,
} = require("../controllers/keterangan_masuk.controller");

const router = express.Router({ mergeParams: true });

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
      )}_penduduk_masuk.jpg`
    );
  },
});

const upload = multer({
  storage,
});

//@desc     Get Spesific Data Penduduk Masuk By Name
//@routes   GET
//@endpoint /api/penduduk_masuk/s
//@access   Private
router.route("/s").get(getDataPendudukMasukByName);

//@desc     Get All Data Penduduk Masuk
//@routes   GET
//@endpoint /api/penduduk_masuk
//@access   Private

//@desc     Post Data Penduduk Masuk
//@routes   POST
//@endpoint /api/penduduk_masuk
//@access   Private
router.route("/").get(getDataPendudukMasuk).post(postDataPendudukMasuk);

//@desc     Post Data Keterangan Penduduk Masuk
//@routes   POST
//@endpoint /api/penduduk_masuk/:id/p
//@access   Private
router.route("/:id/p").post(
  upload.fields([
    { name: "foto_nik", maxCount: 1 },
    { name: "foto_surat_masuk", maxCount: 1 },
  ]),
  postKeteranganPendudukMasuk
);

//@desc     Update Data Keterangan Penduduk Masuk
//@routes   PUT
//@endpoint /api/penduduk_masuk/:id_penduduk/u/id_keterangan_masuk
//@access   Private
router.route("/:id_penduduk/u/:id_keterangan_masuk").put(
  upload.fields([
    { name: "foto_nik", maxCount: 1 },
    { name: "foto_surat_masuk", maxCount: 1 },
  ]),
  updateDataKeteranganMasuk
);

//@desc     Delete Data Keterangan Penduduk Masuk
//@routes   DELETE
//@endpoint /api/penduduk_masuk/:id_penduduk/d/id_keterangan_masuk
//@access   Private
router
  .route("/:id_penduduk/d/:id_keterangan_masuk")
  .delete(deleteDataKeteranganMasuk);

module.exports = router;
