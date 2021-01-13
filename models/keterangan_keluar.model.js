const mongoose = require("mongoose");

const KeteranganKeluarSchema = mongoose.Schema({
  nomor_surat: {
    type: String,
  },
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
  kewarganegaraan: {
    type: String,
  },
  foto_pengusul: {
    type: String,
  },
  meninggalkan_desa_pada: {
    type: String,
  },
  keterangan_keluar_oleh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "penduduk_keluar",
  },
});

module.exports = mongoose.model("keterangan_keluar", KeteranganKeluarSchema);
