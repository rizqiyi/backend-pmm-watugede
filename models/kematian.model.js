const mongoose = require("mongoose");

const KematianSchema = mongoose.Schema(
  {
    tanggal_meninggal: {
      type: String,
    },
    tempat_meninggal: {
      type: String,
    },
    penyebab_meninggal: {
      type: String,
    },
    pemilik_data: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "penduduk",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kematian", KematianSchema);
