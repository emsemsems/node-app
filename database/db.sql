CREATE DATABASE database_links;

use database_links;

CREATE table users(
    id int (11) not null,
    username varchar (16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
);

alter table users 
    add Primary key (id);

alter table users
    modify id int(11) not null AUTO_INCREMENT, AUTO_INCREMENT =1;

DESCRIBE users;

--link Tables

CREATE Table links (
    id INT(11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    descripcion Text,
    user_id INT (11),
    create_at timestamp not null DEFAULT current-.timetamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

alter Table links 
    ADD Primary KEY (id);

ALTER Table links   
    modify id INT(11) not null AUTO_INCREMENT,AUTO_INCREMENT=2;

DESCRIBE links;