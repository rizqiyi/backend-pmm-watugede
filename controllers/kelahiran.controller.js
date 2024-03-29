const KelahiranSchema = require("../models/kelahiran.model");
const PendudukSchema = require("../models/penduduk.model");
const LetterSignatureSchema = require("../models/letters-signature.model");

exports.getKelahiran = async (req, res) => {
  try {
    const t = await KelahiranSchema.find().populate({
      path: "data_ayah data_ibu",
      populate: {
        path: "keluarga_dari",
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
      error: "Server error",
    });
  }
};

exports.getKelahiranById = async (req, res) => {
  try {
    const t = await KelahiranSchema.findById(req.params.id).populate({
      path: "signatures data_ayah data_ibu",
      populate: {
        path: "keluarga_dari",
      },
    });

    if (!t)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    return res.status(200).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.postKelahiran = async (req, res) => {
  try {
    const findFather = await PendudukSchema.findOne({ nik: req.body.nik_ayah });

    if (!findFather)
      return res.status(404).json({
        success: false,
        message: "Data ayah tidak ditemukan",
      });

    const findMother = await PendudukSchema.findOne({ nik: req.body.nik_ibu });

    if (!findMother)
      return res.status(404).json({
        success: false,
        message: "Data ibu tidak ditemukan",
      });

    const t = await KelahiranSchema.create({
      ...req.body,
      data_ayah: findFather._id,
      data_ibu: findMother._id,
    });

    await PendudukSchema.findByIdAndUpdate(
      {
        _id: findFather._id,
      },
      {
        $push: {
          data_kelahiran: t._id,
        },
      }
    );

    await PendudukSchema.findByIdAndUpdate(
      {
        _id: findMother._id,
      },
      {
        $push: {
          data_kelahiran: t._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: `Berhasil Menambahkan ${t.nama} ke Data Kelahiran`,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};

exports.updateDataById = async (req, res) => {
  try {
    const yourId = await KelahiranSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await KelahiranSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      { upsert: true, new: true },
      (err, result) => {
        return res.status(200).json({
          success: true,
          data: result,
          message: `Berhasil memperbarui data kelahiran atas nama ${result.nama}`,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteDataById = async (req, res) => {
  try {
    const yourId = await KelahiranSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await PendudukSchema.updateMany(
      { $or: [{ _id: yourId.data_ayah }, { _id: yourId.data_ibu }] },
      {
        $pull: {
          data_kelahiran: yourId._id,
        },
      }
    );

    await LetterSignatureSchema.deleteOne({
      _id: yourId.signatures,
    });

    const t = await KelahiranSchema.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: `${t.nama} telah dihapus dari data kelahiran.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
