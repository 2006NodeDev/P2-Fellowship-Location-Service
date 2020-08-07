--we'll put the database stuff for locations here
create schema project_2_location_service;
set schema 'project_2_location_service';

--drop table users;
--drop table locations;
--drop table users_locations;
--drop table location_images;
--drop table locations_location_images;

create table users(
	"user_id" serial primary key,
	"username" text not null unique,
	"password" text not null,
	"first_name" text not null,
	"last_name" text,
	"affiliation" text not null,
	"places_visited" int, 
	"address" text,
	"email" text not null,
	"role" text not null,
	"image" text
);

create table locations(
	"location_id" serial primary key,
	"name" text not null unique,
	--"image"	text,
	"realm" text not null,
	"governance" text,
	"primary_population" text,
	"description" text,
	"avg_rating" int, 
	"num_visited" int
);
	
create table users_locations(
	"user_id" int references users ("user_id"),
	"location_id" int references locations ("location_id"),
	"rating" int,
	--"comment" text,
	primary key ("user_id", "location_id")
);

create table location_images(
	"image_id" serial primary key,
	"image" text not null
);

create table locations_location_images(
	"location_id" int references locations("location_id"),
	"image_id" int references location_images("image_id"),
	primary key ("location_id", "image_id")
);


--inserting fake data!!!

insert into users ("username", "password", "first_name", "last_name", "affiliation", "address", "email", "role", "image")
	values ('Mithrandir', 'YouShallNotPass', 'Gandalf', null, 'Fellowship', null, 'shadofaxTheFast@email.com', 'Admin', null),
		   ('RingBearer', 'myPrecious', 'Frodo', 'Baggins', 'Fellowship', 'The Shire', 'frodoUnderhill@email.com', 'User', null),
		   ('SamIAm', 'password', 'Samwise', 'Gamgee', 'Fellowship', 'The Shire', 'potatoes4life@email.com', 'User', null),
		   ('Strider', 'Actually87', 'Aragron II', 'Elessar Telcontar', 'Fellowship', 'Gondor', 'Heir2Isildur@email.com', 'User', null),
		   ('Dernhelm', 'IAmNoMan', 'Eowyn', null, 'Rohan', 'Rohan', 'shieldMaiden@email.com', 'User', null),
		   ('NotCountDooku', 'WiseWhiteWizard', 'Saruman', null, 'Sauron', 'Isengard', 'sharkley@email.com', 'User', null);
--select * from users;

insert into locations("name", "realm", "governance", "primary_population", "description", "avg_rating", "num_visited")
	values ('Bag End', 'The Shire', null, 'Hobbits', 'The abode of Bilbo and Frodo', null, null),
		   ('The Mines of Moria', 'Khazad-dum (Misty Mountains)', null, 'Goblins', 'Once a thriving dwarf city, it has since been overrun with goblins. Oh and a Balrog.', null, null),
		   ('Edoras', 'Rohan', 'King Theoden', 'Humans', 'The capital of Rohan', null, null),
		   ('Isengard', ' Nan Curunir', 'Saruman', 'Wizards', 'Not a great place anymore.', null, null);
--select * from locations;		  
insert into users_locations ("user_id", "location_id", "rating")
	values (1,1,5),
		   (1,2,1),
		   (1,3,4),
		   (1,4,2),
		   (2,1,5),
		   (2,2,1),
		   (3,1,5),
		   (3,2,1),
		   (4,2,2),
		   (4,3,4),
		   (5,3,3),
		   (6,4,5);
--select * from users_locations;

insert into location_images("image")
	values ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Moria.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/bag-end-1.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/bag-end-2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Isengard.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/edoras.jpg'); --nothing yet; don't want the bucket to ruin things
--select * from location_images; 

insert into locations_location_images("location_id", "image_id")
	values (2,1),
		   (1,2),
		   (1,3),
		   (4,4),
		   (3,5);
--select * from locations_location_images;

--updating information dependent on other tables!!!

--update the user's places_visited
update users u 
	set "places_visited" = 
		(select COUNT(ul."location_id") 
		from users_locations ul
		where ul."user_id" = u."user_id")
	where "user_id">0;--for all users
--select places_visted to return;
-- select ("username","places_visited") from  users;

--update the location's num_visited
update locations l
	set "num_visited" = 
		(select COUNT(ul."user_id") 
		from users_locations ul
		where ul."location_id" = l."location_id")
	where "location_id">0; --for all locations
--select num_visited to be returned
-- select ("name","num_visited") from  locations;

-- --then, update the average rating on the locations
update locations l
	set "avg_rating" = 
		(select AVG(ul."rating") 
		FROM users_locations ul
		WHERE ul."location_id" = l."location_id")
	where "location_id">0;
--select avg_rating and compare with individual ratings
-- select l."name", l."avg_rating",
-- 	array_agg(distinct (ul.user_id, ul."rating")) as ratings
-- 	from locations l
--  	inner join users_locations ul on l."location_id"=ul."location_id"
--  	group by l."location_id";


--get all locations
select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", 
 	array_agg(distinct (li."image")) as images
 	from locations l
 	left join locations_location_images lli on l."location_id"=lli."location_id"
 	left join location_images li on li."image_id"=lli."image_id"
 	group by l."location_id";