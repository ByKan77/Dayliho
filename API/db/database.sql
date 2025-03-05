-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 30 oct. 2024 à 17:01
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

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
(5, 'TEST1', 'TEST1', 'TEST1@gmail.com', 'mdp', 'coach'),
(6, 'TEST2', 'TEST2', 'TEST2@gmail.com', 'mdp', 'coach');


-- --------------------------------------------------------

--
-- Structure de la table `participant`
--

CREATE TABLE `participant` (
  `id_seance` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `participant`
--

INSERT INTO `participant` (`id_seance`, `id_utilisateur`) VALUES
(1, 1),
(4, 2),
(5, 3);

-- --------------------------------------------------------

--
-- Structure de la table `pratiquant`
--

CREATE TABLE `pratiquant` (
  `id_sport` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pratiquant`
--

INSERT INTO `pratiquant` (`id_sport`, `id_utilisateur`) VALUES
(1, 1),
(2, 2),
(3, 3);

-- --------------------------------------------------------


--
-- Structure de la table `sport`
--

CREATE TABLE `sport` (
  `id` int(11) NOT NULL,
  `intitule` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sport`
--

INSERT INTO `sport` (`id`, `intitule`) VALUES
(1, 'Football'),
(2, 'Basketball'),
(3, 'Tennis'),
(4, 'Natation'),
(5, 'Cyclisme');

-- --------------------------------------------------------

--
-- Structure de la table `seancedesport`
--

CREATE TABLE `seancedesport` (
  `id` int(11) NOT NULL,
  `titre` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dateDebut` datetime NOT NULL,
  `dateFin` datetime NOT NULL,
  `lieu` varchar(50) NOT NULL,
  `nombrePlaces` int(11) NOT NULL,
  `id_sport` int(11) NOT NULL,
  `id_utilisateur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `seancedesport`
--

INSERT INTO `seancedesport` (`id`, `titre`, `description`, `dateDebut`, `dateFin`, `lieu`, `nombrePlaces`, `id_sport`, `id_utilisateur`) VALUES
(1, 'Entrainement technique', 'Entrainement technique football', '2024-12-02 14:22:00', '2024-12-02 16:22:00', 'Stade de la Source', 10, 1, 1),
(2, 'Match', 'Match de basket', '2024-12-03 10:00:00', '2024-12-03 12:00:00', 'Gymnase de la Source', 10, 2, 2),
(3, 'Entrainement', 'Entrainement de tennis', '2024-12-04 14:00:00', '2024-12-04 16:00:00', 'Tennis Club de la Source', 10, 3, 3),
(4, 'Entrainement 100m', 'Entrainement de natation', '2024-12-05 09:00:00', '2024-12-05 11:00:00', 'Piscine de la Source', 10, 4, 6),
(5, 'Entrainement 12km alterné', 'Entrainement de cyclisme', '2024-12-06 17:00:00', '2024-12-06 19:00:00', 'Stade de la Source', 10, 5, 5);

-- --------------------------------------------------------


--
-- Structure de la table `utilisateur`
--

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `participant`
--
ALTER TABLE `participant`
  ADD PRIMARY KEY (`id_seance`,`id_utilisateur`),
  ADD KEY `participant_utilisateur0_FK` (`id_utilisateur`);

--
-- Index pour la table `pratiquant`
--
ALTER TABLE `pratiquant`
  ADD PRIMARY KEY (`id_sport`,`id_utilisateur`),
  ADD KEY `pratiquant_utilisateur0_FK` (`id_utilisateur`);

--
-- Index pour la table `seancedesport`
--
ALTER TABLE `seancedesport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seanceDeSport_sport_FK` (`id_sport`),
  ADD KEY `seanceDeSport_utilisateur0_FK` (`id_utilisateur`);

--
-- Index pour la table `sport`
--
ALTER TABLE `sport`
  ADD PRIMARY KEY (`id`);


--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `seancedesport`
--
ALTER TABLE `seancedesport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `sport`
--
ALTER TABLE `sport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `participant`
--
ALTER TABLE `participant`
  ADD CONSTRAINT `participant_seanceDeSport_FK` FOREIGN KEY (`id_seance`) REFERENCES `seancedesport` (`id`),
  ADD CONSTRAINT `participant_utilisateur0_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `pratiquant`
--
ALTER TABLE `pratiquant`
  ADD CONSTRAINT `pratiquant_sport_FK` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id`),
  ADD CONSTRAINT `pratiquant_utilisateur0_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `seancedesport`
--
ALTER TABLE `seancedesport`
  ADD CONSTRAINT `seanceDeSport_sport_FK` FOREIGN KEY (`id_sport`) REFERENCES `sport` (`id`),
  ADD CONSTRAINT `seanceDeSport_utilisateur0_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);
COMMIT;
