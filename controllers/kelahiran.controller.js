const KelahiranSchema = require("../models/kelahiran.model");

//@desc     GET all kelahiran
//@routes   GET
//@access   Public
exports.getKelahiran = async (req, res) => {
  try {
    const kelahiran = await KelahiranSchema.find();

    return res.status(200).json({
      success: true,
      count: kelahiran.length,
      data: kelahiran,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

//@desc     Create food
//@routes   POST
//@access   Private
exports.postKelahiran = async (req, res) => {
  try {
    const { nama, tanggal_lahir, tempat_lahir, hubungan_pelapor } = req.body;

    const kelahiran = await KelahiranSchema.insertMany({
      nama,
      tanggal_lahir,
      tempat_lahir,
      hubungan_pelapor,
    });

    return res.status(201).json({
      success: true,
      data: kelahiran,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
