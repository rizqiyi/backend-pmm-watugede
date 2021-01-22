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

router.route("/s").all(middleware).get(getDataByName);

router.route("/").all(middleware).get(getKematian);

router.route("/:id").all(middleware).get(getKematianByID);

router.route("/:id_penduduk").all(middleware).post(postKematian);

router
  .route("/arsip/:id_penduduk")
  .all(middleware)
  .post(upload.single("arsip_kematian"), postArsipKematian);

router
  .route("/arsip/:id_data")
  .all(middleware)
  .put(upload.single("arsip_kematian"), updateArsipKematian);

router.route("/arsip/:id_data").all(middleware).delete(deleteArsipKematian);

router.route("/:id").all(middleware).put(updateKematian).delete(deleteKematian);

module.exports = router;
