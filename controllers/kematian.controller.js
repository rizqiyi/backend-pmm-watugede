const KematianSchema = require("../models/kematian.model");
const PendudukSchema = require("../models/penduduk.model");
const ArsipKematianSchema = require("../models/arsip_kematian.model");

//@desc     GET All Data Kematian
//@routes   GET
//@access   Private
exports.getKematian = async (req, res) => {
  try {
    const t = await KematianSchema.find().populate(
      "arsip_kematian pemilik_data"
    );

    return res.status(201).json({
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

exports.getKematianByID = async (req, res) => {
  try {
    const find = await KematianSchema.findById(req.params.id).populate(
      "pemilik_data arsip_kematian"
    );

    if (!find)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    return res.status(200).json({
      success: true,
      data: find,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     Create Data Kematian
//@routes   POST
//@access   Private
exports.postKematian = async (req, res) => {
  try {
    const findPenduduk = await PendudukSchema.findById(req.params.id_penduduk);

    if (!findPenduduk)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    // check if this person was dead then cancel the creating data.
    if (findPenduduk.status_penduduk === "meninggal") {
      return res.status(400).json({
        success: false,
        message: "Penduduk ini sudah terdapat pada data kematian",
      });
    }

    const t = await KematianSchema.create({
      tanggal_meninggal: req.body.tanggal_meninggal,
      tempat_meninggal: req.body.tempat_meninggal,
      penyebab_meninggal: req.body.penyebab_meninggal,
      pemilik_data: findPenduduk._id,
    });

    const data = await PendudukSchema.findByIdAndUpdate(
      { _id: findPenduduk._id },
      {
        $set: {
          status_penduduk: "meninggal",
        },
        $push: {
          data_kematian: t._id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: `Berhasil menambahkan ${data.nama_lengkap} ke data kematian.`,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.postArsipKematian = async (req, res) => {
  try {
    const findData = await KematianSchema.findById(req.params.id_penduduk);

    if (!findData)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const t = await ArsipKematianSchema.create({
      arsip_kematian: req.file.path,
      pemilik: findData._id,
    });

    await KematianSchema.findByIdAndUpdate(
      { _id: findData._id },
      {
        $push: {
          arsip_kematian: t._id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: "Berhasil menambahkan Data Arsip Kematian",
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.updateArsipKematian = async (req, res) => {
  try {
    const findData = await ArsipKematianSchema.findById(req.params.id_data);

    if (!findData)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await ArsipKematianSchema.updateOne(
      { _id: findData._id },
      {
        $set: {
          arsip_kematian: req.file.path,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Arsip Kematian Berhasil Diperbarui",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.deleteArsipKematian = async (req, res) => {
  try {
    const findData = await ArsipKematianSchema.findById(req.params.id_data);

    if (!findData)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await KematianSchema.findByIdAndUpdate(
      { _id: findData.pemilik },
      {
        $pull: {
          arsip_kematian: findData._id,
        },
      }
    );

    await ArsipKematianSchema.deleteOne({ _id: findData._id });

    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus data arsip kematian",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

//@desc     Update Data Kematian
//@routes   PUT
//@access   Private
exports.updateKematian = async (req, res) => {
  try {
    const yourId = await KematianSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await KematianSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      { upsert: true, new: true },
      (err, result) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: "Something wrong",
          });

        return res.status(201).json({
          success: true,
          data: result,
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

//@desc     Delete Data Kematian
//@routes   DELETE
//@access   Private
exports.deleteKematian = async (req, res) => {
  try {
    const yourId = await KematianSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const t = await PendudukSchema.findByIdAndUpdate(
      { _id: yourId.pemilik_data },
      {
        $set: {
          status_penduduk: "",
        },
        $pull: { data_kematian: yourId._id },
      }
    );

    await KematianSchema.deleteOne({ _id: yourId._id });

    return res.status(200).json({
      success: true,
      message: `Berhasil menghapus data kematian dari penduduk atas nama ${t.nama_lengkap}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     Get Spesific Data Kematian
//@routes   GET
//@access   Private
exports.getDataByName = async (req, res) => {
  try {
    const t = await KematianSchema.findOne({ nama: req.query.name });

    if (!t)
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
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
