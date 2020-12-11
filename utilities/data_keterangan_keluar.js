const getRequestDataKeteranganKeluar = (val) => {
  const {
    tanggal_ktp,
    alamat_pindah,
    alasan_pindah,
    pengikut,
    catatan,
    foto_pengusul,
  } = val;

  return {
    tanggal_ktp,
    alamat_pindah,
    alasan_pindah,
    pengikut,
    catatan,
    foto_pengusul,
  };
};

const getRequestDataPendudukMasuk = (val) => {
  const {
    nama_lengkap,
    jenis_kelamin,
    tempat_tanggal_lahir,
    umur,
    agama,
    status_perkawinan,
    pekerjaan,
    pendidikan_terakhir,
    alamat_asal,
    nik,
    posisi_dalam_keluarga,
  } = val;

  return {
    nama_lengkap,
    jenis_kelamin,
    tempat_tanggal_lahir,
    umur,
    agama,
    status_perkawinan,
    pekerjaan,
    pendidikan_terakhir,
    alamat_asal,
    nik,
    posisi_dalam_keluarga,
  };
};

const getRequestDataPendudukKeluar = (val) => {
  const {
    nama_lengkap_keluarga,
    jenis_kelamin_keluarga,
    umur_keluarga,
    status_perkawinan_keluarga,
    pendidikan_terakhir_keluarga,
    nik_keluarga,
    keterangan_dalam_keluarga,
  } = val;

  return {
    nama_lengkap_keluarga,
    jenis_kelamin_keluarga,
    umur_keluarga,
    status_perkawinan_keluarga,
    pendidikan_terakhir_keluarga,
    nik_keluarga,
    keterangan_dalam_keluarga,
  };
};

exports.getRequestDataPendudukKeluar = getRequestDataPendudukKeluar;
exports.getRequestDataKeteranganKeluar = getRequestDataKeteranganKeluar;
exports.getRequestDataPendudukMasuk = getRequestDataPendudukMasuk;
