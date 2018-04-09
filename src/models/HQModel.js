// Model de la route '/HQs'

import mongoose from "mongoose";
mongoose.Promise = global.Promise;

import HQSeeds from "../helpers/HQSeeds";

let Schema = new mongoose.Schema({
  name: { type: String },         // le nom du HQ
  address: { type: String },      // l'addresse
  siret: { type: Number},        // le numéro SIRET de la maison mère
  touch: { type: String },        // le TouchID
  face: { type: String },         // le FaceID
});

let Model = mongoose.model('HQ', Schema);

export default {
  seedHQs: () => {
    let promises = [];
    for (let HQ of HQSeeds){
      promises[promises.legth] = Model.create(HQ);
    }
    return Promise.all(promises);
  },

  getHQs: () => {
    return Model.find({}).exec();
  },

  getHQ: (_id) => {
    return Model.findOne({ _id }).exec();
  },

  createHQ: (HQ) => {
    return Model.create({
      name: HQ.name,
      address: HQ.address,
      siret: HQ.siret,
      touch: HQ.touch,
      face: HQ.face,
    });
  },

  updateHQ: (_id, HQ) => {
    return Model.findOneAndUpdate({ _id }, {
      name: HQ.name,
      address: HQ.address,
      siret: HQ.siret,
      touch: HQ.touch,
      face: HQ.face,
    }, {upsert: true}).exec();
  },

  deleteHQs: () => {
    return Model.remove({}).exec();
  },

  deleteHQ: (_id) => {
    return Model.remove({ _id }).exec();
  },
};