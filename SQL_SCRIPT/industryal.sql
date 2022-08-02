-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2021 at 10:44 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `industryal`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities_table`
--

CREATE TABLE `activities_table` (
  `id` int(6) UNSIGNED NOT NULL,
  `type` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `activity_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `activities_table`
--

INSERT INTO `activities_table` (`id`, `type`, `description`, `activity_time`) VALUES
(11, 'Create Warehouse', 'Warehouse Id: as, Warehouse Name: asd', '2021-06-29 20:42:59'),
(14, 'Create Product', 'Product Id: ONION001, Product Name: Onion', '2021-06-29 20:56:27'),
(16, 'Update Warehouse', 'Id: 1, Warehouse Name: Grocery', '2021-06-29 20:59:18'),
(17, 'Transfer Product', 'Product Id: GINGER002, Product Name: Ginger, From Warehouse: Foodstuffs, To Warehouse: Grocery, Quantity: 100', '2021-06-29 21:04:02'),
(18, 'Create Product', 'Product Id: BANANA001, Product Name: Banana', '2021-07-02 20:15:55'),
(20, 'Update Product', 'Product Id: BANANA001, Product Name: Banana', '2021-07-02 20:20:04'),
(51, 'Update Product', 'Product Id: POTATO001, Product Name: Potato', '2021-08-18 08:24:20'),
(52, 'Update Product', 'Product Id: ONION001, Product Name: Onion', '2021-08-18 08:32:09'),
(68, 'Create Product', 'Product Id: asdas, Product Name: asdas', '2021-08-20 09:50:24'),
(69, 'Update Product', 'Product Id: asdas, Product Name: asdas', '2021-08-20 09:50:59'),
(70, 'Delete Product', 'Id: 62\r\nProduct Name: asdas', '2021-08-20 09:51:14'),
(71, 'Transfer Product', 'Product Id: POTATO001, Product Name: Potato, From Warehouse: Grocery, To Warehouse: Foodstuffs, Quantity: 20', '2021-08-20 09:53:03'),
(72, 'Delete Product', 'Id: 63\r\nProduct Name: Potato', '2021-08-20 20:37:56');

-- --------------------------------------------------------

--
-- Table structure for table `administration`
--

CREATE TABLE `administration` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `issue_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issued_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issue_time` datetime NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `administration`
--

INSERT INTO `administration` (`id`, `issue_name`, `description`, `issued_by`, `issue_time`, `status`) VALUES
(1, 'Product chart data not fetehcing', 'Error at the time of loading product chart data. Please have a look.', 'atanusaha143', '2021-07-02 15:35:10', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `amount` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `type` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `holder_name` varchar(50) DEFAULT NULL,
  `account_no` varchar(50) DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `delivery_point` varchar(100) NOT NULL,
  `first_purchase` date NOT NULL,
  `type` varchar(25) NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `delivery_point`, `first_purchase`, `type`, `updated_at`) VALUES
(1, 'Edward Nigma', 'riddler@gmail.com', '+8801123456789', 'Dhanmondi, Dhaka, Bangladesh', '2021-02-02', 'regular', '2021-06-30 00:00:00'),
(2, 'Harvey Dent', 'twoface@gmail.com', '+8801123456789', 'Gulshan, Dhaka, Bangladesh', '2020-11-21', 'regular', '2021-06-30 00:00:00'),
(3, 'Oscar Wilde', 'wild@gmail.com', '+8801123456789', 'Uposhohor, Bogura, Bangladesh', '2018-07-18', 'regular', '2021-06-07 07:49:44'),
(4, 'Sam Wilson', 'falcon@gmail.com', '+8801723948372', 'Khulna, Bangladesh', '2021-07-01', 'regular', '2021-07-01 00:00:00'),
(5, 'John Marston', 'john@gmail.com', '+8801827393823', 'Texas, USA', '2021-07-02', 'regular', '2021-07-02 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `customer_emails`
--

CREATE TABLE `customer_emails` (
  `id` int(11) NOT NULL,
  `sent_from` varchar(100) NOT NULL,
  `content` varchar(2500) NOT NULL,
  `sent_datetime` datetime NOT NULL,
  `status` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_emails`
--

INSERT INTO `customer_emails` (`id`, `sent_from`, `content`, `sent_datetime`, `status`) VALUES
(1, 'riddler@gmail.com', 'I am writing this email to order for some ginger', '2021-06-08 08:50:16', 'unread'),
(2, 'wild@gmail.com', 'Hi, I want to tell you that I have been unable to receive my last order', '2021-06-16 08:51:49', 'unread'),
(3, 'wild@gmail.com', 'This is unacceptable behavior from the customer care, I will complain to the manager', '2021-06-16 08:51:49', 'unread');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(5) UNSIGNED NOT NULL,
  `employee_id` varchar(15) DEFAULT NULL,
  `employee_name` varchar(200) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `supervisor` varchar(50) NOT NULL,
  `present_address` varchar(300) NOT NULL,
  `phone` int(15) NOT NULL,
  `job_position` varchar(100) NOT NULL,
  `employee_group` varchar(200) DEFAULT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `hour_worked` int(50) NOT NULL,
  `employment_start_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `employee_id`, `employee_name`, `gender`, `supervisor`, `present_address`, `phone`, `job_position`, `employee_group`, `start_time`, `end_time`, `hour_worked`, `employment_start_date`) VALUES
(1, '101', 'Mahedy', 'male', 'product_manager', 'Rangpur', 1722846783, 'Worker', 'product', '09:00:00', '17:00:00', 8, '2021-06-27'),
(5, '102', 'Sagor', 'male', 'sales_manager', 'Dinajpur', 1777777775, 'Salesman', 'sales', '09:00:00', '19:00:00', 10, '2021-06-29'),
(6, '103', 'Mitu', 'female', 'Finance Manger', 'Rangpur', 1755114738, 'Finance Analyst', 'finance', '10:00:00', '18:00:00', 8, '2021-06-30');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` int(5) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `catagory` varchar(100) NOT NULL,
  `amount` double(10,2) NOT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `expense_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `name`, `catagory`, `amount`, `description`, `expense_date`) VALUES
