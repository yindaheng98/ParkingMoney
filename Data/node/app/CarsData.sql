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