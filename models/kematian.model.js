const mongoose = require("mongoose");

const KematianSchema = mongoose.Schema(
  {
    tanggal_meninggal: {
      type: String,
    },
    hari_meninggal: {
      type: String,
    },
    tempat_meninggal: {
      type: String,
    },
    penyebab_meninggal: {
      type: String,
    },
    nomor_surat_kematian: {
      type: String,
    },
    arsip_kematian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "arsip_kematian",
    },
    pemilik_data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "penduduk",
    },
    signatures: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signature",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kematian", KematianSchema);
