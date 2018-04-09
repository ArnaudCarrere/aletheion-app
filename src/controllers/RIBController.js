// Controller de la route '/RIBs'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import RIBModel from "../models/RIBModel";
import HQModel from "../models/HQModel";

const RIBs = () => {
  return RIBModel.getRIBs()
  .then((data) => {
    if (data === null) {
      throw new Error('noRIBsError');
    }

    let response = [];
    for (let RIB of data){
      response.push({
        id: RIB._id,
        HQId: RIB.HQId,
        iban: RIB.iban,
        companyname: RIB.companyname,
        status: RIB.status,
      });
    }
    return _.sortBy(response, 'companyname');
  });
}

const RIB = (_id) => {
  return RIBModel.getRIB(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noRIBError');
    }

    let response = {
      id: data._id,
      iban: data.iban,
      HQId: data.HQId,
      companyname: data.companyname,
      status: data.status,
    };
    return response;
  });
}

const RIBHQIdStatus = (HQId, status) => {
  return RIBModel.getRIBHQIdStatus(HQId, status)
  .then((data) => {
    if (data === null) {
      throw new Error('noRIBsError');
    }

    let response = [];
    for (let RIB of data){
      response.push({
        id: RIB._id,
        HQId: RIB.HQId,
        iban: RIB.iban,
        companyname: RIB.companyname,
        status: RIB.status,
      });
    }
    return _.sortBy(response, 'companyname');
  });
}

const createRIB = (RIB) => {
  return RIBModel.createRIB(RIB);
}

const updateRIB = (id, RIB) => {
  return RIBModel.updateRIB(id, RIB);
}

const deleteRIB = (id) => {
  return RIBModel.deleteRIB(id);
}

export default {
  // Controller des views
  getRIBs: (req, res) => {
    RIBs()
    .then((data) => {
      res.render('RIB/RIBs', { RIBs: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIB: (req, res) => {
    RIB(req.params.id)
    .then((data) => {
      res.render('RIB/RIB', { RIB: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIBHQIdStatus: (req, res) => {
    RIBHQIdStatus(req.params.HQId,req.params.status)
    .then((data) => {
      res.render('RIB/RIBHQIdStatus', { RIB: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateRIB: (req, res) => {
    HQModel.getHQs()
    .then((data) => {
      res.render('RIB/createRIB', { HQs: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postCreateRIB: (req, res) => {
    let RIB = {
      HQId: req.body.HQId,
      iban: req.body.iban,
      companyname: req.body.companyname,
      status: req.body.status,
    };

    createRIB(RIB)
    .then((data) => {
      res.redirect('/RIBs');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateRIB: (req, res) => {
    Promise.all([
      RIB(req.params.id),
      HQModel.getHQs(),
    ])
    .then((data) => {
      res.render('RIB/updateRIB', { RIB: data[0], HQs: data[1] });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateRIB: (req, res) => {
    let RIB = {
      HQId: req.body.HQId,
      iban: req.body.iban,
      companyname: req.body.companyname,
      status: req.body.status,
    };

    updateRIB(req.params.id, RIB)
    .then((data) => {
      res.redirect('/RIBs');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteRIB: (req, res) => {
    deleteRIB(req.params.id)
    .then((data) => {
      res.redirect('/RIBs');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // Controller des Apis
  getRIBsApi: (req, res) => {
    RIBs()
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIBApi: (req, res) => {
    RIB(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIBHQIdStatusApi: (req, res) => {
    RIBHQIdStatus(req.params.HQId,req.params.status)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },


  postCreateRIBApi: (req, res) => {
    let RIB = {
      HQId: req.body.HQId,
      iban: req.body.iban,
      companyname: req.body.companyname,
      status: req.body.status,
    };

    createRIB(RIB)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateRIBApi: (req, res) => {
    let RIB = {
      HQId: req.body.HQId,
      iban: req.body.iban,
      companyname: req.body.companyname,
      status: req.body.status,
    };

    updateRIB(req.params.id, RIB)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteRIBApi: (req, res) => {
    deleteRIB(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
