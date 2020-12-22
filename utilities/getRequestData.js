const getRequestDataKeteranganKeluar = (val) => {
  const {
    tanggal_ktp,
    alamat_pindah,
    alasan_pindah,
    pengikut,
    catatan,
    foto_pengusul,
    meninggalkan_desa_pada,
    nomor_surat,
  } = val;

  return {
    tanggal_ktp,
    alamat_pindah,
    alasan_pindah,
    pengikut,
    catatan,
    foto_pengusul,
    meninggalkan_desa_pada,
    nomor_surat,
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

const getRequestDataKelahiran = (val) => {
  const {
    nama,
    tanggal_lahir,
    tempat_lahir,
    hubungan_pelapor,
    jenis_kelamin,
    nama_ibu,
    nik_ibu,
    umur_ibu,
    pekerjaan_ibu,
    nama_ayah,
    nik_ayah,
    umur_ayah,
    pekerjaan_ayah,
    alamat,
  } = val;

  return {
    nama,
    tanggal_lahir,
    tempat_lahir,
    hubungan_pelapor,
    jenis_kelamin,
    nama_ibu,
    nik_ibu,
    umur_ibu,
    pekerjaan_ibu,
    nama_ayah,
    nik_ayah,
    umur_ayah,
    pekerjaan_ayah,
    alamat,
  };
};

exports.getRequestDataPendudukKeluar = getRequestDataPendudukKeluar;
exports.getRequestDataKeteranganKeluar = getRequestDataKeteranganKeluar;
exports.getRequestDataPendudukMasuk = getRequestDataPendudukMasuk;
exports.getRequestDataKelahiran = getRequestDataKelahiran;
