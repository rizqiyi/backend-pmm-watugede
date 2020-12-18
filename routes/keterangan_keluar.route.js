const express = require("express");
const {
  getKeteranganPendudukKeluar,
  updateKeteranganPendudukKeluar,
  deleteKeteranganPendudukKeluar,
  postKeteranganPendudukKeluar,
  getKeteranganPendudukKeluarByIDPenduduk,
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

//@desc     Post Data Keterangan Keluar
//@routes   POST
//@endpoint /api/keterangan/:id
//@access   Private
router
  .route("/:id_penduduk")
  .all(middleware)
  .post(upload.single("foto_pengusul"), postKeteranganPendudukKeluar);

//@desc     GET Data Keterangan Keluar
//@routes   GET
//@endpoint /api/keterangan/:id
//@access   Private
router.route("/:id").all(middleware).get(getKeteranganPendudukKeluar);

//@desc     GET Data Keterangan Keluar By ID Penduduk
//@routes   GET
//@endpoint /api/keterangan/p/:id
//@access   Private
router
  .route("/p/:id")
  .all(middleware)
  .get(getKeteranganPendudukKeluarByIDPenduduk);

//@desc     Update Data Keterangan Keluar
//@routes   PUT
//@endpoint /api/keterangan/:id
//@access   Private
router
  .route("/:id")
  .all(middleware)
  .put(upload.single("foto_pengusul"), updateKeteranganPendudukKeluar);

//@desc     Delete Data Keterangan Keluar
//@routes   DELETE
//@endpoint /api/keterangan/:id_penduduk/d/:id_keterangan_keluar
//@access   Private
router
  .route("/:id_penduduk/d/:id_keterangan_keluar")
  .all(middleware)
  .delete(deleteKeteranganPendudukKeluar);

module.exports = router;
