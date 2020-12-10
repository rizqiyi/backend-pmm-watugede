const KeteranganKeluarSchema = require("../models/keterangan_keluar.model");
const PendudukSchema = require("../models/penduduk.model");
const {
  getRequestDataKeteranganKeluar,
} = require("../utilities/data_keterangan_keluar");

exports.postKeteranganPendudukKeluar = async (req, res) => {
  try {
    const yourId = await PendudukSchema.findById(req.params.id_penduduk);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const dataPenduduk = getRequestDataKeteranganKeluar(req.body);

    const t = await KeteranganKeluarSchema.create({
      tanggal_ktp: dataPenduduk.tanggal_ktp,
      alamat_pindah: dataPenduduk.alamat_pindah,
      alasan_pindah: dataPenduduk.alasan_pindah,
      pengikut: dataPenduduk.pengikut,
      catatan: dataPenduduk.catatan,
      foto_pengusul: req.file.path,
      nama_pengusul_keterangan: req.params.id_penduduk,
    });

    await PendudukSchema.findByIdAndUpdate(req.params.id_penduduk, {
      $push: {
        keterangan_keluar: t._id,
      },
    });

    return res.status(201).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     GET All Data Keterangan Penduduk
//@routes   GET
//@access   Private
exports.getKeteranganPendudukKeluar = async (req, res) => {
  try {
    const yourId = await KeteranganKeluarSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    return res.status(200).json({
      success: true,
      message: yourId,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     Update Data Keterangan Penduduk
//@routes   PUT
//@access   Private
exports.updateKeteranganPendudukKeluar = async (req, res) => {
  try {
    const yourId = await KeteranganKeluarSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    if (req.file) {
      await KeteranganKeluarSchema.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body, foto_pengusul: req.file.path },
        { new: true, upsert: true },
        (err, result) => {
          return res.status(200).json({
            success: true,
            message: "Successfully updated keterangan penduduk",
            data: result,
          });
        }
      );
    } else {
      await KeteranganKeluarSchema.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true, upsert: true },
        (err, result) => {
          return res.status(200).json({
            success: true,
            message: "Successfully updated keterangan penduduk",
            data: result,
          });
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deleteKeteranganPendudukKeluar = async (req, res) => {
  try {
    const idPenduduk = await PendudukSchema.findById(req.params.id_penduduk);

    if (!idPenduduk)
      return res.status(404).json({
        success: false,
        message: "Id Penduduk Not Found",
      });

    const idKeteranganKeluar = await KeteranganKeluarSchema.findById(
      req.params.id_keterangan_keluar
    );

    if (!idKeteranganKeluar)
      return res.status(404).json({
        success: false,
        message: "Id Keterangan Keluar Not Found",
      });

    await PendudukSchema.findByIdAndUpdate(req.params.id_penduduk, {
      $pull: {
        keterangan_keluar: req.params.id_keterangan_keluar,
      },
    });

    await KeteranganKeluarSchema.findByIdAndDelete(
      req.params.id_keterangan_keluar
    );

    return res.status(200).json({
      success: true,
      message: `Successfully deleted your data master.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
