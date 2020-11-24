-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 24-11-2020 a las 18:57:17
-- Versión del servidor: 5.7.30
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `eCommerce-3DZ`
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
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `subTotal` int(255) NOT NULL,
  `carritoId` int(11) DEFAULT NULL,
  `productoId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carritoproductos`
--

INSERT INTO `carritoproductos` (`id`, `precio`, `estado`, `subTotal`, `carritoId`, `productoId`, `usuarioId`, `cantidad`) VALUES
(6, '1320', 1, 3960, 0, 11, 8, 3),
(7, '900', 1, 900, 0, 10, 8, 1),
(8, '50', 1, 250, 0, 14, 8, 5),
(9, '850', 1, 4250, 0, 8, 8, 5),
(12, '900', 1, 1800, NULL, 10, 9, 2);

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
  `activo` int(1) NOT NULL DEFAULT '1',
  `admin` int(1) NOT NULL DEFAULT '0',
  `nombreApellido` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `domicilio` varchar(150) DEFAULT NULL,
  `localidad` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `activo`, `admin`, `nombreApellido`, `email`, `password`, `telefono`, `domicilio`, `localidad`) VALUES
(8, 1, 1, 'Kevin Schild  ', '1994@gmail.com', '$2b$10$btQcDhY./sjbqXziu3qAwuZGR0wlRrcOVS8kfKzFZsZgMfX1D/7kO', 3455, NULL, ' BCX '),
(9, 1, 0, 'Ale ', 'dialneus@me.com', '$2b$10$sDE1YuXtixnQwAIZ7MK25.oT/NwCdvLIJTbf4hrHsMAwozORsboEG', 40102111, ' monroe 940', ' NYC'),
(10, 1, 2, 'Administrador', 'admin@3dz.com', '$2b$10$9YMbWdK/bT0hhiz.scVAc.kblnHfKGUY3pjFO6vofQadeankI.n1G', NULL, NULL, NULL),
(11, 1, 1, 'Supervisor   ', 'supervisor@3dz.com', '$2b$10$aBSpyKb8XwTh/kiXlAyxI.Gh24NvPT/ZE5GhMkrIw82MzINyI5Yn2', 22222222, 'Web Full Stact Supervisor  ', 'CABA  '),
(12, 1, 0, 'Eliminar1', 'eliminar@eliminar.com.el', '$2b$10$hYF/MNOhkQQECRdmhHC.IeQozH02W7CFWV7eWjbtlp5HTUdpqasdC', NULL, NULL, NULL),
(13, 0, 1, 'Alejandro Neustadt', 'dialneus@gmail.com', '$2b$10$kylFs2Ph3u/8FE17MdJXB.rX2X8hA.VnOzypG/zQH8DuPYc.I5q.6', NULL, NULL, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id`) REFERENCES `BD-Kevin`.`carritoproductos` (`carritoId`);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
