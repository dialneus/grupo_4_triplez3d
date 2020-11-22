-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2020 a las 20:12:41
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce-3dz`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `id` int(11) NOT NULL,
  `fecha_compra` date DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `usuario_id` int(11) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `orderNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritoproductos`
--

CREATE TABLE `carritoproductos` (
  `id` int(11) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1,
  `subTotal` int(255) NOT NULL,
  `carritoId` int(11) NOT NULL,
  `productoId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carritoproductos`
--

INSERT INTO `carritoproductos` (`id`, `precio`, `estado`, `subTotal`, `carritoId`, `productoId`, `usuarioId`, `cantidad`) VALUES
(1, '690', 1, 690, 0, 12, 8, 1),
(2, '1400', 1, 1400, 0, 13, 8, 1),
(3, '50', 1, 250, 0, 14, 8, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `tipomaterial` varchar(25) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `materials`
--

INSERT INTO `materials` (`id`, `tipomaterial`) VALUES
(1, 'PLA'),
(2, 'ABS'),
(3, 'Flex'),
(4, 'Nylon12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medidas`
--

CREATE TABLE `medidas` (
  `id` int(11) NOT NULL,
  `tamanios` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medidas`
--

INSERT INTO `medidas` (`id`, `tamanios`) VALUES
(1, 'Mediano'),
(2, 'Reducido'),
(3, 'Grande');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `imagen` text NOT NULL,
  `pintado` varchar(10) NOT NULL DEFAULT 'no',
  `medida_id` int(11) NOT NULL,
  `material_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `precio`, `descripcion`, `imagen`, `pintado`, `medida_id`, `material_id`) VALUES
(8, 850, 'MATE SITH LORD: DARTH VADER', '\\uploads\\image-1604874805228.png', 'si', 2, 1),
(9, 1100, 'Walker Juego PC \"War Thunder\"', '\\uploads\\image-1604875376010.png', 'si', 2, 1),
(10, 900, 'MASCARA', '\\uploads\\image-1604875418954.png', 'si', 1, 1),
(11, 1320, 'X-WING STAR WARS BATTLE', '\\uploads\\image-1604875465321.png', 'si', 1, 1),
(12, 690, 'CASA MINIATURA', '\\uploads\\image-1604875506095.png', 'si', 2, 1),
(13, 1400, 'CHIMUELO', '\\uploads\\image-1604875532004.png', 'si', 1, 1),
(14, 50, 'Producto para pruebas', '\\uploads\\image-1605098949810.jpg', 'no', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombreApellido` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `localidad` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombreApellido`, `email`, `password`, `telefono`, `direccion`, `localidad`) VALUES
(6, 'Alejandro Neustadt', 'dialneus@gmail.com', '$2b$10$r73RPLG.ubFRA18DzR3tue6IkNJ1VUtN8I0pXJhF0zBlhAJmqZdz.', 0, '', ''),
(7, 'Natalia Rosato', 'natirosato@gmail.com', '$2b$10$Cdc3Gg800dyTsqMUYEq1Ueq8RfXObgcmhP.U6FdeZ0iIYZS3XX0g6', 0, '', ''),
(8, 'Kevin Schild  ', '1994@gmail.com', '$2b$10$btQcDhY./sjbqXziu3qAwuZGR0wlRrcOVS8kfKzFZsZgMfX1D/7kO', 3455, NULL, ' BCX ');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `carritoproductos`
--
ALTER TABLE `carritoproductos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carritoId` (`carritoId`),
  ADD KEY `productoId` (`productoId`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medidas`
--
ALTER TABLE `medidas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medida_id` (`medida_id`),
  ADD KEY `material_id` (`material_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carritoproductos`
--
ALTER TABLE `carritoproductos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `medidas`
--
ALTER TABLE `medidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `carritoproductos`
--
ALTER TABLE `carritoproductos`
  ADD CONSTRAINT `carritoproductos_ibfk_1` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `carritoproductos_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`medida_id`) REFERENCES `medidas` (`id`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`material_id`) REFERENCES `materials` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
