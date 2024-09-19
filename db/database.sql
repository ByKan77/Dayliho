#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: utilisateur
#------------------------------------------------------------

CREATE TABLE utilisateur(
        id     Int  Auto_increment  NOT NULL ,
        mdp    Varchar (50) NOT NULL ,
        nom    Varchar (50) NOT NULL ,
        prenom Varchar (50) NOT NULL ,
        sport  Varchar (50) NOT NULL ,
        type   Varchar (50) NOT NULL
	,CONSTRAINT utilisateur_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: coach
#------------------------------------------------------------

CREATE TABLE coach(
        id     Int  Auto_increment  NOT NULL ,
        mdp    Varchar (50) NOT NULL ,
        nom    Varchar (50) NOT NULL ,
        prenom Varchar (50) NOT NULL
	,CONSTRAINT coach_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: video
#------------------------------------------------------------

CREATE TABLE video(
        id          Int  Auto_increment  NOT NULL ,
        intutle     Varchar (50) NOT NULL ,
        description Char (5) NOT NULL ,
        auteur      Varchar (50) NOT NULL ,
        date        Date NOT NULL ,
        id_coach    Int NOT NULL
	,CONSTRAINT video_PK PRIMARY KEY (id)

	,CONSTRAINT video_coach_FK FOREIGN KEY (id_coach) REFERENCES coach(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: commentaire
#------------------------------------------------------------

CREATE TABLE commentaire(
        id             Int  Auto_increment  NOT NULL ,
        publiePar      Varchar (50) NOT NULL ,
        contenu        Varchar (50) NOT NULL ,
        date           Date NOT NULL ,
        id_utilisateur Int NOT NULL
	,CONSTRAINT commentaire_PK PRIMARY KEY (id)

	,CONSTRAINT commentaire_utilisateur_FK FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: visionner
#------------------------------------------------------------

CREATE TABLE visionner(
        id             Int NOT NULL ,
        id_utilisateur Int NOT NULL
	,CONSTRAINT visionner_PK PRIMARY KEY (id,id_utilisateur)

	,CONSTRAINT visionner_video_FK FOREIGN KEY (id) REFERENCES video(id)
	,CONSTRAINT visionner_utilisateur0_FK FOREIGN KEY (id_utilisateur) REFERENCES utilisateur(id)
)ENGINE=InnoDB;

