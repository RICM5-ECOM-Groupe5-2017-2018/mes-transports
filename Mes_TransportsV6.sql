-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1:3306
-- Généré le :  Mar 14 Novembre 2017 à 09:20
-- Version du serveur :  5.5.42
-- Version de PHP :  5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `Mes_Transports`
--

-- --------------------------------------------------------

--
-- Structure de la table `agency`
--

CREATE TABLE `agency` (
  `id` int(11) NOT NULL,
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id_mother_agency` int(11) DEFAULT NULL,
  `phone_num` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `assign_characteristic`
--

CREATE TABLE `assign_characteristic` (
  `idVehicle` int(11) NOT NULL,
  `idCharacteristic` int(11) NOT NULL,
  `valueCharacteristic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `characteristic`
--

CREATE TABLE `characteristic` (
  `id` int(11) NOT NULL,
  `unit` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `label` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `optional` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `characteristic_type`
--

CREATE TABLE `characteristic_type` (
  `idType` int(11) NOT NULL,
  `idCharacteristic` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `rent`
--

CREATE TABLE `rent` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idVehicle` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `location_in` text CHARACTER SET utf8 COLLATE utf8_bin COMMENT 'where the vehicle is taken',
  `location_out` text CHARACTER SET utf8 COLLATE utf8_bin COMMENT 'where the vehicle is returned'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_first_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `mail_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `login` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone_num` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `idAgency` int(11) DEFAULT NULL,
  `token` varchar(50) DEFAULT NULL,
  `token_expiration` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `brand` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` float NOT NULL,
  `insurance` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `idAgency` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vehicle_type`
--

CREATE TABLE `vehicle_type` (
  `id` int(11) NOT NULL,
  `label` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `agency`
--
ALTER TABLE `agency`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_mother_agency` (`id_mother_agency`);

--
-- Index pour la table `assign_characteristic`
--
ALTER TABLE `assign_characteristic`
  ADD PRIMARY KEY (`idVehicle`,`idCharacteristic`),
  ADD KEY `idCharacteristic` (`idCharacteristic`);

--
-- Index pour la table `characteristic`
--
ALTER TABLE `characteristic`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `characteristic_type`
--
ALTER TABLE `characteristic_type`
  ADD PRIMARY KEY (`idType`,`idCharacteristic`),
  ADD KEY `idCharacteristic` (`idCharacteristic`);

--
-- Index pour la table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idVehicle` (`idVehicle`),
  ADD KEY `idUser` (`idUser`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `idAgency` (`idAgency`);

--
-- Index pour la table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAgency` (`idAgency`),
  ADD KEY `type` (`type`);

--
-- Index pour la table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `agency`
--
ALTER TABLE `agency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `characteristic`
--
ALTER TABLE `characteristic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `rent`
--
ALTER TABLE `rent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `vehicle_type`
--
ALTER TABLE `vehicle_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `agency`
--
ALTER TABLE `agency`
  ADD CONSTRAINT `agency_ibfk_1` FOREIGN KEY (`id_mother_agency`) REFERENCES `agency` (`id`);

--
-- Contraintes pour la table `assign_characteristic`
--
ALTER TABLE `assign_characteristic`
  ADD CONSTRAINT `assign_characteristic_ibfk_1` FOREIGN KEY (`idCharacteristic`) REFERENCES `characteristic` (`id`),
  ADD CONSTRAINT `assign_characteristic_ibfk_2` FOREIGN KEY (`idVehicle`) REFERENCES `vehicle` (`id`);

--
-- Contraintes pour la table `characteristic_type`
--
ALTER TABLE `characteristic_type`
  ADD CONSTRAINT `characteristic_type_ibfk_1` FOREIGN KEY (`idCharacteristic`) REFERENCES `characteristic` (`id`),
  ADD CONSTRAINT `characteristic_type_ibfk_2` FOREIGN KEY (`idType`) REFERENCES `vehicle_type` (`id`);

--
-- Contraintes pour la table `rent`
--
ALTER TABLE `rent`
  ADD CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`idVehicle`) REFERENCES `vehicle` (`id`),
  ADD CONSTRAINT `rent_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`idAgency`) REFERENCES `agency` (`id`);

--
-- Contraintes pour la table `vehicle`
--
ALTER TABLE `vehicle`
  ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`idAgency`) REFERENCES `agency` (`id`),
  ADD CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`type`) REFERENCES `vehicle_type` (`id`);
  
--
-- Table des carts avec les contraintes
--
CREATE TABLE CART(
	idUser int(11) NOT NULL,
	idVehicle int(11) NOT NULL,
	date_begin DATETIME NOT NULL,
	date_end DATETIME NOT NULL,
	date_selection DATETIME NOT NULL,
	PRIMARY KEY (idUser,idVehicle),
	FOREIGN KEY (idUser) REFERENCES USER(id),
	FOREIGN KEY (idVehicle) REFERENCES VEHICLE(id)
	);
