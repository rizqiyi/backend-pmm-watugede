const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const PendudukSchema = require("../models/penduduk.model");
const {
  getRequestDataPendudukKeluar,
} = require("../utilities/data_keterangan_keluar");

exports.getDataPendudukKeluar = async (req, res) => {
  try {
    const t = await PendudukKeluarSchema.find().populate("nama_pengusul");

    return res.status(200).json({
      success: true,
      message: "Succesfully fetch your data",
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

exports.getDataPendudukKeluarByName = async (req, res) => {
  try {
    const t = await PendudukKeluarSchema.find({
      nama_lengkap_keluarga: req.query.name,
    }).populate("nama_pengusul");

    if (!t)
      return res.status(404).json({
        success: false,
        message: `${t.length} data found`,
      });

    return res.status(200).json({
      success: true,
      message: `${t.length} data found`,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.postDataPendudukKeluar = async (req, res) => {
  try {
    const idPenduduk = await PendudukSchema.findById(req.params.id_penduduk);

    if (!idPenduduk)
      return res.status(404).json({
        success: false,
        message: "ID Penduduk Not Found",
      });

    const keteranganKeluar = getRequestDataPendudukKeluar(req.body);

    const r = await PendudukKeluarSchema.create({
      nama_lengkap_keluarga: keteranganKeluar.nama_lengkap_keluarga,
      jenis_kelamin_keluarga: keteranganKeluar.jenis_kelamin_keluarga,
      umur_keluarga: keteranganKeluar.umur_keluarga,
      status_perkawinan_keluarga: keteranganKeluar.status_perkawinan_keluarga,
      pendidikan_terakhir_keluarga:
        keteranganKeluar.pendidikan_terakhir_keluarga,
      nik_keluarga: keteranganKeluar.nik_keluarga,
      keterangan_dalam_keluarga: keteranganKeluar.keterangan_dalam_keluarga,
      nama_pengusul: req.params.id_penduduk,
    });

    const t = await PendudukSchema.findByIdAndUpdate(
      req.params.id_penduduk,
      {
        $set: {
          keluar_desa: true,
        },
        $push: {
          pengikut_keluar: r._id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: `Success add new pengikut keluar to ${t.nama_lengkap}`,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateDataPendudukKeluar = async (req, res) => {
  res.send("update penduduk keluar");
};

exports.deleteDataPendudukKeluar = async (req, res) => {
  res.send("delete penduduk keluar");
};
