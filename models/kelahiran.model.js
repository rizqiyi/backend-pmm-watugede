const mongoose = require("mongoose");

const KeluargaSchema = mongoose.Schema({
  nama_ibu: {
    type: String,
    trim: true,
  },
  nik_ibu: {
    type: String,
  },
  umur_ibu: {
    type: String,
  },
  pekerjaan_ibu: {
    type: String,
  },
  nama_ayah: {
    type: String,
    trim: true,
  },
  nik_ayah: {
    type: String,
  },
  umur_ayah: {
    type: String,
  },
  pekerjaan_ayah: {
    type: String,
  },
  alamat: {
    type: String,
    trim: true,
  },
});

const KelahiranSchema = mongoose.Schema(
  {
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
    keluarga: KeluargaSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("kelahiran", KelahiranSchema);
