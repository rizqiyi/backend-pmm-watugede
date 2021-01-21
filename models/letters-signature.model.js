const mongoose = require("mongoose");

const LetterSignature = mongoose.Schema({
  nama_lengkap: {
    type: String,
    trim: true,
  },
  nama_jabatan: {
    type: String,
  },
  surat_kelahiran: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "kelahiran",
  },
  surat_kematian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "kematian",
  },
  surat_keluar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "keterangan_keluar",
  },
});

module.exports = mongoose.model("signature", LetterSignature);
