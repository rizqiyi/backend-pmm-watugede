const mongoose = require("mongoose");

const PendudukSchema = mongoose.Schema(
  {
    nama_lengkap: {
      type: String,
    },
    jenis_kelamin: {
      type: String,
    },
    tempat_tanggal_lahir: {
      type: String,
    },
    umur: {
      type: String,
    },
    agama: {
      type: String,
    },
    status_perkawinan: {
      type: String,
    },
    pekerjaan: {
      type: String,
    },
    pendidikan_terakhir: {
      type: String,
    },
    alamat_asal: {
      type: String,
    },
    nik: {
      type: String,
    },
    posisi_dalam_keluarga: {
      type: String,
      default: "",
    },
    status_penduduk: {
      type: String,
      default: "",
    },
    keluarga_dari: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kartu_keluarga",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("penduduk", PendudukSchema);
