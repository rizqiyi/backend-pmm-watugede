const express = require("express");
const {
  getDataByName,
  getKematian,
  postKematian,
  updateKematian,
  deleteKematian,
  postArsipKematian,
  updateArsipKematian,
  deleteArsipKematian,
  getKematianByID,
} = require("../controllers/kematian.controller");

const middleware = require("../middlewares/auth");
const multer = require("multer");
const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}_${Math.floor(
        Math.random() * 100000
      )}_arsip_kematian.jpg`
    );
  },
});

const upload = multer({
  storage,
});

//@desc     GET Spesific Data Kematian
//@routes   GET
//@endpoint /api/kematian/s
//@access   Private
router.route("/s").all(middleware).get(getDataByName);

//@desc     GET All Data Kematian
//@routes   GET
//@endpoint /api/kematian
//@access   Private
router.route("/").all(middleware).get(getKematian);

//@desc     GET All Data Kematian
//@routes   GET
//@endpoint /api/kematian
//@access   Private
router.route("/:id").all(middleware).get(getKematianByID);

//@desc     POST Data Kematian
//@routes   POST
//@endpoint /api/kematian/:id_penduduk
//@access   Private
router.route("/:id_penduduk").all(middleware).post(postKematian);

//@desc     POST Data Arsip Kematian
//@routes   POST
//@endpoint /api/kematian/arsip/:id_penduduk
//@access   Private
router
  .route("/arsip/:id_penduduk")
  .all(middleware)
  .post(upload.single("arsip_kematian"), postArsipKematian);

//@desc     PUT Data Arsip Kematian
//@routes   PUT
//@endpoint /api/kematian/arsip/:id_data
//@access   Private
router
  .route("/arsip/:id_data")
  .all(middleware)
  .put(upload.single("arsip_kematian"), updateArsipKematian);

//@desc     Delete Data Arsip Kematian
//@routes   DELETE
//@endpoint /api/kematian/arsip/:id_data
//@access   Private
router.route("/arsip/:id_data").all(middleware).delete(deleteArsipKematian);

//@desc     Update Data Kematian
//@routes   PUT
//@endpoint /api/kematian/:id
//@access   Private

//@desc     Delete Data Kematian
//@routes   DELETE
//@endpoint /api/kematian/:id
//@access   Private
router.route("/:id").all(middleware).put(updateKematian).delete(deleteKematian);

module.exports = router;
