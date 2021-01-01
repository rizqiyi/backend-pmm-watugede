const mongoose = require("mongoose");

const PendudukMasukSchema = mongoose.Schema({
  foto_nik: {
    type: String,
  },
  foto_surat_masuk: {
    type: String,
  },
  pemilik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "kartu_keluarga",
  },
});

module.exports = mongoose.model("keterangan_masuk", PendudukMasukSchema);
