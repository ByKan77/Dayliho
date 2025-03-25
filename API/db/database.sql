SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `reservation` (
  `id_seance` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  PRIMARY KEY (`id_seance`,`id_utilisateur`),
  KEY `participant_utilisateur0_FK` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `reservation` (`id_seance`, `id_utilisateur`) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (1, 2), (2, 3), (3, 4), (4, 1);

CREATE TABLE `seance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `dateDebut` datetime NOT NULL,
  `dateFin` datetime NOT NULL,
  `lieu` varchar(50) NOT NULL,
  `nombrePlaces` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `URL_photo` varchar(255),
  PRIMARY KEY (`id`),
  KEY `seanceDeSport_utilisateur0_FK` (`id_utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `seance` (`id`, `titre`, `description`, `dateDebut`, `dateFin`, `lieu`, `nombrePlaces`, `id_utilisateur`) VALUES
(1, 'Five', 'Entrainement technique de Football 5v5', '2025-03-03 10:00:00', '2025-03-03 12:00:00', 'Five de Claye-Souilly', 10, 1),
(2, 'Renforcement musculaire', 'Basket', '2025-03-04 14:00:00', '2025-03-04 16:00:00', 'Gymnase de la Source', 12, 2),
(3, 'Courses relais', 'Entrainement cardio', '2025-03-05 16:00:00', '2025-03-05 18:00:00', 'Stage de Lagny-sur-Marne', 8, 3),
(4, 'Relais brasse et crawl', 'Relais natation', '2025-03-06 12:00:00', '2025-03-06 14:00:00', 'Piscine de Jablines', 15, 2);

CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `role`) VALUES
(1, 'DENEUCHATEL', 'Dorian', 'dorian@gmail.com', '$2a$12$aUGMazAexWLP.4tU.415n.mNxD1wRp/6ow77Q2MtO5onvc1ydMotG', 'utilisateur'),
(2, 'OUADAH', 'Sofiane', 'sofiane@gmail.com', '$2a$12$5dZqKlRpHtvKaY2kaqPJ9OIT21Y4rNTjus0pTk.kYOlShdm2Zh4JG', 'utilisateur'),
(3, 'NOUET', 'Flavien', 'flavien@gmail.com', '$2a$12$lNpXWSB9EDb1ZMMwcFkOz.FqbMqgss1h6gnGNliczO5JciBwbeUs6', 'utilisateur'),
(4, 'ADMIN', 'Compte', 'admin@dayliho.com', '$2a$12$YHCcaBQGB558Cz.QCC0S5u2vSlYCL9027XNF3iC7qZwSV6zzoZNqi', 'administrateur');

ALTER TABLE `reservation`
  ADD CONSTRAINT `participant_seanceDeSport_FK` FOREIGN KEY (`id_seance`) REFERENCES `seance` (`id`),
  ADD CONSTRAINT `participant_utilisateur0_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);

ALTER TABLE `seance`
  ADD CONSTRAINT `seanceDeSport_utilisateur0_FK` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id`);

COMMIT;
