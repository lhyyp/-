/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : lhy

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-08-24 11:57:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品类别',
  `productSrc` varchar(255) CHARACTER SET utf8 NOT NULL,
  `cid` int(11) NOT NULL,
  `producttPrices` varchar(255) CHARACTER SET utf8 NOT NULL,
  `productIntroduce` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT '商品描述',
  `beastNum` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '18');
INSERT INTO `product` VALUES ('2', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '17');
INSERT INTO `product` VALUES ('3', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '20');
INSERT INTO `product` VALUES ('4', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '2000');
INSERT INTO `product` VALUES ('5', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '59');
INSERT INTO `product` VALUES ('6', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '87');
INSERT INTO `product` VALUES ('7', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '0');
INSERT INTO `product` VALUES ('8', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '1');
INSERT INTO `product` VALUES ('9', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '55');
INSERT INTO `product` VALUES ('10', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '520');
INSERT INTO `product` VALUES ('11', '1.jpg,2.jpg,3.jpg', '1', '199.00', '火焰鸟超清太阳伞 黑胶防嗮 晴雨两用', '1314');

-- ----------------------------
-- Table structure for product_banner
-- ----------------------------
DROP TABLE IF EXISTS `product_banner`;
CREATE TABLE `product_banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `introduction` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product_banner
-- ----------------------------
INSERT INTO `product_banner` VALUES ('1', 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', '1', '1');
INSERT INTO `product_banner` VALUES ('2', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', '2', '2');
INSERT INTO `product_banner` VALUES ('3', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', '3', '3');

-- ----------------------------
-- Table structure for product_classification
-- ----------------------------
DROP TABLE IF EXISTS `product_classification`;
CREATE TABLE `product_classification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 NOT NULL,
  `src` varchar(255) CHARACTER SET utf8 NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product_classification
-- ----------------------------
INSERT INTO `product_classification` VALUES ('1', 'index', 'present.png', '直兑精品');
INSERT INTO `product_classification` VALUES ('2', 'index', 'Cosmetics.png', '美妆个护');
INSERT INTO `product_classification` VALUES ('3', 'index', 'telephone.png', '数码家电');
INSERT INTO `product_classification` VALUES ('4', 'index', 'Powdered.png', '母婴玩具');
INSERT INTO `product_classification` VALUES ('5', 'index', 'food.png', '食品酒水');
INSERT INTO `product_classification` VALUES ('6', 'index', 'sport.png', '运动户外');
INSERT INTO `product_classification` VALUES ('7', 'index', 'car.png', '汽车用品');
INSERT INTO `product_classification` VALUES ('8', 'index', 'bag.png', '礼品箱包');
