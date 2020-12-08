const mongoose = require("mongoose");

const DaftarKeluargaSchema = mongoose.Schema({
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
});

const MutasiKeluarSchema = mongoose.Schema(
  {
    nama_pengusul: {
      type: String,
      trim: true,
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
    kewarganegaraan: {
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
    keluarga_ikut: [DaftarKeluargaSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("keterangan_keluar", MutasiKeluarSchema);
