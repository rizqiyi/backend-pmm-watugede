const ActivitySchema = require("../models/activity.model");
const AdminSchema = require("../models/admin.model");
const PendudukSchema = require("../models/penduduk.model");
const KartuKeluargaSchema = require("../models/kartu_keluarga.model");
const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const PendudukMasukSchema = require("../models/keterangan_masuk.model");
const KematianSchema = require("../models/kematian.model");

exports.getAllCountedData = async (req, res) => {
  try {
    const maleData = await PendudukSchema.countDocuments({
      jenis_kelamin: "Laki laki",
    });

    const femaleData = await PendudukSchema.countDocuments({
      jenis_kelamin: "Perempuan",
    });

    const countPenduduk = await PendudukSchema.estimatedDocumentCount();

    const countKK = await KartuKeluargaSchema.estimatedDocumentCount();

    const countPendudukKeluar = await PendudukKeluarSchema.estimatedDocumentCount();

    const countPendudukMasuk = await PendudukMasukSchema.estimatedDocumentCount();

    const inCompleteDataPendudukKeluar = await PendudukKeluarSchema.countDocuments(
      {
        keterangan_keluar_desa: null,
      }
    );

    const inCompleteDataPendudukMasuk = await KartuKeluargaSchema.countDocuments(
      {
        $and: [{ data_masuk: true }, { data_penduduk_masuk: null }],
      }
    );

    const inCompleteDataKematian = await KematianSchema.countDocuments({
      arsip_kematian: null,
    });

    return res.status(200).json({
      success: true,
      data: {
        data_penduduk: countPenduduk,
        data_kk: countKK,
        data_penduduk_keluar: countPendudukKeluar,
        data_penduduk_masuk: countPendudukMasuk,
        data_pria: maleData,
        data_wanita: femaleData,
        inc_data_penduduk_masuk: inCompleteDataPendudukMasuk,
        inc_data_penduduk_keluar: inCompleteDataPendudukKeluar,
        inc_data_kematian: inCompleteDataKematian,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getActivityData = async (req, res) => {
  try {
    const all = await ActivitySchema.find({}, null, {
      sort: {
        createdAt: -1,
      },
    }).populate("activity_by", "nama_lengkap");

    return res.status(200).json({
      success: true,
      message: "Succesfully fetch your data",
      data: all,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.postActivityWhenLogOut = async (req, res) => {
  try {
    const findUser = await AdminSchema.findById(req.params.id);

    if (!findUser)
      return res.status(400).json({
        success: false,
        message: "Admin Not Found",
      });

    const activity = await ActivitySchema.create({
      activity_name: `${findUser.nama_lengkap} Telah Logout.`,
      activity_by: findUser._id,
    });

    await AdminSchema.findByIdAndUpdate(
      { _id: findUser._id },
      {
        $push: {
          activity: activity._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: "Sukses Logout",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
