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
  umur: {
    type: String,
    required: true,
  },
  pekerjaan: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
    trim: true,
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
  umur: {
    type: String,
    required: true,
  },
  pekerjaan: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = KeluargaSchema;
