const mongoose = require("mongoose");

const KartuKeluargaSchema = mongoose.Schema(
  {
    no_kk: {
      type: String,
      index: "text",
    },
    anggota_keluarga: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "penduduk",
      },
    ],
    data_masuk: {
      type: Boolean,
      default: false,
    },
    data_penduduk_masuk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "keterangan_masuk",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kartu_keluarga", KartuKeluargaSchema);
