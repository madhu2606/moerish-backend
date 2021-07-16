-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2021 at 03:24 PM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moerish`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `created_date`, `modified_date`) VALUES
(2, 'MainCourse', '2021-07-10 11:30:44', '0000-00-00 00:00:00'),
(3, 'Biryani', '2021-07-10 11:33:30', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_cost` varchar(100) NOT NULL,
  `item_discount` varchar(100) NOT NULL DEFAULT '0',
  `item_category` longtext NOT NULL,
  `item_description` longtext NOT NULL,
  `item_mob_smallimg` varchar(255) NOT NULL,
  `item_mob_largeimg` varchar(255) NOT NULL,
  `item_recomended` longtext NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`item_id`, `item_name`, `item_cost`, `item_discount`, `item_category`, `item_description`, `item_mob_smallimg`, `item_mob_largeimg`, `item_recomended`, `created_date`, `modified_date`) VALUES
(2, 'Chicken Biryani', '25', '15', '', 'newly added', 'iocn.png', 'icon2.png', '', '2021-06-25 13:55:55', '2021-06-25 17:29:23'),
(3, 'Chicken Biryani', '25', '1', '', '', 'iocn.png', 'icon2.png', '', '2021-07-10 11:16:30', '0000-00-00 00:00:00'),
(4, 'Chicken Biryani new', '25', '1', '2,3', '', 'iocn.png', 'icon2.png', '', '2021-07-10 11:54:08', '0000-00-00 00:00:00'),
(5, 'Paneer', '25', '1', '2', '', 'iocn.png', 'icon2.png', '', '2021-07-10 11:58:30', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `items_mapping`
--

CREATE TABLE `items_mapping` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items_mapping`
--

INSERT INTO `items_mapping` (`id`, `item_id`, `cat_id`, `created_date`, `modified_date`) VALUES
(1, 4, 2, '2021-07-10 11:54:08', '0000-00-00 00:00:00'),
(2, 4, 3, '2021-07-10 11:54:08', '0000-00-00 00:00:00'),
(3, 5, 2, '2021-07-10 11:58:30', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `items_rating`
--

CREATE TABLE `items_rating` (
  `id` int(11) NOT NULL,
  `item_id` bigint(20) NOT NULL,
  `review` longtext NOT NULL,
  `rating` varchar(255) NOT NULL,
  `review_name` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items_rating`
--

INSERT INTO `items_rating` (`id`, `item_id`, `review`, `rating`, `review_name`, `created_date`) VALUES
(2, 2, 'Best food', '2', 'Madhu', '2021-06-25 16:39:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(25) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `mobile`, `password`, `created_date`, `modified_date`) VALUES
(1, 'Madhu', 'madhu', 'madhu@gmail.com', '9989152039', '$2y$12$q99Tet2xd.R18J1m.x9wh.paOOs9KVIBFaYsQMdImhpXIluh62pkm', '2021-06-21 19:02:06', '2021-06-21 19:17:37'),
(2, 'Madhu Babu', 'madhu123', 'madhu@gmail.com', '9989152039', '$2a$10$58E0U0/Wvez0DPNZhla4Z.zvky27Yu/sStB9rsWIm305jFzy4z6LK', '2021-06-21 19:18:02', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `items_mapping`
--
ALTER TABLE `items_mapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items_rating`
--
ALTER TABLE `items_rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `items_mapping`
--
ALTER TABLE `items_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `items_rating`
--
ALTER TABLE `items_rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
