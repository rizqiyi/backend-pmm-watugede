const mongoose = require("mongoose");

const KeteranganKeluarSchema = mongoose.Schema({
  tanggal_ktp: {
    type: String,
  },
  alamat_pindah: {
    type: String,
  },
  alasan_pindah: {
    type: String,
  },
  pengikut: {
    type: Number,
    default: 0,
  },
  catatan: {
    type: String,
  },
  foto_pengusul: {
    type: String,
  },
  nama_pengusul_keterangan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "penduduk",
  },
});

module.exports = mongoose.model("keterangan_keluar", KeteranganKeluarSchema);