(2, 'Atanu', 'Food', 4000.00, 'Food is any substance consumed to provide nutritional support for an organism.', '2021-06-29'),
(5, 'Dipto', 'Transport', 4500.00, 'Transportation, the movement of goods and persons from place to place', '2021-06-29');

-- --------------------------------------------------------

--
-- Table structure for table `finance_import_history`
--

CREATE TABLE `finance_import_history` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `action` varchar(15) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `file` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `finance_payment_history`
--

CREATE TABLE `finance_payment_history` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `finance_reports`
--

CREATE TABLE `finance_reports` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `file` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `title` varchar(500) DEFAULT NULL,
  `for_name` varchar(500) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `sales_order_id` int(11) DEFAULT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `file` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `leave_request`
--

CREATE TABLE `leave_request` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `request_description` varchar(1000) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `request_made` datetime DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `leave_request`
--

INSERT INTO `leave_request` (`id`, `type`, `request_description`, `start_time`, `end_time`, `request_made`, `status`, `employee_id`) VALUES
(1, 'Sick Leave', 'High fever and cough', '2021-07-02 00:00:00', '2021-07-05 00:00:00', '2021-06-30 18:12:10', 'Approved', 1),
(2, 'Sick Leave', 'Covid Vaccine 1', '2021-07-08 00:00:00', '2021-07-08 00:00:00', '2021-07-01 19:10:28', 'Approved', 1),
(3, 'Sick Leave', 'Covid Vaccine 2', '2021-08-08 00:00:00', '2021-08-08 00:00:00', '2021-07-01 19:11:19', 'Declined', 1),
(4, 'Other leave', 'Vaccine Rest', '2021-08-09 00:00:00', '2021-08-15 00:00:00', '2021-07-01 19:17:10', 'Declined', 1),
(17, 'Sick leave', 'sdfsd', '2021-08-20 00:00:00', '2021-08-25 00:00:00', '2021-08-20 09:55:14', 'Pending', 1);

-- --------------------------------------------------------

--
-- Table structure for table `liabilities`
--

