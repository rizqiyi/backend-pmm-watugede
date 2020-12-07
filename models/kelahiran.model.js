const mongoose = require("mongoose");

const KeluargaSchema = mongoose.Schema({
  nama_ibu: {
    type: String,
    trim: true,
    required: true,
  },
  nik_ibu: {
    type: String,
    required: true,
  },
  umur_ibu: {
    type: String,
    required: true,
  },
  pekerjaan_ibu: {
    type: String,
    required: true,
  },
  nama_ayah: {
    type: String,
    trim: true,
    required: true,
  },
  nik_ayah: {
    type: String,
    required: true,
  },
  umur_ayah: {
    type: String,
    required: true,
  },
  pekerjaan_ayah: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
    trim: true,
  },
});

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
    keluarga: KeluargaSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("kelahiran", KelahiranSchema);
