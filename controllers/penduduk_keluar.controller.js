const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const PendudukSchema = require("../models/penduduk.model");

//@desc     Get All Data Penduduk
//@routes   GET
//@access   Private
exports.getDataPendudukKeluar = async (req, res) => {
  try {
    const t = await PendudukKeluarSchema.find({}).populate({
      path: "penduduk_keluar_desa",
      populate: {
        path: "keluarga_dari",
        model: "kartu_keluarga",
      },
    });

    return res.status(200).json({
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

//@desc     Get Data Penduduk Keluar by ID
//@routes   GET
//@access   Private
exports.getDataPendudukKeluarByID = async (req, res) => {
  try {
    const t = await PendudukSchema.findById(req.params.id_penduduk).populate(
      "pengikut_keluar"
    );

    return res.status(200).json({
      success: true,
      message: "Succesfully fetch your data",
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     Get Spesific Data Penduduk
//@routes   GET
//@access   Private
exports.getDataPendudukKeluarByName = async (req, res) => {
  try {
    const t = await PendudukKeluarSchema.find({
      nama_lengkap_keluarga: req.query.name,
    }).populate("nama_pengusul");

    if (!t)
      return res.status(404).json({
        success: false,
        message: `${t.length} data found`,
      });

    return res.status(200).json({
      success: true,
      message: `${t.length} data found`,
      data: t,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//@desc     POST Data Penduduk
//@routes   POST
//@access   Private
exports.postDataPendudukKeluar = async (req, res) => {
  try {
    const yourId = await PendudukSchema.findById(req.params.id_penduduk);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const findDuplicate = await PendudukKeluarSchema.findOne({
      nomor_kartu_keluarga: req.body.no_kk,
    }).populate("penduduk_keluar_desa");

    if (!findDuplicate) {
      const r = await PendudukKeluarSchema.create({
        nomor_kartu_keluarga: req.body.no_kk,
      });

      await PendudukKeluarSchema.findByIdAndUpdate(
        { _id: r._id },
        {
          $push: {
            penduduk_keluar_desa: yourId._id,
          },
        },
        { upsert: true, new: true, useFindAndModify: false }
      );

      await PendudukSchema.findOneAndUpdate(
        { _id: yourId._id },
        {
          $set: {
            status_penduduk: "penduduk_keluar",
          },
          $push: {
            data_penduduk_keluar: r._id,
          },
        }
      );

      return res.status(201).json({
        success: true,
        message: `Sukses menambahkan ${yourId.nama_lengkap} ke Data Penduduk Keluar`,
      });
    }

    const checkIdIsRegistered = await PendudukSchema.findOne({
      _id: req.params.id_penduduk,
      status_penduduk: "penduduk_keluar",
    });

    if (checkIdIsRegistered)
      return res.status(400).json({
        success: false,
        message:
          "Penduduk yang anda tambahkan sudah terdapat pada data penduduk keluar",
      });

    await PendudukKeluarSchema.findByIdAndUpdate(
      { _id: findDuplicate._id },
      {
        $set: {
          status_penduduk: "penduduk_keluar",
        },
        $push: {
          penduduk_keluar_desa: yourId._id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    await PendudukSchema.findOneAndUpdate(
      { _id: yourId._id },
      {
        $set: {
          status_penduduk: "penduduk_keluar",
        },
        $push: {
          data_penduduk_keluar: findDuplicate._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      message: `Sukses menambahkan ${yourId.nama_lengkap} ke Data Penduduk Keluar`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

//@desc     Update Data Penduduk
//@routes   PUT
//@access   Private
exports.updateDataPendudukKeluar = async (req, res) => {
  try {
    const idPenduduk = await PendudukSchema.findById(req.params.id_penduduk);
    if (!idPenduduk)
      return res.status(404).json({
        success: false,
        message: "ID Penduduk Not Found",
      });

    const idPendudukKeluar = await PendudukKeluarSchema.findById(
      req.params.id_penduduk_keluar
    );

    if (!idPendudukKeluar)
      return res.status(404).json({
        success: false,
        message: "ID Penduduk Keluar Not Found",
      });

    await PendudukKeluarSchema.findByIdAndUpdate(
      { _id: req.params.id_penduduk_keluar },
      {
        ...req.body,
        nama_pengusul: req.params.id_penduduk,
      },
      { upsert: true, new: true },
      (err, result) => {
        if (err)
          return res.status(500).json({
            success: false,
            message: "Something wrong",
            error: err,
          });

        return res.status(200).json({
          success: true,
          message: "Sukses update data penduduk keluar",
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

//@desc     Delete Data Penduduk
//@routes   DELETE
//@access   Private
exports.deleteDataPendudukKeluar = async (req, res) => {
  try {
    const t = await PendudukSchema.findById(req.params.id_penduduk).populate(
      "pengikut_keluar"
    );

    if (!t)
      return res.status(404).json({
        success: false,
        message: "ID Penduduk Not Found",
      });

    const idPendudukKeluar = await PendudukKeluarSchema.findById(
      req.params.id_penduduk_keluar
    );

    if (!idPendudukKeluar)
      return res.status(404).json({
        success: false,
        message: "ID Penduduk Keluar Not Found",
      });

    await PendudukSchema.findById(req.params.id_penduduk, (err, result) => {
      if (err)
        return res.status(500).json({
          success: false,
          message: "Something wrong",
        });
      result.pengikut_keluar.pull(req.params.id_penduduk_keluar);
      result.save();
    });

    const ok = await PendudukKeluarSchema.findByIdAndDelete(
      idPendudukKeluar._id
    );

    return res.status(200).json({
      success: true,
      message: `${ok.nama_lengkap_keluarga} telah dihapus dari data penduduk keluar`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
