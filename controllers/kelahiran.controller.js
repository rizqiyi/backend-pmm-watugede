const KelahiranSchema = require("../models/kelahiran.model");
const { dateNow } = require("../utilities/date");

//@desc     GET All Data Kelahiran
//@routes   GET
//@access   Private
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

//@desc     Create Data Kelahiran
//@routes   POST
//@access   Private
exports.postKelahiran = async (req, res) => {
  try {
    let {
      nama,
      tanggal_lahir,
      tempat_lahir,
      hubungan_pelapor,
      jenis_kelamin,
      nama_ibu,
      nik_ibu,
      umur_ibu,
      pekerjaan_ibu,
      nama_ayah,
      nik_ayah,
      umur_ayah,
      pekerjaan_ayah,
      alamat,
      created_at,
      updated_at,
    } = req.body;

    const t = await KelahiranSchema.create({
      nama,
      tanggal_lahir,
      tempat_lahir,
      hubungan_pelapor,
      jenis_kelamin,
      created_at,
      updated_at,
      keluarga: {
        nama_ibu,
        nik_ibu,
        umur_ibu,
        pekerjaan_ibu,
        nama_ayah,
        nik_ayah,
        umur_ayah,
        pekerjaan_ayah,
        alamat,
      },
    });

    return res.status(201).json({
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

    return res.status(201).json({
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
      return res.status(201).json({
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
      return res.status(201).json({
        success: false,
        message: "Not Found",
      });

    const t = await KelahiranSchema.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      success: true,
      message: `${t.nama} has been deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
