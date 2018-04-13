// Controller de la route '/HQs'
import _ from "lodash";
import Errors from "../helpers/Errors";

// Récupération du model
import HQModel from "../models/HQModel";

const HQs = () => {
  // On fait appel à la fonction getHQs du model
  // Celle ci renvoie tous les HQs présents en base
  return HQModel.getHQs()
  .then((data) => {
    // On récupère ici data qui est une liste de HQs

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noHQsError'
      throw new Error('noHQsError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    let response = [];
    for (let HQ of data){
      // On parcours data. pour chaque élément, on garde les attributs
      response.push({
        id: HQ._id,
        name: HQ.name,
        address: HQ.address,
        siret: HQ.siret,
        touch: HQ.touch,
        face: HQ.face,
      });
    }

    // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
    return _.sortBy(response, 'name');
  });
}

const HQ = (_id) => {
  // On fait appel à la fonction getHQ du model
  // Celle ci renvoie le HQ dont l'id est _id
  return HQModel.getHQ(_id)
  .then((data) => {
    // On récupère ici data qui est une liste de HQs

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noHQError'
      throw new Error('noHQError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    let response = {
      id: data._id,
      name: data.name,
      address: data.address,
      siret: data.siret,
      touch: data.touch,
      face: data.face,
    };
    return response;
  });
}

const ConfiguredHQ = (_id) => {
  return HQModel.getHQ(_id)
  .then((data) => {
    if (data === null) {
      throw new Error('noHQError');
    }
    let response = {
      id: data._id,
      name: data.name,
      address: data.address,
      siret: data.siret,
      touch: "Configured",
      face: "Configured",
    };
    return response;
  });
}

const createHQ = (HQ) => {
  // On fait appel à la fonction createHQ du model
  // Celle ci renvoie le HQ dont l'id est _id
  return HQModel.createHQ(HQ);
}

const updateHQ = (id, HQ) => {
  // On fait appel à la fonction updateHQ du model
  // Celle ci renvoie le HQ dont l'id est _id
  return HQModel.updateHQ(id, HQ);
}

const deleteHQ = (id) => {
  // On fait appel à la fonction deleteHQ du model
  // Celle ci renvoie le HQ dont l'id est _id
  return HQModel.deleteHQ(id);
}

export default {
  // Controller des views
  getHQs: (req, res) => {
    HQs()
    .then((data) => {
      // data contient une liste de HQs
      res.render('HQ/HQs', { HQs: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getHQ: (req, res) => {
    HQ(req.params.id)
    .then((data) => {
      res.render('HQ/HQ', { HQ: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getCreateHQ: (req, res) => {
    res.render('HQ/createHQ');
  },

  postCreateHQ: (req, res) => {
    let HQ = {
      name: req.body.name,
      address: req.body.address,
      siret: req.body.siret,
      touch: req.body.touch,
      face: req.body.face,
    };

    createHQ(HQ)
    .then((data) => {
      res.redirect('/HQs');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getUpdateHQ: (req, res) => {
    HQ(req.params.id)
    .then((data) => {
      res.render('HQ/updateHQ', { HQ: data });
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateHQ: (req, res) => {
    let HQ = {
      name: req.body.name,
      address: req.body.address,
      siret: req.body.siret,
      touch: req.body.touch,
      face: req.body.face,
    };

    updateHQ(req.params.id, HQ)
    .then((data) => {
      res.redirect('/HQs');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getDeleteHQ: (req, res) => {
    deleteHQ(req.params.id)
    .then((data) => {
      res.redirect('/HQs');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getHQsApi: (req, res) => {
    HQs()
    .then((data) => {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de HSs
      res.send(data);
    }, (err) => {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getHQApi: (req, res) => {
    HQ(req.params.id)
    .then((data) => {
      res.send(data);
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  getConfiguredHQApi: (req, res) => {
    ConfiguredHQ(req.params.id)
    .then((data) => {
      updateHQ(req.params.id, data)
      .then((databis) => {
        res.send('ok');
      }, (err) => {
        console.log(err);
        res.status(Errors(err).code).send(Errors(err));
      });
    });
  },

  postCreateHQApi: (req, res) => {
    let HQ = {
      name: req.body.name,
      address: req.body.address,
      siret: req.body.siret,
      touch: req.body.touch,
      face: req.body.face,
    };

    createHQ(HQ)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postUpdateHQApi: (req, res) => {
    let HQ = {
      name: req.body.name,
      address: req.body.address,
      siret: req.body.siret,
      touch: req.body.touch,
      face: req.body.face,
    };

    updateHQ(req.params.id, HQ)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },

  postDeleteHQApi: (req, res) => {
    deleteHQ(req.params.id)
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};
