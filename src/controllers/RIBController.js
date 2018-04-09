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

const CertifiedRIB = (_id) => {
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
      status: "Certified",
    };
    return response;
  });
}

const RejectedRIB = (_id) => {
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
      status: "Rejected",
    };
    return response;
  });
}

const RIBsHQIdWaiting = (_id) => {
  return RIBModel.getRIBsHQId(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noRIBsError');
    }
    let response = [];
    for (let RIB of data){
      if (RIB.status == "Waiting"){
        response.push({
          id: RIB._id,
          HQId: RIB.HQId,
          iban: RIB.iban,
          companyname: RIB.companyname,
          status: RIB.status,
        });
      }
    }
    return _.sortBy(response, 'companyname');
  });
}

const RIBsHQIdCertified = (_id) => {
  return RIBModel.getRIBsHQId(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noRIBsError');
    }
    let response = [];
    for (let RIB of data){
      if (RIB.status == "Certified"){
        response.push({
          id: RIB._id,
          HQId: RIB.HQId,
          iban: RIB.iban,
          companyname: RIB.companyname,
          status: RIB.status,
        });
      }
    }
    return _.sortBy(response, 'companyname');
  });
}

const RIBsHQIdRejected = (_id) => {
  return RIBModel.getRIBsHQId(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noRIBsError');
    }
    let response = [];
    for (let RIB of data){
      if (RIB.status == "Rejected"){
        response.push({
          id: RIB._id,
          HQId: RIB.HQId,
          iban: RIB.iban,
          companyname: RIB.companyname,
          status: RIB.status,
        });
      }
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

  getRIBsHQIdWaiting: (req, res) => {
    RIBsHQIdWaiting(req.params.id)
    .then((data) => {
      res.render('RIB/RIBsHQIdWaiting', { RIBsHQIdWaiting: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIBsHQIdCertified: (req, res) => {
    RIBsHQIdCertified(req.params.id)
    .then((data) => {
      res.render('RIB/RIBsHQIdCertified', { RIBsHQIdCertified: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIBsHQIdRejected: (req, res) => {
    RIBsHQIdRejected(req.params.id)
    .then((data) => {
      res.render('RIB/RIBsHQIdRejected', { RIBsHQIdRejected: data });
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

  getRIBsHQIdWaitingApi: (req, res) => {
    RIBsHQIdWaiting(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIBsHQIdCertifiedApi: (req, res) => {
    RIBsHQIdCertified(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getRIBsHQIdRejectedApi: (req, res) => {
    RIBsHQIdRejected(req.params.id)
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

  postCertifyRIBApi: (req, res) => {
    CertifiedRIB(req.params.id)
    .then((data) => {
      updateRIB(req.params.id, data)
      .then((databis) => {
        res.send('ok');
      }, (err) => {
        console.log(err);
        res.status(Errors(err).code).send(Errors(err));
      });
    });
  },

  postRejectRIBApi: (req, res) => {
    RejectedRIB(req.params.id)
    .then((data) => {
      updateRIB(req.params.id, data)
      .then((databis) => {
        res.send('ok');
      }, (err) => {
        console.log(err);
        res.status(Errors(err).code).send(Errors(err));
      });
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
