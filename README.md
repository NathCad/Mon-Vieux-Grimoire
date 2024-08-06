# Projet Frontend

## Démarrage

Le projet se démarre avec la commande:
- *npm run start* pour démarrer le serveur de test

# Projet Backend

## Démarrage

Le projet se démarre avec la commande:
- *npm run dev* pour démarrer le serveur de test

## Configuration

1. Les images s'enregistrent dans un dossier images, le dossier se créé automatiquement: cf [middleware/sharp.js](https://github.com/NathCad/Mon-Vieux-Grimoire/blob/master/Backend/middlewares/sharp.js)

2. Le projet backend utilise un fichier d'environnement ***.env***

    Les propriétés à définir sont: 
    - DATABASE_URI: (string) l'url de la base mongodb
    - LISTENING_PORT: (number) le port d'écoute du serveur
    - TOKEN_SECRET: (string) le secret pour l'encodage des tokens jwt