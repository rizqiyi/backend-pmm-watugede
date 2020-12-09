// const MutasiKeluarSchema = require("../models/keterangan_keluar.model");
// const getRequestDataMutasiKeluar = require("../utilities/data_keterangan_keluar");

// //@desc     Get All Data Mutasi Keluar
// //@routes   GET
// //@access   Private
// exports.getKeteranganKeluar = async (req, res) => {
//   try {
//     const t = await MutasiKeluarSchema.find();

//     return res.status(201).json({
//       success: true,
//       count: t.length,
//       data: t,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// //@desc     Create Data Kematian
// //@routes   POST
// //@access   Private
// exports.postKeteranganKeluar = async (req, res) => {
//   try {
//     const t = getRequestDataMutasiKeluar(req.body);

//     const fotoPengusulPath = req.file.path;

//     await MutasiKeluarSchema.create({
//       nama_pengusul: t.nama_pengusul,
//       jenis_kelamin: t.jenis_kelamin,
//       tempat_tanggal_lahir: t.tempat_tanggal_lahir,
//       umur: t.umur,
//       kewarganegaraan: t.kewarganegaraan,
//       agama: t.agama,
//       status_perkawinan: t.status_perkawinan,
//       pekerjaan: t.pekerjaan,
//       pendidikan_terakhir: t.pendidikan_terakhir,
//       alamat_asal: t.alamat_asal,
//       nik: t.nik,
//       tanggal_ktp: t.tanggal_ktp,
//       alamat_pindah: t.alamat_pindah,
//       alasan_pindah: t.alasan_pindah,
//       pengikut: t.pengikut,
//       catatan: t.catatan,
//     });

//     await MutasiKeluarSchema.keluarga_ikut.insertMany({
//       nama_lengkap_keluarga: t.nama_lengkap_keluarga,
//       jenis_kelamin_keluarga: t.jenis_kelamin_keluarga,
//       umur_keluarga: t.umur_keluarga,
//       status_perkawinan_keluarga: t.status_perkawinan_keluarga,
//       pendidikan_terakhir_keluarga: t.pendidikan_terakhir_keluarga,
//       nik_keluarga: t.nik_keluarga,
//       keterangan: t.keterangan,
//     });

//     // await MutasiKeluarSchema.create({
//     //   nama_pengusul: t.nama_pengusul,
//     //   jenis_kelamin: t.jenis_kelamin,
//     //   tempat_tanggal_lahir: t.tempat_tanggal_lahir,
//     //   umur: t.umur,
//     //   kewarganegaraan: t.kewarganegaraan,
//     //   agama: t.agama,
//     //   status_perkawinan: t.status_perkawinan,
//     //   pekerjaan: t.pekerjaan,
//     //   pendidikan_terakhir: t.pendidikan_terakhir,
//     //   alamat_asal: t.alamat_asal,
//     //   nik: t.nik,
//     //   tanggal_ktp: t.tanggal_ktp,
//     //   alamat_pindah: t.alamat_pindah,
//     //   alasan_pindah: t.alasan_pindah,
//     //   pengikut: t.pengikut,
//     //   catatan: t.catatan,
//     //   foto_pengusul: fotoPengusulPath,
//     //   keluarga_ikut: {
//     //     nama_lengkap_keluarga: t.nama_lengkap_keluarga,
//     //     jenis_kelamin_keluarga: t.jenis_kelamin_keluarga,
//     //     umur_keluarga: t.umur_keluarga,
//     //     status_perkawinan_keluarga: t.status_perkawinan_keluarga,
//     //     pendidikan_terakhir_keluarga: t.pendidikan_terakhir_keluarga,
//     //     nik_keluarga: t.nik_keluarga,
//     //     keterangan: t.keterangan,
//     //   },
//     // });

//     return res.status(201).json({
//       success: true,
//       data: t,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// //@desc     Update Data Kematian
// //@routes   PUT
// //@access   Private
// exports.updateKeteranganKeluar = async (req, res) => {
//   try {
//     const yourId = await MutasiKeluarSchema.findById(req.params.id);

//     if (!yourId)
//       return res.status(404).json({
//         status: false,
//         message: "Not Found",
//       });

//     if (req.file) {
//       await MutasiKeluarSchema.findByIdAndUpdate(
//         { _id: req.params.id },
//         {
//           ...req.body,
//           foto_pengusul: req.file.path,
//         },
//         { upsert: true, new: true },
//         (err, result) => {
//           if (err)
//             return res.status(500).json({
//               success: false,
//               message: "Something wrong",
//             });

//           return res.status(201).json({
//             success: true,
//             data: result,
//           });
//         }
//       );
//     } else {
//       await MutasiKeluarSchema.findByIdAndUpdate(
//         { _id: req.params.id },
//         {
//           ...req.body,
//         },
//         { upsert: true, new: true },
//         (err, result) => {
//           if (err)
//             return res.status(500).json({
//               success: false,
//               message: "Something wrong",
//             });

//           return res.status(201).json({
//             success: true,
//             data: result,
//           });
//         }
//       );
//     }
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// //@desc     Delete Data Kematian
// //@routes   DELETE
// //@access   Private
// exports.deleteKeteranganKeluar = async (req, res) => {
//   try {
//     const yourId = await MutasiKeluarSchema.findById(req.params.id);

//     if (!yourId)
//       return res.status(404).json({
//         success: false,
//         message: "Not found",
//       });

//     const t = await MutasiKeluarSchema.findByIdAndDelete(req.params.id);

//     return res.status(201).json({
//       success: true,
//       message: `Data Mutasi Keluar ${t.nama_pengusul} Telah Dihapus`,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// //@desc     Get Spesific Data Kematian
// //@routes   GET
// //@access   Private
// exports.getDataKeluarByName = async (req, res) => {
//   try {
//     const t = await MutasiKeluarSchema.findOne({
//       nama_pengusul: req.query.name,
//     });

//     if (!t)
//       return res.status(404).json({
//         success: false,
//         message: "Not Found",
//       });

//     return res.status(201).json({
//       success: true,
//       data: t,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
