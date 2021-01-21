const KelahiranSchema = require("../models/kelahiran.model");
const KematianSchema = require("../models/kematian.model");
const PendudukKeluarSchema = require("../models/penduduk_keluar.model");
const LetterSignatureSchema = require("../models/letters-signature.model");

exports.getSignatureByID = async (req, res) => {
  try {
    const find = await LetterSignatureSchema.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: find,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};

exports.postSignatureKelahiran = async (req, res) => {
  try {
    const findKelahiran = await KelahiranSchema.findById(req.params.id);

    const t = await LetterSignatureSchema.create({
      ...req.body,
      surat_kelahiran: findKelahiran._id,
    });

    await KelahiranSchema.findByIdAndUpdate(
      { _id: findKelahiran._id },
      {
        $push: {
          signatures: t._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};

exports.postSignatureKematian = async (req, res) => {
  try {
    const findKematian = await KematianSchema.findById(req.params.id);

    const t = await LetterSignatureSchema.create({
      ...req.body,
      surat_kematian: findKematian._id,
    });

    await KematianSchema.findByIdAndUpdate(
      { _id: findKematian._id },
      {
        $push: {
          signatures: t._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};

exports.postSignaturePendudukKeluar = async (req, res) => {
  try {
    const findID = await PendudukKeluarSchema.findById(req.params.id);

    const t = await LetterSignatureSchema.create({
      ...req.body,
      surat_kematian: findID._id,
    });

    await PendudukKeluarSchema.findByIdAndUpdate(
      { _id: findID._id },
      {
        $push: {
          signatures: t._id,
        },
      }
    );

    return res.status(201).json({
      success: true,
      data: t,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};
