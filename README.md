# Site d'Oiseaux

## Présentation

Ce projet est une application web permettant de **répertorier différentes espèces d’oiseaux** et de consulter leurs informations.

Le site permet notamment de :

* consulter la liste des espèces
* afficher les informations détaillées d’un oiseau
* voir les caractéristiques d’une espèce
* afficher des images associées
* consulter les pays où l’espèce est présente

L'application est composée de :

* un **frontend en React**
* un **backend en Flask (Python)**
* une **base de données PostgreSQL**

---

# Technologies utilisées

Frontend :

* React
* JavaScript
* HTML / CSS

Backend :

* Python
* Flask

Base de données :

* PostgreSQL

---

# Structure du projet

```
project/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# Installation du projet

## 1. Cloner le dépôt

```
git clone https://github.com/votre-utilisateur/site-oiseaux.git
cd site-oiseaux
```

---

# Lancer le Backend (Flask)

Se placer dans le dossier backend :

```
cd backend
```

Créer un environnement virtuel :

```
python -m venv env
```

Activer l'environnement :

Mac / Linux

```
source env/bin/activate
```

Windows

```
env\Scripts\activate
```

Installer les dépendances :

```
pip install -r requirements.txt
```

Lancer le serveur Flask :

```
python app.py
```

Le backend sera accessible sur :

```
http://localhost:5000
```

---

# Lancer le Frontend (React)

Se placer dans le dossier frontend :

```
cd frontend
```

Installer les dépendances :

```
npm install
```

Lancer l'application :

```
npm start
```

Le site sera accessible sur :

```
http://localhost:3000
```

---

# Base de données

La base de données utilisée est **PostgreSQL**.

Elle contient les tables suivantes :

* taxonomie
* espece
* caracteristique
* population
* auteur
* image
* pays
* espece_pays

Ces tables permettent de stocker toutes les informations concernant les espèces d’oiseaux.

---

# Fonctionnalités

* consultation des espèces
* affichage des caractéristiques
* affichage des images
* gestion des relations entre espèces et pays

---

# Auteur

Projet réalisé dans le cadre d’un projet de développement web.
