create table rsvps (
	id int (2) not null auto_increment,
	name varchar(30) not null,
    email varchar(30),
    phone int(8),
    answer varchar(20),
    primary key (id)
);

SELECT * FRoM birthday.rsvps;