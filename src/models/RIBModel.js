// Model de la route '/RIBs'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

let Schema = new mongoose.Schema({
  companyname: { type: String }, // le nom de la société
  HQId: { type: String },   // l'id du HQ
  iban: { type: String },    // l'IBAN du RIB
  status: { type: String},   // le statut de certification du RIB
});

let Model = mongoose.model('RIB', Schema);

export default {
  getRIBs: () => {
    return Model.find({}).exec();
  },

  getRIB: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createRIB: (RIB) => {
    return Model.create({
      companyname: RIB.companyname,
      HQId: RIB.HQId,
      iban: RIB.iban,
      status: RIB.status,
    });
  },

  updateRIB: (_id, RIB) => {
    return Model.findOneAndUpdate({ _id }, {
      companyname: RIB.companyname,
      HQId: RIB.HQId,
      iban: RIB.iban,
      status: RIB.status,
    }, {upsert: true}).exec();
  },

  deleteRIBs: () => {
    return Model.remove({}).exec();
  },

  deleteRIB: (_id) => {
    return Model.remove({ _id }).exec();
  },
};