const PendudukSchema = require("../models/penduduk.model");
const KeteranganMasukSchema = require("../models/keterangan_masuk.model");
const KartuKeluargaSchema = require("../models/kartu_keluarga.model");

//@desc     GET All Data Keterangan Penduduk
//@routes   GET
//@access   Private
exports.getDataPendudukMasuk = async (req, res) => {
  try {
    const t = await PendudukSchema.find({
      status_penduduk: "penduduk_masuk",
    }).populate({
      path: "keluarga_dari",
      model: "kartu_keluarga",
      populate: {
        path: "anggota_keluarga",
        model: "penduduk",
      },
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
    await PendudukSchema.findOne(
      {
        _id: req.params.id,
        status_penduduk: "penduduk_masuk",
        posisi_dalam_keluarga: "Kepala Keluarga",
      },
      (err, doc) => {
        if (err)
          return res.status(404).json({
            success: false,
            message: "Not Found",
          });

        if (!doc)
          return res.status(404).json({
            success: false,
            message: "Penduduk Not Found",
          });

        return res.status(200).json({
          success: true,
          data: doc,
        });
      }
    ).populate({
      path: "keluarga_dari",
      model: "kartu_keluarga",
      populate: {
        path: "anggota_keluarga",
        model: "penduduk",
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     POST Data Penduduk Masuk
//@routes   POST
//@access   Private
exports.postPendudukMasuk = async (req, res) => {
  try {
    const findKK = await KartuKeluargaSchema.findById(req.params.id);

    if (!findKK) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    const findDuplicateNIK = await PendudukSchema.find({
      nik: req.body.nik,
    });

    if (findDuplicateNIK.length > 0)
      return res.status(400).json({
        success: false,
        message: "Nomor NIK yang Anda Inputkan sudah Terdapat Pada Data",
      });

    if (req.body.posisi_dalam_keluarga === "Kepala Keluarga") {
      if (findKK.no_kk !== req.body.nik)
        return res.status(400).json({
          success: false,
          message: "No KK dan No NIK Kepala Keluarga Harus Sama",
        });
    }

    const t = await PendudukSchema.create({
      ...req.body,
      status_penduduk: "penduduk_masuk",
      keluarga_dari: req.params.id,
    });

    await KartuKeluargaSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          anggota_keluarga: t.id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      data: t,
      message: `Berhasil Menambahkan ${t.nama_lengkap} ke Data Penduduk dan Data KK`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
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
      foto_nik: req.files["foto_nik"][0].path,
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
          data: `Sukses menambahkan keterangan masuk ke Data KK ${result.no_kk}`,
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

    const condition = (field, stringField) =>
      req.files[field] ? req.files[field][0].path : stringField;

    await KeteranganMasukSchema.findByIdAndUpdate(
      { _id: req.params.id_keterangan_masuk },
      {
        foto_nik: condition("foto_nik", req.body.foto_nik),
        foto_surat_masuk: condition(
          "foto_surat_masuk",
          req.body.foto_surat_masuk
        ),
      },
      { new: true, upsert: true },
      (err, result) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: "Something wrong",
          });

        return res.status(200).json({
          success: true,
          message: "Sukses update data keterangan masuk penduduk",
          data: result,
        });
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
      message: `Data Keterangan Masuk ${t.nama_lengkap} berhasil dihapus`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};
