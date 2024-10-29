-- Structure de la table `utilisateur`
CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `sport` varchar(100) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Déchargement des données de la table `utilisateur`
INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `sport`, `role`) VALUES
(1, 'DENEUCHATEL', 'Dorian', 'dorian@gmail.com', 'mdp', 'foot', 'administrateur'),
(2, 'OUADAH', 'Sofiane', 'sofiane@gmail.com', 'mdp', 'basketball', 'administrateur'),
(3, 'NOUET', 'Flavien', 'flavien@gmail.com', 'mdp', 'doigt cassé', 'administrateur');

-- Structure de la table `video`
CREATE TABLE `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `auteur` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `fichier` longblob DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `auteur` (`auteur`),
  CONSTRAINT `video_ibfk_1` FOREIGN KEY (`auteur`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Déchargement des données de la table `video`
INSERT INTO `video` (`id`, `titre`, `description`, `auteur`, `date`, `fichier`) VALUES
(1, 'Cardio', 'blablablablablabla', 1, '2024-10-02', NULL),
(2, 'Boxe', 'blablablablablabla', 1, '2024-10-02', NULL),
(3, 'Renfo musculaire', 'blablablablablabla', 1, '2024-10-02', NULL),
(4, 'Théâtre', 'blablablablablabla', 1, '2024-10-02', NULL);

-- Structure de la table `commentaire`
CREATE TABLE `commentaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenu` text NOT NULL,
  `date` date DEFAULT NULL,
  `idVideo` int(11) DEFAULT NULL,
  `idCommentaire` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idVideo` (`idVideo`),
  KEY `idCommentaire` (`idCommentaire`),
  CONSTRAINT `commentaire_ibfk_1` FOREIGN KEY (`idVideo`) REFERENCES `video` (`id`),
  CONSTRAINT `commentaire_ibfk_2` FOREIGN KEY (`idCommentaire`) REFERENCES `commentaire` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Structure de la table `historique_video`
CREATE TABLE `historique_video` (
  `idVideo` int(11) NOT NULL,
  `idUtilisateur` int(11) NOT NULL,
  PRIMARY KEY (`idVideo`, `idUtilisateur`),
  KEY `idUtilisateur` (`idUtilisateur`),
  CONSTRAINT `historique_video_ibfk_1` FOREIGN KEY (`idVideo`) REFERENCES `video` (`id`),
  CONSTRAINT `historique_video_ibfk_2` FOREIGN KEY (`idUtilisateur`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;
