•	Accéder au back office

Dans ShowTonight-api :
- Installer les dépendances du projet sur votre ordinateur "npm install"
- Démarrer l’API avec les 4 instructions suivantes :
setx DB_USERNAME aletheion-db
setx DB_PASSWORD aletheion2018
setx NODE_ENV development
npm run dev

Dans le browser :
- Aller à l'adresse http://localhost:5000/ 
Il s’agit du back office de l’api, il permet aux administrateurs (les banques) de consulter, ajouter, modifier ou supprimer les HQs et les RIBs de notre application. Les adresses acceptées par le back office sont celles allant de la ligne 67 à la ligne 83 du fichier "ShowTonight-api/src/server.js"


•	Requêter l’API

L’API accepte les adresses allant de la ligne 86 à la ligne 98 du fichier "ShowTonight-api/src/server.js"
- Dans postman, cliquer sur « import" (en haut à gauche), puis "import from link" et rentrez l’url "https://www.getpostman.com/collections/1a324ea6496f4dc8de41"
- Cela fera apparaître dans « Collections » toutes les adresses acceptées sur l’api.
- Pour peupler la base de shows, envoyez une requête POST à l'adresse 'http://localhost:5000/seeddb'
