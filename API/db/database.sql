DROP TABLE IF EXISTS `reservation`;
DROP TABLE IF EXISTS `seance`;
DROP TABLE IF EXISTS `utilisateur`;

CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `seance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dateDebut` datetime NOT NULL,
  `dateFin` datetime NOT NULL,
  `lieu` varchar(50) NOT NULL,
  `nombrePlaces` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `URL_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seanceDeSport_utilisateur0_FK` (`id_utilisateur`),
  CONSTRAINT `seanceDeSport_utilisateur0_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `reservation` (
  `id_seance` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_seance`, `id_utilisateur`),
  KEY `participant_utilisateur0_FK` (`id_utilisateur`),
  CONSTRAINT `participant_seanceDeSport_FK` FOREIGN KEY (`id_seance`) REFERENCES `seance` (`id`) ON DELETE CASCADE,
  CONSTRAINT `participant_utilisateur0_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `utilisateur` VALUES
(1,'DENEUCHATEL','Dorian','dorian@gmail.com','$2a$12$aUGMazAexWLP.4tU.415n.mNxD1wRp/6ow77Q2MtO5onvc1ydMotG','utilisateur'),
(2,'OUADAH','Sofiane','sofiane@gmail.com','$2a$12$5dZqKlRpHtvKaY2kaqPJ9OIT21Y4rNTjus0pTk.kYOlShdm2Zh4JG','utilisateur'),
(3,'NOUET','Flavien','flavien@gmail.com','$2a$12$lNpXWSB9EDb1ZMMwcFkOz.FqbMqgss1h6gnGNliczO5JciBwbeUs6','utilisateur'),
(4,'ADMIN','Compte','admin@dayliho.com','$2a$12$YHCcaBQGB558Cz.QCC0S5u2vSlYCL9027XNF3iC7qZwSV6zzoZNqi','daylidmin');

INSERT INTO `seance` VALUES
(1,'Five','Entrainement technique de Football 5v5','2025-05-21 10:00:00','2025-05-21 12:00:00','Five de Claye-Souilly',10,1,'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(2,'Renforcement musculaire','Basket','2025-05-22 14:00:00','2025-05-22 16:00:00','Gymnase de la Source',12,2,'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(3,'Courses relais','Entrainement cardio','2025-05-24 16:00:00','2025-05-24 18:00:00','Stage de Lagny-sur-Marne',8,3,'https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(4,'Relais brasse et crawl','Relais natation','2025-05-26 12:00:00','2025-05-26 14:00:00','Piscine de Jablines',15,2,'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
(5,'muscu','muscu','2025-05-21 15:01:00','2025-05-21 17:01:00','ttt',10,2,NULL);

INSERT INTO `reservation` VALUES
(1,1),(1,2),(2,2),(3,2),(5,2),(3,3),(3,4);
