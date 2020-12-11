const KelahiranSchema = require("../models/kelahiran.model");
const { getRequestDataKelahiran } = require("../utilities/getRequestData");

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
    const t = getRequestDataKelahiran(req.body);

    const r = await KelahiranSchema.create({
      nama: t.nama,
      tanggal_lahir: t.tanggal_lahir,
      tempat_lahir: t.tempat_lahir,
      hubungan_pelapor: t.hubungan_pelapor,
      jenis_kelamin: t.jenis_kelamin,
      keluarga: {
        nama_ibu: t.nama_ibu,
        nik_ibu: t.nik_ibu,
        umur_ibu: t.umur_ibu,
        pekerjaan_ibu: t.pekerjaan_ibu,
        nama_ayah: t.nama_ayah,
        nik_ayah: t.nik_ayah,
        umur_ayah: t.umur_ayah,
        pekerjaan_ayah: t.pekerjaan_ayah,
        alamat: t.alamat,
      },
    });

    return res.status(201).json({
      success: true,
      data: r,
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
      message: `${t.nama} telah dihapus dari data kelahiran.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
