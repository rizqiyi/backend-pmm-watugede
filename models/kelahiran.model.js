const mongoose = require("mongoose");

const KelahiranSchema = mongoose.Schema(
  {
    nik: {
      type: String,
    },
    nama: {
      type: String,
      trim: true,
    },
    tanggal_lahir: {
      type: String,
    },
    tempat_lahir: {
      type: String,
    },
    hubungan_pelapor: {
      type: String,
    },
    data_ayah: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "penduduk",
    },
    data_ibu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "penduduk",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kelahiran", KelahiranSchema);
