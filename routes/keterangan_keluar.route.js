// const express = require("express");
// const {
//   getKeteranganKeluar,
//   postKeteranganKeluar,
//   updateKeteranganKeluar,
//   deleteKeteranganKeluar,
//   getDataKeluarByName,
// } = require("../controllers/keterangan_keluar.controller");
// const multer = require("multer");
// const router = express.Router({ mergeParams: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./assets");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}_${Date.now()}_${Math.floor(
//         Math.random() * 100000
//       )}.jpg`
//     );
//   },
// });

// const upload = multer({
//   storage,
// });

// router.route("/s").get(getDataKeluarByName);

// router
//   .route("/")
//   .get(getKeteranganKeluar)
//   .post(upload.single("foto_pengusul"), postKeteranganKeluar);

// router
//   .route("/:id")
//   .put(upload.single("foto_pengusul"), updateKeteranganKeluar)
//   .delete(deleteKeteranganKeluar);

// module.exports = router;
