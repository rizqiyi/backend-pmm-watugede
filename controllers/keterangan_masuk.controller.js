const PendudukSchema = require("../models/penduduk.model");
const KeteranganMasukSchema = require("../models/keterangan_masuk.model");
const {
  getRequestDataPendudukMasuk,
} = require("../utilities/data_keterangan_keluar");

exports.getDataPendudukMasuk = async (req, res) => {
  try {
    const t = await PendudukSchema.find({
      status_penduduk: "penduduk_masuk",
    }).populate("keterangan_keluar pengikut_keluar keterangan_masuk");

    return res.status(200).json({
      success: true,
      count: t.length,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.postDataPendudukMasuk = async (req, res) => {
  try {
    const dataMasuk = getRequestDataPendudukMasuk(req.body);
    const r = await PendudukSchema.create([
      {
        nama_lengkap: dataMasuk.nama_lengkap,
        jenis_kelamin: dataMasuk.jenis_kelamin,
        tempat_tanggal_lahir: dataMasuk.tempat_tanggal_lahir,
        umur: dataMasuk.umur,
        agama: dataMasuk.agama,
        status_perkawinan: dataMasuk.status_perkawinan,
        pekerjaan: dataMasuk.pekerjaan,
        pendidikan_terakhir: dataMasuk.pendidikan_terakhir,
        alamat_asal: dataMasuk.alamat_asal,
        nik: dataMasuk.nik,
        posisi_dalam_keluarga: dataMasuk.posisi_dalam_keluarga,
        status_penduduk: "penduduk_masuk",
      },
    ]);

    return res.status(201).json({
      success: true,
      data: r,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.postKeteranganPendudukMasuk = async (req, res) => {
  try {
    const yourId = await PendudukSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const t = await KeteranganMasukSchema.create({
      foto_nik: req.files["foto_nik"][0].path,
      foto_surat_masuk: req.files["foto_surat_masuk"][0].path,
      pemilik: req.params.id,
    });

    PendudukSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          keterangan_masuk: t._id,
        },
      },
      (err, result) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: "Not Found",
          });

        return res.status(201).json({
          success: true,
          data: `Succesfully added your keterangan masuk to ${result.nama_lengkap}`,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
