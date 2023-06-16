#!/bin/bash

# Démarrer le conteneur frontend-test-server
docker compose up -d frontend-test-server

# Une fois que le serveur de test est prêt, démarrer les tests e2e
echo "Démarrage des tests e2e..."
docker compose up frontend-test-e2e
