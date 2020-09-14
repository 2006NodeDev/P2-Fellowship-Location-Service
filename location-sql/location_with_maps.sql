--we'll put the database stuff for locations here (change once photos are in)
create schema project_2_location_service;
set schema 'project_2_location_service';

--drop table users cascade;
drop table locations cascade;
drop table users_locations cascade;
drop table location_images cascade;
drop table locations_location_images cascade;

create table locations(
	"location_id" serial primary key,
	"name" text not null unique,
	"realm" text not null,
	"governance" text,
	"primary_population" text,
	"description" text,
	"avg_rating" numeric(2,1), 
	"num_visited" int, 
    "lat" numeric(10,6) not null,
    "lng" numeric(10,6) not null);
	
create table users_locations(
	"user_id" int references project_2_user_service.users ("user_id"),
	"location_id" int references project_2_location_service.locations ("location_id"),
	"rating" int,
	primary key ("user_id", "location_id")
);
--"user_id" int references project_2_user_service.users ("user_id"),
create table location_images(
	"image_id" serial primary key,
	"image" text not null
);

create table locations_location_images(
	"location_id" int references project_2_location_service.locations("location_id"),
	"image_id" int references project_2_location_service.location_images("image_id"),
	primary key ("location_id", "image_id")
);


--inserting fake data!!!
insert into locations("name", "realm", "governance", "primary_population", "description", "lat", "lng")
	values ('The Lonely Mountain', 'Erebor', 'Heirs of Durin', 'Dwarves', 'A mountain in the north-east of Rhovanion and the source of the river Running, and a major Dwarven stronghold', -39.304394, 175.526879),
           ('Rivendell', 'Eriador', 'Elrond', 'Elves', 'The beautiful, hidden refuge of the elves, on the west side of the Misty Mountains', -41.043036, 175.158078),
           ('Lothlorien', 'Lorien', 'The Kings of Lorien', 'Elves', 'Also known as the "Heart of Elvendom on Earth," this golden wood is protected by the power of Galadriel', -45.092183, 168.538091),
           ('The Elven Gate', 'Mirkwood', 'Thranduil', 'Elves', 'The entrance to the Elvish Road through Mirkwood, supposedly protected by the elves', -45.190767, 167.829326),
           ('Fangorn Forest', 'Rohan', null, 'Ents', 'Nestled between the Misty Mountains and Rohan, this forest is home to the last remaining Ents and Huorns', -45.416655, 167.716661),
           ('The Mines of Moria', 'Khazad-dum (Misty Mountains)', null, 'Goblins', 'Once a thriving dwarf city, it has since been overrun with goblins. Oh and a Balrog.', -41.551987, 172.540790),
           ('Hobbiton', 'The Shire', 'The Mayor', 'Hobbits', 'A peaceful village located in the Westfarthing of the Shire', -37.872003, 175.682917),
           ('Bag End', 'The Shire', null, 'Hobbits', 'The abode of Bilbo and Frodo', -37.857541, 175.679868),
           ('Minas Tirith', 'Gondor', 'The Steward of Gondor', 'Humans', 'The capital of Gondor, built into Mount Mindolluin, boasting seven layers leading up to the White Tower', -41.132910, 175.006884),
           ('Osgiliath', 'Gondor', 'The Steward of Gondor', 'Humans', 'In ages past this was the capital of Gondor, but its proximity to Mordor has made it a contested warzone', -40.582880, 175.204825),
           ('Esgaroth', 'Rhovanion', 'The Master', 'Humans', 'Previously Laketown, this is where the survivors from Dale reestablished themselves after Smaug was slain', -44.071569, 170.166566),
           ('Edoras', 'Rohan', 'The King of Rohan', 'Humans', 'The capital of Rohan, located in the valley of Harrowdale', -43.548000, 170.892908),
           ('Helm''s Deep', 'Rohan', 'The King of Rohan', 'Humans', 'An impenetrable fortress built into the White Mountains', -41.132910, 175.006884),
           ('The Black Gate', 'Mordor', 'Sauron', 'Ors', 'The main way to enter Mordor, but almost impossible to get through', -39.278381, 175.611010),
           ('The Dead Marshes', 'Dagorlad', null, 'The Dead', 'Don''t look into the water', -45.507643, 167.700146),
           ('The Paths of the Dead', 'The White Mountains', 'The King of the Dead', 'The Dead', 'A pass through the mountains haunted by the Dead Men of Dunharrow after they broke their promised alliance with Isildur', -41.445537, 175.247962),
           ('Isengard', ' Nan Curunir', 'Saruman', 'Wizards', 'Now a hive for uruk-hia, since Saruman joined forces with Sauron', -44.404200, 168.204570),
           ('Weathertop', 'Eriador', null, null, 'The long-since abandoned watch tower Amon Sul; a cool place to get stabbed', -37.482940, 174.760882),
           ('The Argonath', 'Gondor', 'The Steward of Gondor', null, 'Also known as the Pillars of the Kings, these giant statues mark the northern border of Gondor by the Anduin River', -45.010515, 168.893749),
           ('Mount Doom', 'Mordor', 'Sauron', null, 'The volcano where the one ring was forged, and the only place it can be destroyed', -39.156841, 175.632148);
--select * from locations;		  

