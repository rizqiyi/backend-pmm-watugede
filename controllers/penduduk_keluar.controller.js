const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const PendudukSchema = require("../models/penduduk.model");
const { getRequestDataPendudukKeluar } = require("../utilities/getRequestData");

//@desc     Get All Data Penduduk
//@routes   GET
//@access   Private
exports.getDataPendudukKeluar = async (req, res) => {
  try {
    const t = await PendudukKeluarSchema.find().populate("nama_pengusul");

    return res.status(200).json({
      success: true,
      message: "Succesfully fetch your data",
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
      t,
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
    const idPenduduk = await PendudukSchema.findById(req.params.id_penduduk);

    if (!idPenduduk)
      return res.status(404).json({
        success: false,
        message: "ID Penduduk Not Found",
      });

    const keteranganKeluar = getRequestDataPendudukKeluar(req.body);

    const r = await PendudukKeluarSchema.create({
      nama_lengkap_keluarga: keteranganKeluar.nama_lengkap_keluarga,
      jenis_kelamin_keluarga: keteranganKeluar.jenis_kelamin_keluarga,
      umur_keluarga: keteranganKeluar.umur_keluarga,
      status_perkawinan_keluarga: keteranganKeluar.status_perkawinan_keluarga,
      pendidikan_terakhir_keluarga:
        keteranganKeluar.pendidikan_terakhir_keluarga,
      nik_keluarga: keteranganKeluar.nik_keluarga,
      keterangan_dalam_keluarga: keteranganKeluar.keterangan_dalam_keluarga,
      nama_pengusul: req.params.id_penduduk,
    });

    const t = await PendudukSchema.findByIdAndUpdate(
      req.params.id_penduduk,
      {
        $set: {
          status_penduduk: "penduduk_keluar",
        },
        $push: {
          pengikut_keluar: r._id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: `Sukses menambahkan pengikut keluar ke ${t.nama_lengkap}`,
      data: t,
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
