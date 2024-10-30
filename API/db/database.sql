#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

#------------------------------------------------------------
# Table: utilisateur
#------------------------------------------------------------

CREATE TABLE utilisateur(
    id         Int AUTO_INCREMENT NOT NULL,
    nom        Varchar(50) NOT NULL,
    prenom     Varchar(50) NOT NULL,
    email      Varchar(50) NOT NULL,
    mot_de_passe Varchar(50) NOT NULL,
    role       Varchar(50) NOT NULL,
    CONSTRAINT utilisateur_PK PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Déchargement des données de la table `utilisateur`
INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `role`) VALUES
(1, 'DENEUCHATEL', 'Dorian', 'dorian@gmail.com', 'mdp', 'administrateur'),
(2, 'OUADAH', 'Sofiane', 'sofiane@gmail.com', 'mdp', 'administrateur'),
(3, 'NOUET', 'Flavien', 'flavien@gmail.com', 'mdp', 'administrateur'),
(4, 'DUPONT', 'Nicolas', 'nicolas@gmail.com', 'mdp', 'joueur'),
(5, 'AMIEN', 'Julie', 'julie@gmail.com', 'mdp', 'coach');

#------------------------------------------------------------
# Table: sport
#------------------------------------------------------------

CREATE TABLE sport(
    id       Int AUTO_INCREMENT NOT NULL,
    intitule Varchar(50) NOT NULL,
    CONSTRAINT sport_PK PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Déchargement des données de la table `sport`
INSERT INTO `sport` (`id`, `intitule`) VALUES
(1, 'Football'),
(2, 'Basketball'),
(3, 'Tennis'),
(4, 'Natation'),
(5, 'Cyclisme');

#------------------------------------------------------------
# Table: séanceDeSport
#------------------------------------------------------------

CREATE TABLE seanceDeSport(
    id             Int AUTO_INCREMENT NOT NULL,
    titre          Varchar(50) NOT NULL,
    description    Varchar(255) NOT NULL,
    date           Date NOT NULL,
    lieu           Varchar(50) NOT NULL,
    nombrePlaces   Int NOT NULL,
    id_sport       Int NOT NULL,
    id_utilisateur Int NOT NULL,
    CONSTRAINT seanceDeSport_PK PRIMARY KEY (id),
    CONSTRAINT seanceDeSport_sport_FK FOREIGN KEY (id_sport) REFERENCES sport(id),
    CONSTRAINT seanceDeSport_utilisateur0_FK FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
) ENGINE=InnoDB;

-- Déchargement des données de la table `seanceDeSport`
INSERT INTO `seanceDeSport` (`id`, `titre`, `description`, `date`, `lieu`, `nombrePlaces`, `id_sport`, `id_utilisateur`) VALUES
(1, 'Entrainement technique football', 'Entrainement technique football', '2021-05-01', 'Stade de la Source', 10, 1, 1),
(2, 'Match de basket', 'Match de basket', '2021-05-02', 'Gymnase de la Source', 10, 2, 2),
(3, 'Entrainement de tennis', 'Entrainement de tennis', '2021-05-03', 'Tennis Club de la Source', 10, 3, 3),
(4, 'Entrainement de natation', 'Entrainement de natation', '2021-05-04', 'Piscine de la Source', 10, 4, 1),
(5, 'Entrainement de cyclisme', 'Entrainement de cyclisme', '2021-05-05', 'Stade de la Source', 10, 5, 2);

#------------------------------------------------------------
# Table: participant
#------------------------------------------------------------

CREATE TABLE participant(
    id_seance       Int NOT NULL,
    id_utilisateur  Int NOT NULL,
    CONSTRAINT participant_PK PRIMARY KEY (id_seance, id_utilisateur),
    CONSTRAINT participant_seanceDeSport_FK FOREIGN KEY (id_seance) REFERENCES seanceDeSport(id),
    CONSTRAINT participant_utilisateur0_FK FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
) ENGINE=InnoDB;

-- Déchargement des données de la table `participant`
INSERT INTO `participant` (`id_seance`, `id_utilisateur`) VALUES
(1, 1),
(2, 2),
(3, 3);

#------------------------------------------------------------
# Table: pratiquant
#------------------------------------------------------------

CREATE TABLE pratiquant(
    id_sport       Int NOT NULL,
    id_utilisateur Int NOT NULL,
    CONSTRAINT pratiquant_PK PRIMARY KEY (id_sport, id_utilisateur),
    CONSTRAINT pratiquant_sport_FK FOREIGN KEY (id_sport) REFERENCES sport(id),
    CONSTRAINT pratiquant_utilisateur0_FK FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
) ENGINE=InnoDB;

-- Déchargement des données de la table `pratiquant`
INSERT INTO `pratiquant` (`id_sport`, `id_utilisateur`) VALUES
(1, 1),
(2, 2),
(3, 3);
