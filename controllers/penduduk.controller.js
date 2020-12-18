const PendudukSchema = require("../models/penduduk.model");
const KeteranganKeluarSchema = require("../models/keterangan_keluar.model");
const PendudukKeluarSchema = require("../models/penduduk_keluar.model");

//@desc     GET All Data Penduduk
//@routes   GET
//@access   Private
exports.getPenduduk = async (req, res) => {
  try {
    const t = await PendudukSchema.find().populate(
      "pengikut_keluar keterangan_keluar keterangan_masuk"
    );

    return res.status(200).json({
      success: true,
      count: t.length,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//@desc     GET All Data Penduduk
//@routes   GET
//@access   Private
exports.getPendudukById = async (req, res) => {
  try {
    const t = await PendudukSchema.findById(req.params.id).populate(
      "pengikut_keluar keterangan_keluar keterangan_masuk"
    );

    return res.status(200).json({
      success: true,
      count: t.length,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//@desc     POST Data Penduduk
//@routes   POST
//@access   Private
exports.postPenduduk = async (req, res) => {
  try {
    const t = await PendudukSchema.create({
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      data: t,
      message: `Berhasil Menambahkan ${t.nama_lengkap} ke Penduduk`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//@desc     Update Data Penduduk
//@routes   PUT
//@access   Private
exports.updatePenduduk = async (req, res) => {
  try {
    const yourId = await PendudukSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await PendudukSchema.findByIdAndUpdate(
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

        return res.status(200).json({
          success: true,
          message: "Berhasil Update Data",
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

//@desc     Delete Data Penduduk
//@routes   DELETE
//@access   Private
exports.deletePenduduk = async (req, res) => {
  try {
    const yourId = await PendudukSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not found",
      });

    const t = await PendudukSchema.findByIdAndDelete(req.params.id);

    await KeteranganKeluarSchema.findOneAndDelete({
      nama_pengusul_keterangan: req.params.id,
    });

    await PendudukKeluarSchema.deleteMany({
      nama_pengusul: req.params.id,
    });

    return res.status(200).json({
      success: true,
      message: `Sukses menghapus ${t.nama_lengkap} dari penduduk`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//@desc     Get Spesific Data Penduduk
//@routes   GET
//@access   Private
exports.getPendudukByName = async (req, res) => {
  try {
    const t = await PendudukSchema.findOne({ nama_lengkap: req.query.name });

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
      message: "Server error",
    });
  }
};
