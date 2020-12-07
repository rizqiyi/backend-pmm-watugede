const mongoose = require("mongoose");
const family = require("./keluarga.model");

const KelahiranSchema = mongoose.Schema(
  {
    nama: {
      type: String,
      trim: true,
      required: true,
    },
    tanggal_lahir: {
      type: Date,
      required: true,
    },
    tempat_lahir: {
      type: String,
      required: true,
    },
    hubungan_pelapor: {
      type: String,
      required: true,
    },
    keluarga: family,
  },
  { timestamps: true }
);

module.exports = mongoose.model("kelahiran", KelahiranSchema);
