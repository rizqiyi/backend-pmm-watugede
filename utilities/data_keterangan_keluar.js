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

const getRequestDataPendudukKeluar = (val) => {
  const {
    nama_lengkap_keluarga,
    jenis_kelamin_keluarga,
    umur_keluarga,
    status_perkawinan_keluarga,
    pendidikan_terakhir_keluarga,
    nik_keluarga,
    keterangan,
  } = val;

  return {
    nama_lengkap_keluarga,
    jenis_kelamin_keluarga,
    umur_keluarga,
    status_perkawinan_keluarga,
    pendidikan_terakhir_keluarga,
    nik_keluarga,
    keterangan,
  };
};

exports.getRequestDataPendudukKeluar = getRequestDataPendudukKeluar;
exports.getRequestDataKeteranganKeluar = getRequestDataKeteranganKeluar;
