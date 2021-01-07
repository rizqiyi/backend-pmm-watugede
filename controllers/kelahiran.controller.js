const KelahiranSchema = require("../models/kelahiran.model");
const PendudukSchema = require("../models/penduduk.model");

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
