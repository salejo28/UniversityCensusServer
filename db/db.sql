-- DB NAME PetCensus
CREATE DATABASE petcensus;

use petcensus;
-- Table User
CREATE TABLE user(
  id INT(11) NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  middleName VARCHAR(30) NOT NULL,
  surname VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  idType VARCHAR(30) NOT NULL,
  idNumber VARCHAR(50) NOT NULL,
  cellphone VARCHAR(20) DEFAULT NULL UNIQUE,
  imgUri TEXT DEFAULT NULL,
  password VARCHAR(100) NOT NULL,
  bornDate DATE DEFAULT NULL,
  active BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB;

ALTER TABLE user  
  ADD PRIMARY KEY (id);
ALTER TABLE user
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE user;

-- Table role
CREATE TABLE roles(
  id INT(11) NOT NULL,
  name VARCHAR(30) NOT NULL,
  description TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

ALTER TABLE roles
  ADD PRIMARY KEY (id);

ALTER TABLE roles
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE roles;

-- INSERT DEFAULT ROLES

INSERT INTO 
  roles (name, description) 
VALUES 
  ("admin", "Administrator"),
  ("boss", "Duty Manager"),
  ("official", "Census Official"),
  ("client", "Client");

-- Table user roles relation
CREATE TABLE users_roles(
  id INT(11) NOT NULL,
  user_id INT(11) NOT NULL,
  role_id INT(11) NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE = InnoDB;

ALTER TABLE users_roles
  ADD PRIMARY KEY (id);

ALTER TABLE users_roles
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users_roles;

-- Table specie
CREATE TABLE specie(
  id INT(11) NOT NULL,
  name VARCHAR(60) NOT NULL,
  isPet BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB;

ALTER TABLE specie
  ADD PRIMARY KEY (id);

ALTER TABLE specie
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE specie;

-- Table Race
CREATE TABLE race(
  id INT(11) NOT NULL,
  name VARCHAR(80) NOT NULL UNIQUE,
  dangerous BOOLEAN,
  specie INT(11),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_specie FOREIGN KEY (specie) REFERENCES specie(id)
) ENGINE = InnoDB;

ALTER TABLE race
  ADD PRIMARY KEY (id);

ALTER TABLE race
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE race;

-- Table Animal
CREATE TABLE animal(
  id INT(11) NOT NULL,
  name VARCHAR(100) NOT NULL,
  bornDate DATE NOT NULL DEFAULT "1900-01-01",
  owner INT(11) NOT NULL,
  race INT(11) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_owner_pet FOREIGN KEY (owner) REFERENCES user(id),
  CONSTRAINT fk_race_pet FOREIGN KEY (race) REFERENCES race(id)
) ENGINE = InnoDB;

ALTER TABLE animal
  ADD PRIMARY KEY (id);

ALTER TABLE animal
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE animal;

-- Table sector
CREATE TABLE sector(
  id INT(11) NOT NULL,
  name VARCHAR(60) NOT NULL,
  isNeighborhood BOOLEAN DEFAULT FALSE,
  isSidewalk BOOLEAN DEFAULT FALSE,
  start JSON NOT NULL,
  end JSON NOT NULL,
  official INT(11) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_official_sector FOREIGN KEY (official) REFERENCES user(id)
) ENGINE = InnoDB;

ALTER TABLE sector
  ADD PRIMARY KEY (id);

ALTER TABLE sector
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE sector;

-- Table Location
CREATE TABLE location(
  id INT(11) NOT NULL,
  address VARCHAR(255) NOT NULL,
  geo JSON NOT NULL,
  user INT(11) NOT NULL,
  sector INT(11) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_sector_location FOREIGN KEY (sector) REFERENCES sector(id),
  CONSTRAINT fk_user_location FOREIGN KEY (user) REFERENCES user(id)
) ENGINE = InnoDB;

ALTER TABLE location
  ADD PRIMARY KEY (id);

ALTER TABLE location
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE location;

-- Table Census
CREATE TABLE census(
  id INT(11) NOT NULL,
  pet INT(11) NOT NULL,
  owner INT(11) NOT NULL,
  official INT(11) NOT NULL,
  location INT(11) NOT NULL,
  description TEXT DEFAULT NULL,
  date_census TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_owner_census FOREIGN KEY (owner) REFERENCES user(id),
  CONSTRAINT fk_pet_census FOREIGN KEY (pet) REFERENCES animal(id),
  CONSTRAINT fk_official_census FOREIGN KEY (official) REFERENCES user(id),
  CONSTRAINT fk_location_census FOREIGN KEY (location) REFERENCES location(id)
) ENGINE = InnoDB;

ALTER TABLE census
  ADD PRIMARY KEY (id);

ALTER TABLE census
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE census;

-- Table AditionalInfoOfficial
CREATE TABLE aditional_info_official(
  id INT(11) NOT NULL,
  boss INT(11) NOT NULL,
  sector INT(11) NOT NULL,
  official INT(11) NOT NULL,
  active BOOLEAN DEFAULT FALSE,

  CONSTRAINT fk_boss_adtional FOREIGN KEY (boss) REFERENCES user(id),
  CONSTRAINT fk_sector_aditional FOREIGN KEY (sector) REFERENCES sector(id),
  CONSTRAINT fk_official_aditional FOREIGN KEY (official) REFERENCES user(id)
) ENGINE = InnoDB;

ALTER TABLE aditional_info_official
  ADD PRIMARY KEY (id);

ALTER TABLE aditional_info_official
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE aditional_info_official;

-- TODO CREATE TABLE IDTYPES
CREATE TABLE idTypes(
  id INT(11) NOT NULL,
  abbreviation  VARCHAR(3) NOT NULL,
  value VARCHAR(50)
) ENGINE = InnoDB;

ALTER TABLE idTypes
  ADD PRIMARY KEY (id);

ALTER TABLE idTypes
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE idTypes;

-- INSET VALUES IDTYPES
INSERT INTO idTypes
  (abbreviation, value)
VALUES
  ("CC", "Cedula de Ciudadania"),
  ("CE", "Cedula de Extranjeria"),
  ("PA", "Pasaporte"),
  ("PEP", "Permiso Especial de Permanencia");