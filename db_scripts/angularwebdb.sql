-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2020 a las 03:58:40
-- Versión del servidor: 8.0.18
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `angularwebdb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_doctor` (`p_primer_nombre` VARCHAR(45), `p_segundo_nombre` VARCHAR(45), `p_primer_apellido` VARCHAR(45), `p_segundo_apellido` VARCHAR(45), `p_id_hospital` INT(11), `p_direccion` VARCHAR(45), `p_telefono` VARCHAR(45), `p_tipo_sangre` VARCHAR(45), `p_experiencia` VARCHAR(45), `p_fecha_nacimiento` VARCHAR(45), `p_email` VARCHAR(45), `p_rol` VARCHAR(45), `p_user_id` VARCHAR(45))  BEGIN
	
	            DECLARE _rollback INT DEFAULT 0;
				DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
				START TRANSACTION;                        
				
				-- CREANDO USUARIO PARA INGRESAR A LA PLATAFORMA
				INSERT INTO usuario (nombre,email,contrasena,rol)
				VALUES(concat(p_primer_nombre," ",p_primer_apellido),p_email,p_telefono,p_rol);
	            
				-- CREANDO DOCTOR
    INSERT INTO `angularwebdb`.`doctor`(`primer_apellido`,`segundo_apellido`,`primer_nombre`,`segundo_nombre`,
                `direccion`,`telefono`,`tipo_sangre`,`experiencia`,`fecha_nacimiento`,`usuario_id`,`id_hospital`,`creado_por`,
                `actualizado_por`)
				VALUES(p_primer_apellido,p_segundo_apellido,p_primer_nombre,p_segundo_nombre,p_direccion,p_telefono,p_tipo_sangre,p_experiencia,p_fecha_nacimiento,LAST_INSERT_ID(),p_id_hospital,p_user_id,p_user_id);
				
					
					IF _rollback = 1 THEN 
						SELECT FALSE AS exito, 'Error al crear el doctor'  AS mensaje;
	                    SHOW ERRORS;
	                    ROLLBACK;
					ELSE
						COMMIT;
						SELECT TRUE AS exito, 'Doctor creado correctamente, su contraseña para acceder el sistema es su telefono' AS mensaje;
						END IF;
				
			
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_doctor` (`p_id_usuario` INT(11), `p_id_doctor` INT(11))  BEGIN
 DECLARE _rollback INT DEFAULT 0;
				DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET _rollback = 1;
				START TRANSACTION;                        
				
				-- ACTUALIZAR USUARIO QUE INGRESA A LA PLATAFORMA
				UPDATE usuario SET habilitado = 0 WHERE id = p_id_usuario;
	            
				-- ACTUALIZA EL DOCTOR, LO ELIMINA
				UPDATE doctor set eliminado = CURRENT_TIMESTAMP(), eliminado_por = 1 WHERE id=p_id_doctor;
					
					IF _rollback = 1 THEN 
						SELECT FALSE AS exito, 'Error al crear el doctor'  AS mensaje;
	                    SHOW ERRORS;
	                    ROLLBACK;
					ELSE
						COMMIT;
						SELECT TRUE AS exito, 'Doctor eliminado correctamente, su perfil fue desabilitado para ingresar a la plataforma' AS mensaje;
						END IF;
				
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--

CREATE TABLE `doctor` (
  `id` int(11) NOT NULL COMMENT 'IDENTIFICADOR PRINCIPAL',
  `primer_apellido` varchar(255) NOT NULL COMMENT 'PRIMER APELLIDO DEL DOCTOR',
  `segundo_apellido` varchar(255) NOT NULL COMMENT 'SEGUNDO APELLIDO DEL DOCTOR',
  `primer_nombre` varchar(255) NOT NULL COMMENT 'PRIMER NOMBRE DEL DOCTOR',
  `segundo_nombre` varchar(255) NOT NULL COMMENT 'SEGUNDO NOMBRE DEL DOCTOR',
  `direccion` varchar(255) NOT NULL COMMENT 'DIRECCION DEL DOCTOR',
  `telefono` varchar(45) NOT NULL COMMENT 'TELEFONO DEL DOCTOR',
  `tipo_sangre` varchar(45) NOT NULL COMMENT 'TIPO DE SANGRE DEL DOCTOR',
  `experiencia` varchar(45) NOT NULL COMMENT 'EXPERIENCIA DEL DOCTOR',
  `fecha_nacimiento` varchar(45) NOT NULL COMMENT 'FEHCA DE NACIMIENTO DEL DOCTOR',
  `usuario_id` int(11) DEFAULT NULL,
  `id_hospital` int(11) NOT NULL COMMENT 'HOSPITAL DEL DOCTOR',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'HORA DE CREACIÓN DEL REGISTRO',
  `creado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE CREA EL REGISTRO',
  `actualizado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'HORA DE ACTUALIZACIÓN DEL REGISTRO',
  `actualizado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE MODIFICA EL REGISTRO',
  `eliminado` datetime DEFAULT NULL COMMENT 'DOCTOR QUE ELIMINA EL REGISTRO',
  `eliminado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE ELIMINA EL REGISTRO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `doctor`
--

INSERT INTO `doctor` (`id`, `primer_apellido`, `segundo_apellido`, `primer_nombre`, `segundo_nombre`, `direccion`, `telefono`, `tipo_sangre`, `experiencia`, `fecha_nacimiento`, `usuario_id`, `id_hospital`, `creado`, `creado_por`, `actualizado_por`, `eliminado`, `eliminado_por`) VALUES
(11, 'escorcia', 'polo', 'carlos', 'manuel', 'Universidad Javeriana', '301131', 'A+', '2', '03-02', 5, 1, '2020-05-24 05:28:24', 1, 2, NULL, NULL),
(29, 'Asignar', 'VARGAS', 'Escorcia', 'CARLOS ', 'Hotel Element', '3015492126', 'A-', '3', '2020-05-30', 13, 1, '2020-05-24 06:08:05', 1, 1, '2020-05-24 12:52:18', 1),
(30, 'Asignar', 'VARGAS', 'Escorcia', 'CARLOS ', 'Hotel Element', '3015492126', 'A-', '3', '2020-05-30', 14, 1, '2020-05-24 06:10:59', 1, 1, '2020-05-24 12:51:51', 1),
(31, 'Asignar', 'VARGAS', 'Escorcia', 'CARLOS ', 'Hotel Element', '3102193664', 'A-', '3', '2020-05-30', 15, 1, '2020-05-24 06:17:31', 1, 1, '2020-05-24 12:50:36', 1),
(32, 'Escorcia', 'VARGAS', 'Conductor', '', 'Walmart Chalco', '3015492126', 'O+', '3', '2020-05-25', 16, 1, '2020-05-26 03:45:31', 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eps`
--

