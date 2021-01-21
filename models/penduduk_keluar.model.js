const mongoose = require("mongoose");

const PendudukKeluarSchema = mongoose.Schema(
  {
    nomor_kartu_keluarga: {
      type: String,
    },
    keterangan_keluar_desa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "keterangan_keluar",
    },
    signatures: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signature",
    },
    penduduk_keluar_desa: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "penduduk",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("penduduk_keluar", PendudukKeluarSchema);
