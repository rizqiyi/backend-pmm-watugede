const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const PendudukSchema = require("../models/penduduk.model");
const KartuKeluargaSchema = require("../models/kartu_keluarga.model");
const KeteranganKeluarSchema = require("../models/keterangan_keluar.model");
const { find } = require("../models/keterangan_keluar.model");

//@desc     Get All Data Penduduk
//@routes   GET
//@access   Private
exports.getDataPendudukKeluar = async (req, res) => {
  try {
    const t = await PendudukKeluarSchema.find({}).populate({
      path: "penduduk_keluar_desa keterangan_keluar_desa",
      populate: {
        path: "keluarga_dari",
        model: "kartu_keluarga",
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

//@desc     Get Data Penduduk Keluar by ID
//@routes   GET
//@access   Private
exports.getDataPendudukKeluarByID = async (req, res) => {
  try {
    const t = await PendudukKeluarSchema.findById(
      req.params.id_penduduk
    ).populate({
      path: "penduduk_keluar_desa keterangan_keluar_desa",
      populate: {
        path: "keluarga_dari",
        model: "kartu_keluarga",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Succesfully fetch your data",
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     Get Spesific Data Penduduk
//@routes   GET
//@access   Private
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

exports.postManyDataPendudukKeluar = async (req, res) => {
  try {
    const findID = await KartuKeluargaSchema.findById(req.params.id_penduduk);

    if (!findID)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await KartuKeluargaSchema.updateOne(
      { _id: findID._id },
      {
        $set: {
          data_masuk: false,
        },
      }
    );

    const findDuplicateEntries = await PendudukSchema.find({
      _id: {
        $in: findID.anggota_keluarga,
      },
      status_penduduk: "penduduk_keluar",
    });

    if (findDuplicateEntries.length > 0)
      return res.status(400).json({
        success: false,
        message:
          "Data yang Anda Tambahkan Sudah Terdapat Pada Data Penduduk Keluar",
      });

    const t = await PendudukKeluarSchema.create({
      nomor_kartu_keluarga: findID.no_kk,
    });

    await PendudukSchema.updateMany(
      { _id: findID.anggota_keluarga },
      {
        $set: {
          status_penduduk: "penduduk_keluar",
        },
      }
    );

    await PendudukKeluarSchema.updateOne(
      { _id: t._id },
      {
        $push: {
          penduduk_keluar_desa: findID.anggota_keluarga,
        },
      }
    );

    return res.status(201).json({
      success: true,
      message:
        "Berhasil Menambahkan Semua Anggota Keluarga ke Data Penduduk Keluar",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

//@desc     POST Data Penduduk
//@routes   POST
//@access   Private
exports.postDataPendudukKeluar = async (req, res) => {
  try {
    const yourId = await PendudukSchema.findById(req.params.id_penduduk);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const findDuplicate = await PendudukKeluarSchema.findOne({
      nomor_kartu_keluarga: req.body.no_kk,
    }).populate("penduduk_keluar_desa");

    if (!findDuplicate) {
      const r = await PendudukKeluarSchema.create({
        nomor_kartu_keluarga: req.body.no_kk,
      });

      await PendudukKeluarSchema.findByIdAndUpdate(
        { _id: r._id },
        {
          $push: {
            penduduk_keluar_desa: yourId._id,
          },
        },
        { upsert: true, new: true, useFindAndModify: false }
      );

      await PendudukSchema.findOneAndUpdate(
        { _id: yourId._id },
        {
          $set: {
            status_penduduk: "penduduk_keluar",
          },
          $push: {
            data_penduduk_keluar: r._id,
          },
        }
      );

      return res.status(201).json({
        success: true,
        message: `Sukses menambahkan ${yourId.nama_lengkap} ke Data Penduduk Keluar`,
      });
    }

    const checkIdIsRegistered = await PendudukSchema.findOne({
      _id: req.params.id_penduduk,
      status_penduduk: "penduduk_keluar",
    });

    if (checkIdIsRegistered)
      return res.status(400).json({
        success: false,
        message:
          "Penduduk yang anda tambahkan sudah terdapat pada data penduduk keluar",
      });

    await PendudukKeluarSchema.findByIdAndUpdate(
      { _id: findDuplicate._id },
      {
        $set: {
          status_penduduk: "penduduk_keluar",
        },
        $push: {
          penduduk_keluar_desa: yourId._id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    await PendudukSchema.findOneAndUpdate(
      { _id: yourId._id },
      {
        $set: {
          status_penduduk: "penduduk_keluar",
        },
        $push: {
          data_penduduk_keluar: findDuplicate._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: `Sukses menambahkan ${yourId.nama_lengkap} ke Data Penduduk Keluar`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

//@desc     Delete Data Penduduk
//@routes   DELETE
//@access   Private
exports.deleteDataPendudukKeluar = async (req, res) => {
  try {
    const findPenduduk = await PendudukSchema.findById(req.params.id_penduduk);

    if (!findPenduduk)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const findPendudukKeluar = await PendudukKeluarSchema.findById(
      req.params.id_penduduk_keluar
    );

    if (!findPendudukKeluar)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const t = await PendudukSchema.findByIdAndUpdate(
      { _id: req.params.id_penduduk },
      {
        $set: {
          status_penduduk: "",
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    await PendudukKeluarSchema.findByIdAndUpdate(
      { _id: req.params.id_penduduk_keluar },
      {
        $pull: {
          penduduk_keluar_desa: req.params.id_penduduk,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: `Sukses menghapus ${t.nama_lengkap} dari data penduduk keluar`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.deleteAllDataPendudukKeluar = async (req, res) => {
  try {
    const findData = await PendudukKeluarSchema.findById(req.params.id_data);

    if (!findData)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await PendudukSchema.updateMany(
      { _id: findData.penduduk_keluar_desa },
      {
        $set: {
          status_penduduk: "",
        },
      }
    );

    await KeteranganKeluarSchema.deleteOne({
      _id: findData.keterangan_keluar_desa,
    });

    await PendudukKeluarSchema.deleteOne({ _id: req.params.id_data });

    return res.status(200).json({
      success: true,
      message: "Sukses Menghapus Semua Data Penduduk Keluar",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};
