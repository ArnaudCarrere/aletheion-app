// Récupération des librairies de base permettant de faire un serveur d'API
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import exphbs from "express-handlebars";

// Récupération du fichier de configuration qui dépend de l'environnement :
// - /config/dev.js si vous lancez l'application en local
// - /config/prod.js si vous lancez l'application sur votre serveur chez Heroku
import config from "./config";
import HandlebarsConfig from "./helpers/HandlebarsConfig";

// Récupération des controllers
import SeedDbController from "./controllers/SeedDbController";
import HomeController from "./controllers/HomeController";
import HQController from "./controllers/HQController";
import RIBController from "./controllers/RIBController";

// Configuration du serveur
const viewsPath = __dirname + '/views/';
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(favicon(path.resolve('./src/assets/favicon.png')));

server.use(express.static(path.resolve('./src/assets')));
server.set('views', path.resolve('./src/views'));
server.engine('.hbs', exphbs(HandlebarsConfig));
server.set('view engine', '.hbs');

server.set('port', (process.env.PORT || 5000));
server.listen(server.get('port'), () => {
  console.log('Node app is running on port', server.get('port'));
});

// CROSS : cela permettra plus tard d'accéder aux API produites ici depuis l'appli mobile
// Voir ici pour plus d'info : https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Connection à la base de donnée
mongoose.connect('mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@' + config.bddUri, {}, (err, res) => {
  if (err) {
    // La connection a échouée
    console.log('Mongo error:' + config.bddUri + '. ' + err);
  } else {
    // La connection a réussie
    console.log('Mongo success: ' + config.bddUri);
  }
});


// Routes pour initialiser la base
server.post('/seeddb', SeedDbController.seedDb);


// Routes pour les vues
server.get('/', HomeController.getIndex);

server.get('/HQs', HQController.getHQs);
server.get('/HQs/id/:id', HQController.getHQ);
server.get('/HQs/create', HQController.getCreateHQ);
server.post('/HQs/create', HQController.postCreateHQ);
server.get('/HQs/update/:id', HQController.getUpdateHQ);
server.post('/HQs/update/:id', HQController.postUpdateHQ);
server.get('/HQs/delete/:id', HQController.getDeleteHQ);

server.get('/RIBs', RIBController.getRIBs);
server.get('/RIBs/id/:id', RIBController.getRIB);
server.get('/RIBs/create', RIBController.getCreateRIB);
server.post('/RIBs/create', RIBController.postCreateRIB);
server.get('/RIBs/update/:id', RIBController.getUpdateRIB);
server.post('/RIBs/update/:id', RIBController.postUpdateRIB);
server.get('/RIBs/delete/:id', RIBController.getDeleteRIB);

// Routes pour les APIs
server.get('/api/', HomeController.getIndexApi);

server.get('/api/HQs', HQController.getHQsApi);
server.get('/api/HQs/id/:id', HQController.getHQApi);
server.post('/api/HQs/create', HQController.postCreateHQApi);
server.post('/api/HQs/update/:id', HQController.postUpdateHQApi);
server.post('/api/HQs/delete/:id', HQController.postDeleteHQApi);

server.get('/api/RIBs', RIBController.getRIBsApi);
server.get('/api/RIBs/id/:id', RIBController.getRIBApi);
server.post('/api/RIBs/create', RIBController.postCreateRIBApi);
server.post('/api/RIBs/update/:id', RIBController.postUpdateRIBApi);
server.post('/api/RIBs/delete/:id', RIBController.postDeleteRIBApi);
