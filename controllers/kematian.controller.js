const KematianSchema = require("../models/kematian.model");

//@desc     GET All Data Kematian
//@routes   GET
//@access   Private
exports.getKematian = async (req, res) => {
  try {
    const t = await KematianSchema.find();

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

//@desc     Create Data Kematian
//@routes   POST
//@access   Private
exports.postKematian = async (req, res) => {
  try {
    const {
      nama,
      nik,
      jenis_kelamin,
      alamat_asal,
      tanggal_meninggal,
      tempat_meninggal,
      penyebab_meninggal,
    } = req.body;

    const t = await KematianSchema.create({
      nama,
      nik,
      jenis_kelamin,
      alamat_asal,
      tanggal_meninggal,
      tempat_meninggal,
      penyebab_meninggal,
    });

    return res.status(201).json({
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

    const t = await KematianSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json({
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

//@desc     Delete Data Kematian
//@routes   DELTE
//@access   Private
exports.deleteKematian = async (req, res) => {
  try {
    const yourId = await KematianSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const t = await KematianSchema.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      success: true,
      message: `${t.nama} has been deleted`,
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
