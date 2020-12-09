const PendudukSchema = require("../models/penduduk.model");
const KeteranganKeluarSchema = require("../models/keterangan_keluar.model");
const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const {
  getRequestDataPendudukKeluar,
  getRequestDataKeteranganKeluar,
} = require("../utilities/data_keterangan_keluar");

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

//@desc     POST Data Mutasi Keluar Penduduk
//@routes   POST
//@access   Private
exports.postMutasiKeluar = async (req, res) => {
  try {
    const yourId = await PendudukSchema.findById(req.params.id);

    if (!yourId)
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });

    const keteranganKeluar = getRequestDataPendudukKeluar(req.body);
    const dataPenduduk = getRequestDataKeteranganKeluar(req.body);

    const t = await PendudukKeluarSchema.create({
      nama_lengkap_keluarga: keteranganKeluar.nama_lengkap_keluarga,
      jenis_kelamin_keluarga: keteranganKeluar.jenis_kelamin_keluarga,
      umur_keluarga: keteranganKeluar.umur_keluarga,
      status_perkawinan_keluarga: keteranganKeluar.status_perkawinan_keluarga,
      pendidikan_terakhir_keluarga:
        keteranganKeluar.pendidikan_terakhir_keluarga,
      nik_keluarga: keteranganKeluar.nik_keluarga,
      keterangan_dalam_keluarga: keteranganKeluar.keterangan_dalam_keluarga,
      nama_pengusul: req.params.id,
    });

    const fotoPengusulPath = req.file.path;

    const r = await KeteranganKeluarSchema.create({
      tanggal_ktp: dataPenduduk.tanggal_ktp,
      alamat_pindah: dataPenduduk.alamat_pindah,
      alasan_pindah: dataPenduduk.alasan_pindah,
      pengikut: dataPenduduk.pengikut,
      catatan: dataPenduduk.catatan,
      foto_pengusul: fotoPengusulPath,
      nama_pengusul_keterangan: req.params.id,
    });

    const ok = await PendudukSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          keluar_desa: true,
        },
        $push: {
          pengikut_keluar: t._id,
          keterangan_keluar: r._id,
        },
      },
      { upsert: true, new: true, useFindAndModify: false }
    );

    return res.status(200).json({
      success: true,
      message: "Success Added Penduduk Keluar",
      data: ok,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
