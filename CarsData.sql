set names utf8;
drop database if exists CarsData;
create database CarsData DEFAULT CHARACTER SET utf8;
use CarsData;
create table Cars
(
时间 datetime not null,
车牌号 varchar(7) not null,
动作 boolean not null,
primary key(时间,车牌号,动作)
);
create table 付款记录
(
时间 datetime not null,
车牌号 varchar(7) not null,
金额 double not null,
primary key(时间,车牌号)
);
create table 识别记录
(
时间 datetime not null,
图片 varchar(255) primary key,
识别结果 json not null
);
drop user if exists CarsData@'%';
create user CarsData@'%' identified WITH mysql_native_password by 'CarsData' PASSWORD EXPIRE NEVER;
grant select,update,insert,delete on CarsData.* to CarsData@'%';
flush privileges;
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:35:11', '2', 0);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:35:21', '2', 1);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:36:45', '2', 0);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:36:52', '2', 1);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:39:06', '2', 0);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:42:10', '3', 0);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:42:55', '4', 0);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 07:43:15', '4', 1);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 08:30:50', '4', 0);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 08:30:52', '4', 1);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 08:32:38', '4', 0);
INSERT INTO CarsData.Cars (时间, 车牌号, 动作) VALUES ('2019-07-02 08:32:52', '4', 1);
INSERT INTO CarsData.识别记录 (时间, 图片, 识别结果) VALUES ('2019-07-02 08:27:29', '4W9McfLNQA081dTwFslRqmGhk7rYanPS.jpg', '[["京NB2013", 0.9804667745317732, [0, 369, 397, 475]]]');
INSERT INTO CarsData.识别记录 (时间, 图片, 识别结果) VALUES ('2019-07-02 12:24:24', 'a2tbJUnTfAWrl7GoX0NhmIYVEReDky8q.jpg', '[["苏A6NK10", 0.981603477682386, [1262, 1156, 1877, 1318]]]');
INSERT INTO CarsData.识别记录 (时间, 图片, 识别结果) VALUES ('2019-07-02 08:27:19', 'fnTQERxHPcACbkBerZSwLzDh9405Nltd.jpg', '[["京NB2013", 0.9804667745317732, [0, 369, 397, 475]]]');
INSERT INTO CarsData.识别记录 (时间, 图片, 识别结果) VALUES ('2019-07-02 14:41:29', 'JXlW3sSFTENPwhpiALt7OCbaZm5yGD26.jpg', '[["京10Z8NH", 0.7399023047515324, [0, 115, 399, 225]]]');
INSERT INTO CarsData.识别记录 (时间, 图片, 识别结果) VALUES ('2019-07-02 12:24:12', 'mz2AUeEVwnfMkZFvrxl51Hd7WQ6Xo3i4.jpg', '[["苏A6NK10", 0.981603477682386, [1262, 1156, 1877, 1318]]]');
INSERT INTO CarsData.识别记录 (时间, 图片, 识别结果) VALUES ('2019-07-02 09:03:10', 'sGJob26VpPS0eErfzLt3lnDvKIXyRhFY.jpg', '[["京NB2013", 0.9804667745317732, [0, 369, 397, 475]]]');
INSERT INTO CarsData.识别记录 (时间, 图片, 识别结果) VALUES ('2019-07-02 11:18:16', 'shtbMNYZjKIqevQ3uBTXz6mOxHgGo4aP.jpg', '[["苏A6NK10", 0.981603477682386, [1262, 1156, 1877, 1318]]]');