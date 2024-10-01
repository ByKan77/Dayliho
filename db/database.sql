-- Création de la base de données
CREATE DATABASE ma_base_de_donnees;

-- Utilisation de la base de données
USE ma_base_de_donnees;

-- Création de la table utilisateur
CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    mdp VARCHAR(255) NOT NULL,
    sport VARCHAR(100),
    role VARCHAR(50) NOT NULL
);

-- Création de la table video
CREATE TABLE video (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    auteur INT,
    date DATE,
    FOREIGN KEY (auteur) REFERENCES utilisateur(id)
);

-- Création de la table historique_video
CREATE TABLE historique_video (
    idVideo INT,
    idUtilisateur INT,
    PRIMARY KEY (idVideo, idUtilisateur),
    FOREIGN KEY (idVideo) REFERENCES video(id),
    FOREIGN KEY (idUtilisateur) REFERENCES utilisateur(id)
);

-- Création de la table commentaire
CREATE TABLE commentaire (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenu TEXT NOT NULL,
    date DATE,
    idVideo INT,
    idCommentaire INT,
    FOREIGN KEY (idVideo) REFERENCES video(id),
    FOREIGN KEY (idCommentaire) REFERENCES commentaire(id)
);
