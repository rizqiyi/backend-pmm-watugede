const KeteranganKeluarSchema = require("../models/keterangan_keluar.model");
const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const {
  getRequestDataKeteranganKeluar,
} = require("../utilities/getRequestData");

//@desc     Post Data Keterangan Penduduk Keluar
//@routes   POST
//@access   Private
exports.postKeteranganPendudukKeluar = async (req, res) => {
  try {
    const findPendudukKeluar = await PendudukKeluarSchema.findById(
      req.params.id_penduduk_keluar
    );

    if (!findPendudukKeluar)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const dataToPost = getRequestDataKeteranganKeluar(req.body);

    const t = await KeteranganKeluarSchema.create({
      nomor_surat: dataToPost.nomor_surat,
      tanggal_ktp: dataToPost.tanggal_ktp,
      alamat_pindah: dataToPost.alamat_pindah,
      alasan_pindah: dataToPost.alasan_pindah,
      pengikut: dataToPost.pengikut,
      catatan: dataToPost.catatan,
      foto_pengusul: req.file.path,
      meninggalkan_desa_pada: dataToPost.meninggalkan_desa_pada,
      keterangan_keluar_oleh: req.params.id_penduduk_keluar,
    });

    await PendudukKeluarSchema.findByIdAndUpdate(
      { _id: req.params.id_penduduk_keluar },
      {
        $push: {
          keterangan_keluar_desa: t._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

//@desc     GET All Data Keterangan Penduduk Keluar
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
      data: yourId,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     Update Data Keterangan Penduduk Keluar
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
            message: "Sukses update data keterangan penduduk",
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
            message: "Sukses update data keterangan penduduk",
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

//@desc     Delete Data Keterangan Penduduk Keluar
//@routes   DELETE
//@access   Private
exports.deleteKeteranganPendudukKeluar = async (req, res) => {
  try {
    const findPendudukKeluar = await PendudukKeluarSchema.findById(
      req.params.id_penduduk_keluar
    );

    if (!findPendudukKeluar)
      return res.status(404).json({
        success: false,
        message: "Id Penduduk Keluar Not Found",
      });

    const findKeteranganKeluar = await KeteranganKeluarSchema.findById(
      req.params.id_keterangan_keluar
    );

    if (!findKeteranganKeluar)
      return res.status(404).json({
        success: false,
        message: "Id Keterangan Keluar Not Found",
      });

    const t = await PendudukKeluarSchema.findByIdAndUpdate(
      req.params.id_penduduk_keluar,
      {
        $pull: {
          keterangan_keluar_desa: req.params.id_keterangan_keluar,
        },
      }
    );

    await KeteranganKeluarSchema.deleteOne({
      _id: req.params.id_keterangan_keluar,
    });

    return res.status(200).json({
      success: true,
      message: `Sukses menghapus data keterangan keluar dari nomor kk ${t.nomor_kartu_keluarga}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
