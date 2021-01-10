const KelahiranSchema = require("../models/kelahiran.model");
const PendudukSchema = require("../models/penduduk.model");

//@desc     GET All Data Kelahiran
//@routes   GET
//@access   Private
exports.getKelahiran = async (req, res) => {
  try {
    const t = await KelahiranSchema.find().populate("data_ayah data_ibu");

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

//@desc     GET All Data Kelahiran
//@routes   GET
//@access   Private
exports.getKelahiranById = async (req, res) => {
  try {
    const t = await KelahiranSchema.findById(req.params.id).populate({
      path: "data_ayah data_ibu",
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

//@desc     Create Data Kelahiran
//@routes   POST
//@access   Private
exports.postKelahiran = async (req, res) => {
  try {
    const find = await PendudukSchema.find({ nik: req.body.nik });

    if (find.length > 0)
      return res.status(400).json({
        success: false,
        message: "NIK yang anda inputkan sudah terdapat pada data penduduk",
      });

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

//@desc     GET Spesific Data Kelahiran
//@routes   GET
//@access   Private
exports.getDataByName = async (req, res) => {
  try {
    const t = await KelahiranSchema.findOne({ nama: req.query.name });

    if (!t)
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });

    return res.status(200).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc     Update Data Kelahiran
//@routes   PUT
//@access   Private
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

//@desc     Delete Data Kelahiran
//@routes   DELETE
//@access   Private
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