CREATE TABLE `eps` (
  `id` int(11) NOT NULL COMMENT 'IDENTIFICADOR PRINCIPAL',
  `nombre` varchar(255) NOT NULL COMMENT 'NOMBRE DE LA EPS',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'HORA DE CREACIÓN DEL REGISTRO',
  `creado_por` int(10) UNSIGNED NOT NULL COMMENT 'USUARIO QUE CREA EL REGISTRO',
  `actualizado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'HORA DE ACTUALIZACIÓN DEL REGISTRO',
  `actualizado_por` int(10) UNSIGNED NOT NULL COMMENT 'USUARIO QUE MODIFICA EL REGISTRO',
  `eliminado` datetime DEFAULT NULL COMMENT 'USUARIO QUE ELIMINA EL REGISTRO',
  `eliminado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'USUARIO QUE ELIMINA EL REGISTRO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `eps`
--

INSERT INTO `eps` (`id`, `nombre`, `creado`, `creado_por`, `actualizado_por`, `eliminado`, `eliminado_por`) VALUES
(1, 'NUEVA EPS', '2020-05-23 20:32:19', 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospital`
--

CREATE TABLE `hospital` (
  `id` int(11) NOT NULL COMMENT 'IDENTIFICADOR PRINCIPAL',
  `nombre` varchar(255) NOT NULL COMMENT 'NOMBRE DEL HOSPITAL',
  `nombre_representante` varchar(255) NOT NULL COMMENT 'NOMBRE DEL REPRESENTANTE DEL HOSPITAL',
  `nit` varchar(255) NOT NULL COMMENT 'NIT DEL HOSPITAL',
  `direccion` varchar(255) NOT NULL COMMENT 'DIRECCION DEL HOSPITAL',
  `telefono` varchar(45) NOT NULL COMMENT 'TELEFONO DEL HOSPITAL',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'HORA DE CREACIÓN DEL REGISTRO',
  `creado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'USUARIO QUE CREA EL REGISTRO',
  `actualizado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'HORA DE ACTUALIZACIÓN DEL REGISTRO',
  `actualizado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'USUARIO QUE MODIFICA EL REGISTRO',
  `eliminado` datetime DEFAULT NULL COMMENT 'HOSPITAL QUE ELIMINA EL REGISTRO',
  `eliminado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'USUARIO QUE ELIMINA EL REGISTRO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hospital`
--

INSERT INTO `hospital` (`id`, `nombre`, `nombre_representante`, `nit`, `direccion`, `telefono`, `creado`, `creado_por`, `actualizado_por`, `eliminado`, `eliminado_por`) VALUES
(1, 'CLINICA PRUEBA', 'CARLOS ESCORCIA', '1', '1', '1', '2020-05-23 20:32:46', 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL COMMENT 'IDENTIFICADOR PRINCIPAL',
  `primer_apellido` varchar(255) NOT NULL COMMENT 'PRIMER APELLIDO DEL PACIENTE',
  `segundo_apellido` varchar(255) NOT NULL COMMENT 'SEGUNDO APELLIDO DEL PACIENTE',
  `primer_nombre` varchar(255) NOT NULL COMMENT 'PRIMER NOMBRE DEL PACIENTE',
  `segundo_nombre` varchar(255) DEFAULT NULL COMMENT 'SEGUNDO NOMBRE DEL PACIENTE',
  `direccion` varchar(255) NOT NULL COMMENT 'DIRECCION DEL PACIENTE',
  `telefono` varchar(45) NOT NULL COMMENT 'TELEFONO DEL PACIENTE',
  `eps` varchar(45) NOT NULL COMMENT 'EPS DEL PACIENTE',
  `nombre_acom` varchar(45) DEFAULT NULL COMMENT 'NOMBRE DEL ACOMPAÑANTE DEL PACIENTE',
  `telefono_acom` varchar(45) DEFAULT NULL COMMENT 'TELEFONO DEl ACOMPAÑANTE DEL PACIENTE',
  `antecedentes` varchar(45) DEFAULT 'SI' COMMENT 'NOMBRE DEL ACOMPAÑANTE DEL PACIENTE',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'HORA DE CREACIÓN DEL REGISTRO',
  `creado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE CREA EL REGISTRO',
  `actualizado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'HORA DE ACTUALIZACIÓN DEL REGISTRO',
  `actualizado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE MODIFICA EL REGISTRO',
  `eliminado` datetime DEFAULT NULL COMMENT 'DOCTOR QUE ELIMINA EL REGISTRO',
  `eliminado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE ELIMINA EL REGISTRO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `primer_apellido`, `segundo_apellido`, `primer_nombre`, `segundo_nombre`, `direccion`, `telefono`, `eps`, `nombre_acom`, `telefono_acom`, `antecedentes`, `creado`, `creado_por`, `actualizado_por`, `eliminado`, `eliminado_por`) VALUES
(1, 'Escorcia ', 'Polo', 'Carlos', 'Manuel', '1234', '1234', 'COOMEVA', '', '', 'SI', '2020-05-24 00:45:13', 1, 2, NULL, NULL),
(2, 'Prueba 3', 'Prueba 4', 'Prueba 1', 'Prueba 2', 'prueba 5', '123123', 'CAFESALUD', '', '', 'SI', '2020-05-24 00:57:37', 1, 2, '2020-05-23 21:36:39', 1),
(3, 'Escorcia', 'Polo', 'Madeline', '', 'Walmart Chalco', '3015492189', 'SURA', '', '', 'SI', '2020-05-26 02:47:38', 1, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblpaciente`
--

CREATE TABLE `tblpaciente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `direccion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL,
  `EPS` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `tblpaciente`
--

INSERT INTO `tblpaciente` (`id`, `nombre`, `direccion`, `telefono`, `EPS`) VALUES
(6, 'jose maria', 'cale 10', '3015855548', 'Sura'),
(29, '1213', '3123', '3123', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `triage`
--

CREATE TABLE `triage` (
  `id` int(11) NOT NULL COMMENT 'IDENTIFICADOR PRINCIPAL',
  `id_doctor` int(11) NOT NULL COMMENT 'DOCTOR QUE ATIENDE EL CASO',
  `id_paciente` int(11) NOT NULL COMMENT 'PACIENTE QUE ASISTE A LA CONSULTA',
  `motivo_consulta` longtext NOT NULL COMMENT 'DESCRIPCION DE LO QUE PRESENTA EL PACIENTE',
  `diagnostico` longtext NOT NULL COMMENT 'DIAGNOSTICO HECHO POR EL DOCTOR',
  `medicamento` longtext NOT NULL COMMENT 'MEDICAMENTOS ENVIADOS POR EL DOCTOR',
  `resultado_cov` varchar(3) NOT NULL COMMENT 'RESULTADOS DE LA PRUEBA, COV19 SI O NO',
  `creado` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'HORA DE CREACIÓN DEL REGISTRO',
  `creado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE CREA EL REGISTRO',
  `actualizado` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'HORA DE ACTUALIZACIÓN DEL REGISTRO',
  `actualizado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE MODIFICA EL REGISTRO',
  `eliminado` datetime DEFAULT NULL COMMENT 'DOCTOR QUE ELIMINA EL REGISTRO',
  `eliminado_por` int(10) UNSIGNED DEFAULT NULL COMMENT 'DOCTOR QUE ELIMINA EL REGISTRO'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `triage`
--

INSERT INTO `triage` (`id`, `id_doctor`, `id_paciente`, `motivo_consulta`, `diagnostico`, `medicamento`, `resultado_cov`, `creado`, `creado_por`, `actualizado_por`, `eliminado`, `eliminado_por`) VALUES
(1, 11, 1, 'Dolor de cabeza', 'Parece ser algo de migraña ', 'NO', 'NO', '2020-05-25 04:02:29', NULL, NULL, NULL, NULL),
(3, 11, 1, 'sdasd', 'dsadas', '', 'SI', '2020-05-26 02:44:17', 11, 11, NULL, NULL),
(4, 11, 3, 'ndsandjsand', 'dasdas', '', 'NO', '2020-05-26 03:03:31', 11, 11, NULL, NULL),
(5, 32, 3, 'Prueba doctor', 'prueba', 'Dolex', 'SI', '2020-05-26 03:47:12', 32, 32, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `contrasena` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `rol` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `habilitado` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `email`, `contrasena`, `rol`, `habilitado`) VALUES
(1, 'carlos', 'admin@admin.com', '123456', 'administrador', 1),
(5, 'Administrador', 'admin@admin.com', '1234', 'administrador', 1),
(13, 'Escorcia Asignar', 'cmescorcia5@misena.edu.co', '3015492126', 'doctor', 0),
(14, 'Escorcia Asignar', 'cmescorcia5@misena.edu.co', '3015492126', 'doctor', 0),
(15, 'Escorcia Asignar', 'cmescorcia5@misena.edu.co', '3102193664', 'doctor', 0),
(16, 'Conductor Escorcia', 'prubea2@prueba.com', '3015492126', 'doctor', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_doctor_hospital1_idx` (`id_hospital`),
  ADD KEY `fk_doctor_usuario_idx` (`usuario_id`);

--
-- Indices de la tabla `eps`
--
ALTER TABLE `eps`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tblpaciente`
--
ALTER TABLE `tblpaciente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `triage`
--
ALTER TABLE `triage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_triage_doctor_idx` (`id_doctor`),
  ADD KEY `fk_triage_paciente_idx` (`id_paciente`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IDENTIFICADOR PRINCIPAL', AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `eps`
--
ALTER TABLE `eps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IDENTIFICADOR PRINCIPAL', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `hospital`
--
ALTER TABLE `hospital`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IDENTIFICADOR PRINCIPAL', AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IDENTIFICADOR PRINCIPAL', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tblpaciente`
--
ALTER TABLE `tblpaciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `triage`
--
ALTER TABLE `triage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'IDENTIFICADOR PRINCIPAL', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `fk_doctor_hospital` FOREIGN KEY (`id_hospital`) REFERENCES `hospital` (`id`),
  ADD CONSTRAINT `fk_doctor_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `triage`
--
ALTER TABLE `triage`
  ADD CONSTRAINT `fk_triage_doctor` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id`),
  ADD CONSTRAINT `fk_triage_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
