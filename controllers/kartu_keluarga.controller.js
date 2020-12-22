const KartuKeluargaSchema = require("../models/kartu_keluarga.model");
const PendudukSchema = require("../models/penduduk.model");

exports.getAllKartuKeluarga = async (req, res) => {
  try {
    const t = await KartuKeluargaSchema.find().populate("anggota_keluarga");

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

exports.getKartuKeluargaByID = async (req, res) => {
  try {
    const t = await KartuKeluargaSchema.findById(req.params.id).populate(
      "anggota_keluarga"
    );

    if (!t)
      return res.status(404).json({
        success: false,
        message: "ID KK Not Found",
      });

    return res.status(200).json({
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

exports.postKartuKeluarga = async (req, res) => {
  try {
    const t = await KartuKeluargaSchema.create({
      no_kk: req.body.no_kk,
    });

    return res.status(201).json({
      success: true,
      message: `Berhasil Menambahkan Kartu Keluarga dengan Nomor KK ${t.no_kk}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updateKartuKeluarga = async (req, res) => {
  try {
    const t = await KartuKeluargaSchema.findById(req.params.id);

    if (!t)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await KartuKeluargaSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
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
      message: "Server Error",
    });
  }
};

exports.deleteKartuKeluarga = async (req, res) => {
  try {
    const t = await KartuKeluargaSchema.findById(req.params.id);

    if (!t)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    await PendudukSchema.deleteMany({ keluarga_dari: req.params.id });

    const deleted = await KartuKeluargaSchema.findByIdAndDelete(req.params.id);

    return res.status(201).json({
      success: true,
      message: `Sukses menghapus No KK ${deleted.no_kk} dari data`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
