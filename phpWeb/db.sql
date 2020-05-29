/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.6-MariaDB : Database - hospital_web2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hospital_web2` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `hospital_web2`;

/*Table structure for table `tbl_doctor` */

DROP TABLE IF EXISTS `tbl_doctor`;

CREATE TABLE `tbl_doctor` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_doctor` varchar(40) NOT NULL,
  `Direccion_doctor` varchar(25) DEFAULT NULL,
  `Celular_doctor` varchar(10) DEFAULT NULL,
  `Tipo_sangre` varchar(3) DEFAULT NULL,
  `Anos_experiencia` int(3) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `Id_hospital` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `tbl_doctor_ibfk_1` (`Id_hospital`),
  CONSTRAINT `tbl_doctor_ibfk_1` FOREIGN KEY (`Id_hospital`) REFERENCES `tbl_hospital` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `tbl_hospital` */

DROP TABLE IF EXISTS `tbl_hospital`;

CREATE TABLE `tbl_hospital` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  `Celular` varchar(10) DEFAULT NULL,
  `Direccion` varchar(15) NOT NULL,
  `Nit` varchar(20) NOT NULL,
  `Nombre_propietario` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `tbl_paciente` */

DROP TABLE IF EXISTS `tbl_paciente`;

CREATE TABLE `tbl_paciente` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_paciente` varchar(45) NOT NULL,
  `Direccion_paciente` varchar(25) DEFAULT NULL,
  `Eps` varchar(12) NOT NULL,
  `Nombre_acompanante` varchar(40) DEFAULT NULL,
  `Celular_acompanante` varchar(10) DEFAULT NULL,
  `Historial_medico` varchar(2) NOT NULL,
  `Detalle_historial` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `tbl_triage` */

DROP TABLE IF EXISTS `tbl_triage`;

CREATE TABLE `tbl_triage` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Motivo_consulta` varchar(80) DEFAULT NULL,
  `Diagnostico_doctor` varchar(300) DEFAULT NULL,
  `Requiere_medicacion` varchar(2) NOT NULL,
  `Medicamentos` varchar(200) DEFAULT NULL,
  `Tiene_covid` varchar(2) NOT NULL,
  `Sintomas_covid` varchar(200) DEFAULT NULL,
  `Id_paciente` int(11) NOT NULL,
  `Id_doctor` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Id_paciente` (`Id_paciente`),
  KEY `Id_doctor` (`Id_doctor`),
  CONSTRAINT `tbl_triage_ibfk_1` FOREIGN KEY (`Id_paciente`) REFERENCES `tbl_paciente` (`Id`),
  CONSTRAINT `tbl_triage_ibfk_2` FOREIGN KEY (`Id_doctor`) REFERENCES `tbl_doctor` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
