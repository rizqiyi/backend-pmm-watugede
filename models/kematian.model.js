const mongoose = require("mongoose");

const KematianSchema = mongoose.Schema(
  {
    nama: {
      type: String,
    },
    nik: {
      type: String,
    },
    jenis_kelamin: {
      type: String,
    },
    alamat_asal: {
      type: String,
    },
    tanggal_meninggal: {
      type: String,
    },
    tempat_meninggal: {
      type: String,
    },
    penyebab_meninggal: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kematian", KematianSchema);