CREATE TABLE `liabilities` (
  `id` int(11) NOT NULL,
  `amount` double DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `type` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2021_07_02_045507_create_sales_activities_table', 1),
(2, '2021_07_02_145744_create_administration_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `order_description` varchar(1000) DEFAULT NULL,
  `order_made` datetime DEFAULT NULL,
  `total_amount` int(11) DEFAULT NULL,
  `status` varchar(25) DEFAULT NULL,
  `delivered_on` datetime DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_description`, `order_made`, `total_amount`, `status`, `delivered_on`, `type`) VALUES
(1, 2, 'Needs lots of ginger for a farming project', '2021-06-16 11:38:09', 15000, 'delivered', '2021-01-12 20:41:23', NULL),
(3, 1, 'asdasd', '2021-07-02 08:44:45', 10000, 'delivered', '2021-02-10 23:52:08', NULL),
(4, 5, '1231esa', '2021-07-02 09:05:40', 18000, 'delivered', '2021-03-09 23:53:55', NULL),
(5, 5, 'asdas12', '2021-07-02 09:17:35', 5200, 'delivered', '2021-04-07 20:41:34', NULL),
(6, 2, '3dasd', '2021-02-08 22:58:03', 12000, 'delivered', '2021-05-06 23:53:45', 'debit'),
(7, 4, 'Need potatoes', '2021-04-12 23:57:08', 8000, 'delivered', '2021-05-10 23:57:08', 'debit');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `established` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `email`, `phone`, `fax`, `established`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Hulu', 'sinbad@mail.com', '01303132435', 'asdasdasdasdas', '2021-07-03', '2021-07-03 06:26:22', '2021-07-03 06:26:22');

-- --------------------------------------------------------

--
-- Table structure for table `product_table`
--

CREATE TABLE `product_table` (
  `id` int(6) UNSIGNED NOT NULL,
  `product_id` varchar(100) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `status_sell` varchar(50) NOT NULL,
  `status_purchase` varchar(50) NOT NULL,
  `product_description` varchar(10000) DEFAULT NULL,
  `warehouse_name` varchar(50) NOT NULL,
  `stock` double(10,2) NOT NULL,
  `nature` varchar(50) NOT NULL,
  `weight` varchar(100) NOT NULL,
  `weight_unit` varchar(100) NOT NULL,
  `dimention` varchar(100) NOT NULL,
  `dimention_unit` varchar(100) NOT NULL,
  `selling_price` double(10,2) NOT NULL,
  `tax` varchar(100) NOT NULL,
  `image` varchar(50) NOT NULL,
  `product_condition` varchar(30) NOT NULL,
  `date_added` varchar(50) NOT NULL,
  `last_updated` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_table`
--

INSERT INTO `product_table` (`id`, `product_id`, `product_name`, `status_sell`, `status_purchase`, `product_description`, `warehouse_name`, `stock`, `nature`, `weight`, `weight_unit`, `dimention`, `dimention_unit`, `selling_price`, `tax`, `image`, `product_condition`, `date_added`, `last_updated`) VALUES
(23, 'POTATO001', 'Potato', 'For sale', 'Not for purchase', 'The potato is one of some 150 tuber-bearing species of the genus Solanum (a tuber is the swollen end of an underground stem).', 'Grocery', 160.00, 'Raw Material', '50', 'kilogram', '10', 'm', 100.00, 'Excluding Tax', 'POTATO001.jpg', 'Good', '2021-06-29', '2021-08-19'),
(24, 'GINGER002', 'Ginger', 'For sale', 'Not for purchase', 'Ginger, Zingiber officinale, is an erect, herbaceous perennial plant in the family Zingiberaceae grown for its edible rhizome (underground stem) which is widely used as a spice.', 'Foodstuffs', 100.00, 'Raw Material', '20', 'kilogram', '10', 'm', 200.00, 'Excluding Tax', 'GINGER002.jpg', 'Good', '2021-06-29', '2021-06-29'),
(25, 'ONION001', 'Onion', 'For sale', 'Not for purchase', 'An onion is a round vegetable with a brown skin that grows underground. It has many white layers on its inside which have a strong, sharp smell and taste.', 'Grocery', 300.00, 'Manufactired Product', '25', 'kilogram', '10', 'm', 300.00, 'Excluding Tax', 'ONION001.jpg', 'Faulty', '2021-06-29', '2021-08-18'),
(35, 'BANANA001', 'Banana', 'For Sell', 'Not for purchase', 'Healthy Banana', 'Foodstuffs', 80.00, 'Raw Material', '20', 'kilogram', '20', 'm', 400.00, 'Excluding Tax', 'BANANA001.jpg', 'Good', '2021-08-10', '2021-08-17');

-- --------------------------------------------------------

--
-- Table structure for table `sales_activities`
--

CREATE TABLE `sales_activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `profile_pic` varchar(500) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `work_hour` varchar(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `profile_pic`, `firstname`, `lastname`, `username`, `email`, `phone`, `address`, `gender`, `position`, `type`, `pass`, `work_hour`, `created_at`, `updated_at`, `organization_id`) VALUES
(1, 'atanusaha143.JPG', 'Atanu', 'Saha', 'atanusaha143', 'atanu.saha415@gmail.com', '+880-1828675754', 'Dhaka, Bangladesh', 'Male', 'Product Manager', 'product', '12345678', '40', '2021-06-29 03:46:00', '2021-08-20 20:41:34', NULL),
(2, 'snigdho611', 'Snigdho Dip', 'Howlader', 'snigdho611', 'snigdho.howlader@gmail.com', '+8801665273645', '...', 'Male', 'sales', 'sales', 'snigdho@1996', '...', '2021-07-21 19:38:29', '2021-07-21 19:38:29', 1),
(3, NULL, 'Md', 'Rasel', 'rasel123', 'rasel@gmail.com', '+8801234543283', 'Dhaka, Bangladesh', 'Male', NULL, 'hr', 'rasel123', NULL, NULL, NULL, NULL),
(4, NULL, 'A.F.M', 'Noorrullah', 'fatah123', 'fatah@gmail.com', '+8801234543283', 'Dhaka, Bangladesh', 'Male', NULL, 'finance', 'fatah123', NULL, NULL, NULL, NULL),
(5, '60e0030e375e6.jpg', 'sinbad', 'sailor', 'sinbad', 'sinbad@mail.com', '01303132435', 'Dhaka', 'Male', 'Admin', 'admin', 'ABCD#abcd1', '0', '2021-07-03 06:26:23', '2021-07-03 06:26:23', 2);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_table`
--

CREATE TABLE `warehouse_table` (
  `id` int(6) UNSIGNED NOT NULL,
  `warehouse_id` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `zip_code` int(6) NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `quantity` double(10,2) NOT NULL,
  `remaining_quantity` double(10,2) NOT NULL,
  `status` varchar(100) NOT NULL,
  `date_added` varchar(50) NOT NULL,
  `last_updated` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `warehouse_table`
--

INSERT INTO `warehouse_table` (`id`, `warehouse_id`, `name`, `description`, `address`, `zip_code`, `city`, `country`, `phone`, `quantity`, `remaining_quantity`, `status`, `date_added`, `last_updated`) VALUES
(1, 'GROCERY001', 'Grocery', 'A grocery store is a retail store that sells food. Large grocery stores that stock products other than food, such as clothing or household items are called supermarkets. Some large supermarkets also include a pharmacy and an electronics section, the latter selling DVDs, headphones, digital alarm clocks, and similar items.', 'Basundhara', 8351, 'Dhaka', 'Bangladesh', '+880-1777777777', 500.00, 520.00, 'Open', '2021-06-27', '2021-06-29'),
(2, 'GROCERY002', 'Foodstuffs', 'A foodstuffs store is a retail store that sells food. Large grocery stores that stock products other than food, such as clothing or household items are called supermarkets. Some large supermarkets also include a pharmacy and an electronics section, the latter selling DVDs, headphones, digital alarm clocks, and similar items.', 'DumDum', 9230, 'Kolkata', 'India', '+98765432110', 400.00, 380.00, 'Open', '2021-06-27', '2021-06-27'),
(11, 'ELECTRONIC001', 'Electronic', 'All Electronics', 'Barisal', 8320, 'Barisal Sadar', 'Bangladesh', 'asda', 1000.00, 1000.00, 'Open', '2021-08-11', '2021-08-14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities_table`
--
ALTER TABLE `activities_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `administration`
--
ALTER TABLE `administration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assets_users_id_fk` (`manager_id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banks_users_id_fk` (`manager_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_emails`
--
ALTER TABLE `customer_emails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `finance_import_history`
--
ALTER TABLE `finance_import_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `finance_import_history_users_id_fk` (`employee_id`);

--
-- Indexes for table `finance_payment_history`
--
ALTER TABLE `finance_payment_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `finance_payment_history_users_id_fk` (`manager_id`);

--
-- Indexes for table `finance_reports`
--
ALTER TABLE `finance_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `finance_reports_users_id_fk` (`manager_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_users_id_fk` (`manager_id`);

--
-- Indexes for table `leave_request`
--
ALTER TABLE `leave_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leave_request_users_id_fk` (`employee_id`);

--
-- Indexes for table `liabilities`
--
ALTER TABLE `liabilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `liabilities_users_id_fk` (`manager_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_table`
--
ALTER TABLE `product_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_activities`
--
ALTER TABLE `sales_activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_organizations_id_fk` (`organization_id`);

--
-- Indexes for table `warehouse_table`
--
ALTER TABLE `warehouse_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities_table`
--
ALTER TABLE `activities_table`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `administration`
--
ALTER TABLE `administration`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `finance_import_history`
--
ALTER TABLE `finance_import_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `finance_payment_history`
--
ALTER TABLE `finance_payment_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `finance_reports`
--
ALTER TABLE `finance_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leave_request`
--
ALTER TABLE `leave_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `liabilities`
--
ALTER TABLE `liabilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product_table`
--
ALTER TABLE `product_table`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `warehouse_table`
--
ALTER TABLE `warehouse_table`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_users_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `banks`
--
ALTER TABLE `banks`
  ADD CONSTRAINT `banks_users_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `finance_import_history`
--
ALTER TABLE `finance_import_history`
  ADD CONSTRAINT `finance_import_history_users_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `finance_payment_history`
--
ALTER TABLE `finance_payment_history`
  ADD CONSTRAINT `finance_payment_history_users_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `finance_reports`
--
ALTER TABLE `finance_reports`
  ADD CONSTRAINT `finance_reports_users_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_users_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `leave_request`
--
ALTER TABLE `leave_request`
  ADD CONSTRAINT `leave_request_users_id_fk` FOREIGN KEY (`employee_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `liabilities`
--
ALTER TABLE `liabilities`
  ADD CONSTRAINT `liabilities_users_id_fk` FOREIGN KEY (`manager_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_organizations_id_fk` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
