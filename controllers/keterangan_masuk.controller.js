const PendudukSchema = require("../models/penduduk.model");
const KeteranganMasukSchema = require("../models/keterangan_masuk.model");
const KartuKeluargaSchema = require("../models/kartu_keluarga.model");

//@desc     GET All Data Keterangan Penduduk
//@routes   GET
//@access   Private
exports.getDataPendudukMasuk = async (req, res) => {
  try {
    const t = await KartuKeluargaSchema.find({
      data_masuk: true,
    }).populate({
      path: "anggota_keluarga data_penduduk_masuk",
    });

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

//@desc     GET Data Keterangan Penduduk By ID
//@routes   GET
//@access   Private
exports.getDataPendudukMasukByID = async (req, res) => {
  try {
    const doc = await KartuKeluargaSchema.findById(req.params.id).populate({
      path: "anggota_keluarga data_penduduk_masuk",
    });

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};

//@desc     Post Data Keterangan Penduduk Masuk
//@routes   POST
//@access   Private
exports.postKeteranganPendudukMasuk = async (req, res) => {
  try {
    const yourId = await KartuKeluargaSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const t = await KeteranganMasukSchema.create({
      foto_kk: req.files["foto_kk"][0].path,
      foto_surat_masuk: req.files["foto_surat_masuk"][0].path,
      pemilik: req.params.id,
    });

    KartuKeluargaSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          data_penduduk_masuk: t._id,
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
          data: `Sukses Menambahkan Data Keterangan Masuk ke Data KK ${result.no_kk}`,
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

//@desc     Update Data Keterangan Penduduk
//@routes   PUT
//@access   Private
exports.updateDataKeteranganMasuk = async (req, res) => {
  try {
    const idKeteranganMasuk = await KeteranganMasukSchema.findById(
      req.params.id_keterangan_masuk
    );

    if (!idKeteranganMasuk)
      return res.status(404).json({
        success: false,
        message: "ID Keterangan Masuk Not Found",
      });

    await KeteranganMasukSchema.findById(
      { _id: req.params.id_keterangan_masuk },
      {},
      async (err, result) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: "Something wrong",
          });

        await KeteranganMasukSchema.findByIdAndUpdate(
          {
            _id: req.params.id_keterangan_masuk,
          },
          {
            foto_kk: req.files["foto_kk"]
              ? req.files["foto_kk"][0].path
              : result.foto_kk,
            foto_surat_masuk: req.files["foto_surat_masuk"]
              ? req.files["foto_surat_masuk"][0].path
              : result.foto_surat_masuk,
          },
          { new: true },
          (err, result) => {
            return res.status(200).json({
              success: true,
              message: "Sukses update data keterangan masuk penduduk",
              data: result,
            });
          }
        );
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

//@desc     Delete Data Keterangan Penduduk Masuk
//@routes   DELETE
//@access   Private
exports.deleteDataKeteranganMasuk = async (req, res) => {
  try {
    const idKK = await KartuKeluargaSchema.findById(
      req.params.id_kartu_keluarga
    );

    if (!idKK)
      return res.status(404).json({
        success: false,
        message: "ID KK Not Found",
      });

    const idKeteranganMasuk = await KeteranganMasukSchema.findById(
      req.params.id_keterangan_masuk
    );

    if (!idKeteranganMasuk)
      return res.status(404).json({
        success: false,
        message: "ID Keterangan Masuk Not Found",
      });

    const t = await KartuKeluargaSchema.findByIdAndUpdate(
      req.params.id_kartu_keluarga,
      {
        $pull: {
          data_penduduk_masuk: req.params.id_keterangan_masuk,
        },
      }
    );

    await KeteranganMasukSchema.findByIdAndDelete(
      req.params.id_keterangan_masuk
    );

    return res.status(200).json({
      success: true,
      message: `Data Keterangan Masuk ${t.no_kk} berhasil dihapus`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};
