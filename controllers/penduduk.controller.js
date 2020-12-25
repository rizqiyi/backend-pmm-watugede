const PendudukSchema = require("../models/penduduk.model");
const KeteranganKeluarSchema = require("../models/keterangan_keluar.model");
const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const KartuKeluargaSchema = require("../models/kartu_keluarga.model");

//@desc     GET All Data Penduduk
//@routes   GET
//@access   Private
exports.getPenduduk = async (req, res) => {
  try {
    const t = await PendudukSchema.find().select(
      "-__v -pengikut_keluar -keterangan_keluar"
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

exports.getKepalaKeluargaById = async (req, res) => {
  try {
    await PendudukSchema.findOne(
      {
        _id: req.params.id,
        posisi_dalam_keluarga: "Kepala Keluarga",
      },
      (err, doc) => {
        if (err)
          return res.status(404).json({
            success: false,
            message: "Not Found",
          });

        return res.status(200).json({
          success: true,
          data: doc,
        });
      }
    ).populate({
      path: "keluarga_dari",
      model: "kartu_keluarga",
      populate: {
        path: "anggota_keluarga",
        model: "penduduk",
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getPendudukByNamaKepalaKeluarga = async (req, res) => {
  try {
    const t = await PendudukSchema.find({
      posisi_dalam_keluarga: "Kepala Keluarga",
    }).populate({
      path: "keluarga_dari",
      model: "kartu_keluarga",
      populate: {
        path: "anggota_keluarga",
        model: "penduduk",
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

//@desc     GET All Data Penduduk
//@routes   GET
//@access   Private
exports.getPendudukById = async (req, res) => {
  try {
    const t = await PendudukSchema.findById(req.params.id).populate(
      "pengikut_keluar keterangan_keluar keterangan_masuk keluarga_dari"
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
    const findKK = await KartuKeluargaSchema.findById(req.params.id);

    if (!findKK) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    const findDuplicateNIK = await PendudukSchema.find({
      nik: req.body.nik,
    });

    if (findDuplicateNIK.length > 0)
      return res.status(400).json({
        success: false,
        message: "Nomor NIK yang Anda Inputkan sudah Terdapat Pada Data",
      });

    if (req.body.posisi_dalam_keluarga === "Kepala Keluarga") {
      if (findKK.no_kk !== req.body.nik)
        return res.status(400).json({
          success: false,
          message: "No KK dan No NIK Kepala Keluarga Harus Sama",
        });
    }

    const t = await PendudukSchema.create({
      ...req.body,
      keluarga_dari: req.params.id,
    });

    await KartuKeluargaSchema.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          anggota_keluarga: t.id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      data: t,
      message: `Berhasil Menambahkan ${t.nama_lengkap} ke Data Penduduk dan Data KK`,
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
          message: `Berhasil Perbarui Data Penduduk ${result.nama_lengkap}`,
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
// referensi lama
exports.deletePenduduk = async (req, res) => {
  try {
    // const yourId = await PendudukSchema.findById(req.params.id);
    // if (!yourId)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Not found",
    //   });
    // const t = await PendudukSchema.findByIdAndDelete(req.params.id);
    // await KeteranganKeluarSchema.findOneAndDelete({
    //   nama_pengusul_keterangan: req.params.id,
    // });
    // await PendudukKeluarSchema.deleteMany({
    //   nama_pengusul: req.params.id,
    // });
    // return res.status(200).json({
    //   success: true,
    //   message: `Sukses menghapus ${t.nama_lengkap} dari penduduk`,
    // });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// terbaru
exports.deletePendudukPadaKK = async (req, res) => {
  try {
    const idPenduduk = await PendudukSchema.findById(req.params.id_penduduk);

    if (!idPenduduk)
      return res.status(404).json({
        success: false,
        message: "Id Penduduk Not Found",
      });

    const idKK = await KartuKeluargaSchema.findById(req.params.id_kk);

    if (!idKK)
      return res.status(404).json({
        success: false,
        message: "Id KK Not Found",
      });

    const t = await PendudukSchema.findByIdAndDelete(req.params.id_penduduk);

    const r = await KartuKeluargaSchema.findByIdAndUpdate(req.params.id_kk, {
      $pull: {
        anggota_keluarga: req.params.id_penduduk,
      },
    });

    await KartuKeluargaSchema.findOne({ _id: r._id }, async (err, result) => {
      if (err)
        return res.status(200).json({
          success: false,
          message: "Something wrong",
        });

      // Check if anggota keluarga is null then delete unused kartu keluarga
      if (result.anggota_keluarga.length === 0) {
        await KartuKeluargaSchema.deleteOne({ _id: result._id });
      }
    });

    return res.status(200).json({
      success: true,
      message: `Sukses menghapus ${t.nama_lengkap} dari penduduk`,
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
exports.getPendudukByName = async (req, res) => {
  try {
    const t = await PendudukSchema.find({
      nama_lengkap: req.query.name,
      posisi_dalam_keluarga: "Kepala Keluarga",
    }).populate(
      "pengikut_keluar keterangan_keluar keterangan_masuk keluarga_dari"
    );

    if (t.length === 0)
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

//@desc     Get Spesific Data Penduduk By No KK Kepala Keluarga
//@routes   GET
//@access   Private
exports.getPendudukByNoKK = async (req, res) => {
  try {
    const t = await PendudukSchema.find({
      nik: req.query.no_kk,
      posisi_dalam_keluarga: "Kepala Keluarga",
    }).populate(
      "pengikut_keluar keterangan_keluar keterangan_masuk keluarga_dari"
    );

    if (t.length === 0)
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
