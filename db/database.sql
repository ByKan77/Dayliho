
-- Création de la table utilisateur
CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    sport VARCHAR(100),
    role VARCHAR(50) NOT NULL
);

INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, sport, role) VALUES 
('DENEUCHATEL', 'Dorian', 'dorian@gmail.com', 'mdp', 'foot', 'administrateur'),
('OUADAH', 'Sofiane', 'sofiane@gmail.com', 'mdp', 'basketball', 'administrateur'),
('NOUET', 'Flavien', 'flavien@gmail.com', 'mdp', 'doigt cassé', 'administrateur');

-- Création de la table video
CREATE TABLE video (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    auteur INT,
    date DATE,
    FOREIGN KEY (auteur) REFERENCES utilisateur(id)
);

INSERT INTO video (titre, description, auteur, date) VALUES 
('Entraînement cardio', 'blablablablablabla', 1, '2024-10-02'),
('Entraînement boxe', 'blablablablablabla', 2, '2024-10-02');

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
