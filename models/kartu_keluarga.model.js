const mongoose = require("mongoose");

const KartuKeluargaSchema = mongoose.Schema(
  {
    no_kk: {
      type: String,
    },
    anggota_keluarga: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "penduduk",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("kartu_keluarga", KartuKeluargaSchema);
