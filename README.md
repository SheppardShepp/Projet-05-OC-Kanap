<h1 align="center">Projet-05-OC-Kanap</h1>

<div align="center"><img height="300" src="https://i.servimg.com/u/f31/13/52/99/79/logo210.png"></div>

## 📝 Sommaires

- [Présentation du projet](#présentation)
- [Aperçu du projet](#projet)
- [Spécification du projet](#specification)
- [Installation de l'API](#api)
- [Utilisation de la parti Front](#utilisation)

## 💭 Petit mot de présentation <a name = "présentation"></a>

Ce projet a eu pour but de construire un site e-commerce en JavaScript.

L'objectif pour moi, fus l'apprentissage du langage JavaScript afin de rendre dynamique un site internet e-commerce en le connectant à une API. N'ayant pas encore appris à ce stade la construction d'une API celle-ci me fus fournie. J'avais également l'interdiction d'utiliser tout framework ou librairie JavaScript (React, Angular, Vue ou jQuery, par exemple).
Toute la parti HTML/CSS ainsi que l'API me fus donc fournis, j'avais donc juste à injecter la parti JavaScript pour rendre le tout fonctionnel.

---

## :movie_camera: Scénario du projet

je suis en poste dans une agence de développement web depuis quelques semaines maintenant. Après avoir réalisé avec succès l’intégration de quelques sites web (HTML/CSS), on me confie une nouvelle mission.

Le client est Kanap, une marque de canapés qui vend ses produits depuis sa boutique exclusivement. Aujourd’hui, celle-ci souhaiterait avoir une plateforme de e-commerce en plus de sa boutique physique pour vendre ses produits sur Internet.

J'ai donc comme mission de :

- Unifier les travaux déjà réalisés par l’équipe en intégrant dynamiquement les éléments de l’API dans les différentes pages web avec JavaScript. Le code du front-end et de l’API m'étant était donné.
- Mettre en place un plan de test d’acceptation.

Lien du plan de test : [Plan de test d’acceptation](https://drive.google.com/file/d/1YCaZEBYB5Bv1_KzNhDk2pI_znE_GXTT0/view?usp=sharing)

Lien des spécifications fonctionnelles et
techniques du site : [Plan de test d’acceptation](https://drive.google.com/file/d/1Li7t3oHYFF6fQxA4WRhB6nbiQ2DvER6O/view?usp=sharing)

---

### Langages à utilisés

- <img height="30" src="https://i31.servimg.com/u/f31/13/52/99/79/logo_h11.png"> HTML/CSS

- <img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"> Javascript

---

## ⛏️ Aperçu du projet <a name = "projet"></a>

Objectif : construire un site e-commerce en JavaScript.

Utilisation : <img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png">

Aperçu :

<div align="center"><img height="300" src="https://i31.servimg.com/u/f31/13/52/99/79/kanap-10.png"> <img height="300" src="https://i31.servimg.com/u/f31/13/52/99/79/kanap10.jpg"> <img height="300" src="https://i31.servimg.com/u/f31/13/52/99/79/kanap_11.png"> <img height="300" src="https://i31.servimg.com/u/f31/13/52/99/79/kanap_10.png"> <img height="300" src="https://i31.servimg.com/u/f31/13/52/99/79/kanap_12.png"></div>

---

## :gear: Les Spécification du projets <a name = "specification"></a>

- Une page d’accueil montrant tous les articles disponibles à la vente.
- Une page “produit” qui affiche les détails du produit sur lequel l'utilisateur a cliqué depuis la page d’accueil. Depuis cette page, l’utilisateur peut électionner une quantité, une couleur, et ajouter le produit à son panier.
- Une page “panier”. Celle-ci contient plusieurs parties :
  - Un résumé des produits dans le panier,
  - Le prix total et la possibilité de modifier la quantité d’un produit sélectionné. Le total du panier devra bien se mettre à jour.
  - La possiblité de supprimer un produit. Le produit devra donc disparaître de la page.
  - Le prix des articles ne doit pas être stocker en local. Les données stockées en local ne sont pas sécurisées et l’utilisateur pourrait alors modifier le prix lui-même.
  - Un formulaire permettant de passer une commande. Les données du formulaire doivent être correctes et bien formatées avant d'être renvoyées au back-end. Par exemple, pas de chiffre dans un champ prénom ou une adresse e-mail ne contenant pas de symbole “@”. En cas de problème de saisie, un message d’erreur devra être affiché en dessous du champ correspondant.
- Une page “confirmation” :
  - Un message de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant l'identifiant de commande envoyé par l’API.

---

## :gear: Installation de l'API <a name = "api"></a>

Cloner le dépot git via un éditeur de code ou le télécharger puis le décompresser sur votre machine.
Une fois le dossier ouvert avec un éditeur de code (comme VSCode), ouvrir et saisir dans le terminal les commandes suivante :

- "cd back"
- "npm install"
- "node server"

Par défaut le serveur sera lancé sur le port 3000 ( http://localhost:3000 ). La console affiche "Listening on port 3000" si le serveur c'est lancé avec succes.
Si le serveur s'exécute sur un autre port pour une raison quelconque, cela est indiqué dans la console au démarrage du serveur, par ex : "Listening on port 3001".

## :gear: Utilisation de la parti Front <a name = "utilisation"></a>

Une fois l'API fonctionnel, il sufffit de lancer le site depuis le fichier HTML ou le "live server" depuis VSCode par exemple.
