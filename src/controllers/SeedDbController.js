// Controller de la route '/HQs'
import Errors from "../helpers/Errors";

// Récupération du model
import HQModel from "../models/HQModel";
import RIBModel from "../models/RIBModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      HQModel.deleteHQs(),
      RIBModel.deleteRIBs(),
    ])
    .then((data) => {
      return Promise.all([
        HQModel.seedHQs(),
      ]);
    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};