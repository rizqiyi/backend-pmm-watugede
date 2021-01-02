const express = require("express");

const {
  getDataPendudukMasuk,
  getDataPendudukMasukByID,
  postKeteranganPendudukMasuk,
  postPendudukMasuk,
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

//@desc     Get Data Penduduk Masuk By ID
//@routes   GET
//@endpoint /api/penduduk_masuk/:id
//@access   Private
router.route("/:id").all(middleware).get(getDataPendudukMasukByID);

//@desc     POST Data Penduduk Masuk
//@routes   POST
//@endpoint /api/penduduk_masuk/p
//@access   Private
router.route("/p").all(middleware).post(postPendudukMasuk);

//@desc     Post Data Keterangan Penduduk Masuk
//@routes   POST
//@endpoint /api/penduduk_masuk/:id/p
//@access   Private
router
  .route("/:id/p")
  .all(middleware)
  .post(
    upload.fields([
      { name: "foto_nik", maxCount: 1 },
      { name: "foto_surat_masuk", maxCount: 1 },
    ]),
    postKeteranganPendudukMasuk
  );

//@desc     Update Data Keterangan Penduduk Masuk
//@routes   PUT
//@endpoint /api/penduduk_masuk/id_keterangan_masuk
//@access   Private
router
  .route("/:id_keterangan_masuk")
  .all(middleware)
  .put(
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
  .route("/:id_kartu_keluarga/d/:id_keterangan_masuk")
  .all(middleware)
  .delete(deleteDataKeteranganMasuk);

module.exports = router;
