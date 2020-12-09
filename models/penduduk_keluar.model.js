const mongoose = require("mongoose");

const PendudukKeluarSchema = mongoose.Schema({
  nama_lengkap_keluarga: {
    type: String,
    trim: true,
  },
  jenis_kelamin_keluarga: {
    type: String,
  },
  umur_keluarga: {
    type: String,
  },
  status_perkawinan_keluarga: {
    type: String,
  },
  pendidikan_terakhir_keluarga: {
    type: String,
  },
  nik_keluarga: {
    type: String,
  },
  keterangan: {
    type: String,
  },
  nama_pengusul: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "penduduk",
  },
});

module.exports = mongoose.model("penduduk_keluar", PendudukKeluarSchema);
