-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Sam 21 Octobre 2017 à 20:13
-- Version du serveur :  5.7.19-0ubuntu1
-- Version de PHP :  7.1.8-1ubuntu1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `MesTransports`
--

-- --------------------------------------------------------

--
-- Structure de la table `AGENCY`
--

CREATE TABLE `AGENCY` (
  `id` int(11) NOT NULL,
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id_mother_agency` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ASSIGN_CHARACTERISTIC`
--

CREATE TABLE `ASSIGN_CHARACTERISTIC` (
  `idVehicle` int(11) NOT NULL,
  `idCharacteristic` int(11) NOT NULL,
  `valueCharacteristic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `CHARACTERISTIC`
--

CREATE TABLE `CHARACTERISTIC` (
  `id` int(11) NOT NULL,
  `unit` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `label` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `CHARACTERISTIC_TYPE`
--

CREATE TABLE `CHARACTERISTIC_TYPE` (
  `idType` int(11) NOT NULL,
  `idCharacteristic` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `RENT`
--

CREATE TABLE `RENT` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idVehicle` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `begin_date` datetime NOT NULL,
  `end_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `USER`
--

CREATE TABLE `USER` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_first_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `mail_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `login` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phone_num` varchar(15) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `idAgency` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `VEHICLE`
--

CREATE TABLE `VEHICLE` (
  `id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `brand` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` float NOT NULL,
  `insurance` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `idAgency` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `VEHICLE_TYPE`
--

CREATE TABLE `VEHICLE_TYPE` (
  `id` int(11) NOT NULL,
  `label` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `AGENCY`
--
ALTER TABLE `AGENCY`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ASSIGN_CHARACTERISTIC`
--
ALTER TABLE `ASSIGN_CHARACTERISTIC`
  ADD PRIMARY KEY (`idVehicle`,`idCharacteristic`);

--
-- Index pour la table `CHARACTERISTIC`
--
ALTER TABLE `CHARACTERISTIC`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `CHARACTERISTIC_TYPE`
--
ALTER TABLE `CHARACTERISTIC_TYPE`
  ADD PRIMARY KEY (`idType`,`idCharacteristic`);

--
-- Index pour la table `RENT`
--
ALTER TABLE `RENT`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `USER`
--
ALTER TABLE `USER`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- Index pour la table `VEHICLE`
--
ALTER TABLE `VEHICLE`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `VEHICLE_TYPE`
--
ALTER TABLE `VEHICLE_TYPE`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `AGENCY`
--
ALTER TABLE `AGENCY`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `CHARACTERISTIC`
--
ALTER TABLE `CHARACTERISTIC`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `RENT`
--
ALTER TABLE `RENT`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `USER`
--
ALTER TABLE `USER`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `VEHICLE`
--
ALTER TABLE `VEHICLE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `VEHICLE_TYPE`
--
ALTER TABLE `VEHICLE_TYPE`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
