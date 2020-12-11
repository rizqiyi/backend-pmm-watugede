const PendudukSchema = require("../models/penduduk.model");

//@desc     GET All Data Penduduk
//@routes   GET
//@access   Private
exports.getPenduduk = async (req, res) => {
  try {
    const t = await PendudukSchema.find().populate(
      "pengikut_keluar keterangan_keluar"
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
          message: "Successfully Updated Data",
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

    return res.status(200).json({
      success: true,
      message: `Successfully deleted ${t.nama_lengkap} from penduduk`,
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
