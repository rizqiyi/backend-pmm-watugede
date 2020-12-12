const KematianSchema = require("../models/kematian.model");
const PendudukSchema = require("../models/penduduk.model");

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
    const t = await KematianSchema.create({
      ...req.body,
    });

    const b = await PendudukSchema.findOne({ nama_lengkap: t.nama });

    if (b) await PendudukSchema.findByIdAndDelete(b._id);

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

    const t = await KematianSchema.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      success: true,
      message: `${t.nama} telah dihapus dari data kematian.`,
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