insert into users_locations ("user_id", "location_id", "rating")
	values (1,1,3),(1,2,5),(1,3,5),(1,4,3),(1,5,4),(1,6,0),(1,7,5),(1,8,5),(1,9,4),(1,10,3),(1,11,4),(1,12,4),(1,13,5),(1,14,1),(1,15,1),(1,16,1),(1,17,1),(1,18,3),(1,19,4),(1,20,2),
		   (2,2,5),(2,3,4),(2,6,0),(2,7,4),(2,8,5),(2,10,1),(2,14,1),(2,15,0),(2,18,0),(2,19,3),(2,20,0),
		   (3,2,5),(3,3,5),(3,6,1),(3,7,5),(3,8,5),(3,10,1),(3,14,0),(3,15,0),(3,18,1),(3,19,4),(3,20,0),
		   (4,2,5),(4,3,4),(4,5,4),(4,6,1),(4,9,3),(4,12,4),(4,13,3),(4,14,0),(4,16,1),(4,18,1),(4,19,5),
		   (5,1,5),(5,2,2),(5,3,5),(5,4,2),(5,5,2),(5,6,3),(5,11,4),(5,12,4),(5,13,5),(5,16,0),(5,19,4),
		   (6,2,4),(6,6,1),(6,9,5),(6,10,2),(6,19,3),
		   (7,1,1),(7,2,5),(7,3,5),(7,4,4),(7,5,5),(7,6,1),(7,11,3),(7,12,4),(7,13,4),(7,16,1),(7,19,4),
		   (8,2,4),(8,9,5),(8,18,2),
		   (9,1,2),(9,2,4),(9,3,5),(9,4,2),(9,9,4),(9,10,3),(9,11,2),(9,14,0),(9,17,2),
		   (10,9,4),(10,12,3),(10,13,4),
		   (11,2,3),(11,4,3),(11,5,1),(11,7,1),(11,11,3),(11,15,3),(11,17,5),(11,20,3),
		   (12,2,5),(12,3,5),(12,5,4),(12,6,1),(12,7,5),(12,8,4),(12,9,4),(12,12,5),(12,17,1),(12,18,1),(12,19,4),
		   (13,2,5),(13,3,5),(13,5,4),(13,6,1),(13,7,5),(13,8,4),(13,9,2),(13,12,3),(13,17,1),(13,18,0),(13,19,4),
		   (14,7,1),(14,9,1),(14,10,1),(14,14,4),(14,15,3),(14,20,4),
		   (15,7,1),(15,12,3),(15,13,3),(15,17,3);
--select * from users_locations;

insert into location_images("image")
	values ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/BagEnd.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/BagEnd2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Edoras.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Edoras2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Esgaroth.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/FangornForest.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/FangornForest2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/HelmsDeep.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/HelmsDeep2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Hobbiton.jpeg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Hobbiton2.jpeg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Isengard.jpeg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Isengard2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Lothlorien.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Lothlorien2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/MinasTirith.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/MinasTirith2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/MountDoom.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/MountDoom2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/MountDoom3.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Osgiliath.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Osgiliath2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Rivendell.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Rivendell2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Rivendell3.png'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheArgonath.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheBlackGate.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheDeadMarshes.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheElvenGate.png'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheLonelyMountain.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheLonelyMountain2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheMinesOfMoria.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheMinesOfMoria2.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/TheMinesOfMoria3.jpg'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/ThePathsOfTheDead.png'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/ThePathsOfTheDead2.png'),
		   ('https://storage.googleapis.com/p2-fellowship/LOTR_Locations/Weathertop.png');
--select * from location_images; 

insert into locations_location_images("location_id", "image_id")
	values	(1,30),(1,31),
			(2,23),(2,24),(2,25),
			(3,14),(3,15),
			(4,29),
			(5,6),(5,7),
			(6,32),(6,33),(6,34),
			(7,10),(7,11),
			(8,1),(8,2),
			(9,16),(9,17),
			(10,21),(10,22),
			(11,5),
			(12,3),(12,4),
			(13,8),(13,9),
			(14,27),
			(15,28),
			(16,35),(16,36),
			(17,12),(17,13),
			(18,37),
			(19,26),
			(20,18),(20,19),(20,20);
--select * from locations_location_images;

		  
		  
--updating information dependent on other tables!!!

--update the user's places_visited
update project_2_user_service.users u 
	set "places_visited" = 
		(select COUNT(ul."location_id") 
		from project_2_location_service.users_locations ul
		where ul."user_id" = u."user_id")
	where "user_id">0;--for all users
--select ("username","places_visited") from  users;

--update the location's num_visited
update project_2_location_service.locations l
	set "num_visited" = 
		(select COUNT(ul."user_id") 
		from project_2_location_service.users_locations ul
		where ul."location_id" = l."location_id")
	where "location_id">0; --for all locations
--select ("name","num_visited") from  locations;

-- update the average rating on the locations
update project_2_location_service.locations l
	set "avg_rating" = 
		(select AVG(ul."rating") 
		FROM project_2_location_service.users_locations ul
		WHERE ul."location_id" = l."location_id")
	where "location_id">0;

--select avg_rating and compare with individual ratings
-- select l."name", l."num_visited", l."avg_rating",
-- 	array_agg(distinct (ul."rating")) as ratings,
-- 	array_agg(distinct (ul."user_id")) as users_visited
--  	from locations l
--   	inner join users_locations ul on l."location_id"=ul."location_id"
--   	group by l."location_id";


--get all locations with images
select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", l."lat", l."lng",
 	array_agg(distinct (li."image")) as images
 	from locations l
 	left join locations_location_images lli on l."location_id"=lli."location_id"
 	left join location_images li on li."image_id"=lli."image_id"
 	group by l."location_id";