set schema 'project_2_location_service';

insert into users ("username", "password", "first_name", "last_name", "affiliation", "places_visited", "address", "email", "role", "image")
	values ('Mithrandir', 'YouShallNotPass', 'Gandalf', null, 'Fellowship', 1233, null, 'shadofaxTheFast@email.com', 'Admin', null),
		   ('RingBearer', 'myPrecious', 'Frodo', 'Baggins', 'Fellowship', 15, 'The Shire', 'frodoUnderhill@email.com', 'User', null),
		   ('SamIAm', 'password', 'Samwise', 'Gamgee', 'Fellowship', 15, 'The Shire', 'potatoes4life@email.com', 'User', null),
		   ('Strider', 'Actually87', 'Aragron II', 'Elessar Telcontar', 'Fellowship', 207, 'Gondor', 'Heir2Isildur@email.com', 'User', null),
		   ('Dernhelm', 'IAmNoMan', 'Eowyn', null, 'Rohan', 27, 'Rohan', 'shieldMaiden@email.com', 'User', null),
		   ('NotCountDooku', 'WiseWhiteWizard', 'Saruman', null, 'Sauron', 897, 'Isengard', 'sharkley@email.com', 'User', null);
select * from users;
insert into locations("name", "realm", "governance", "primary_population", "description", "avg_rating", "num_visited")
	values ('Bag End', 'The Shire', null, 'Hobbits', 'The abode of Bilbo and Frodo', null, null),
		   ('The Mines of Moria', 'Khazad-dum (Misty Mountains)', null, 'Goblins', 'Once a thriving dwarf city, it has since been overrun with goblins. Oh and a Balrog.', null, null),
		   ('Edoras', 'Rohan', 'King Theoden', 'Humans', 'The capital of Rohan', null, null),
		   ('Isengard', ' Nan Curunir', 'Saruman', 'Wizards', 'Not a great place anymore.', null, null);
		  
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

--select * from users;
--select * from users_locations;

insert into location_images("image")
	values ('image1'),
		   ('image2'),
		   ('image3'); --nothing yet; don't want the bucket to ruin things
		  
insert into locations_location_images("location_id", "image_id")
	values (1,1),
		   (2,2),
		   (2,3);--waiting for bucket
		   
--select * from locations_location_images;

--get all locations
select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", 
	array_agg(distinct (li."image")) as images
	from project_2.locations l
	left join project_2.locations_location_images lli on l."location_id"=lli."location_id"
	left join project_2.location_images li on li."image_id"=lli."image_id"
	group by l."location_id";

--get location by ID
select l."location_id", l."name", l."realm", l."governance", l."primary_population", l."description", l."avg_rating", l."num_visited", 
	array_agg(distinct (li."image")) as images
	from project_2.locations l
	left join project_2.locations_location_images lli on l."location_id"=lli."location_id"
	left join project_2.location_images li on li."image_id"=lli."image_id"
	where l."location_id"=2
	group by l."location_id";

--update who has visited the location and what the rating is 
--first, add a row in users_locations
insert into project_2.users_locations ("user_id", "location_id")
	values (5,1);
		--select * from project_2.users_locations where "user_id" = 5 and "location_id" = 1;
--update the user's places_visited
update project_2.users 
	set "places_visited" = 
		(select COUNT(ul."location_id") 
		from project_2.users_locations ul
		where ul."user_id" = 3)
	where "user_id"=3;
--select places_visted to return;
select u."places_visited" from  project_2.users u where u."user_id"=3;

--update the location's num_visited
update project_2.locations 
	set "num_visited" = 
		(select COUNT(ul."user_id") 
		from project_2.users_locations ul
		where ul."location_id" = 3)
	where "location_id"=3;
--select num_visited to be returned
select l."num_visited" from  project_2.locations l where l."location_id"=3;

--if the user gives a rating, add the rating to users_locations
update project_2.users_locations set "rating" = 3 where "user_id" = 5 and "location_id" = 1;
		--select * from project_2.users_locations where "user_id" = 5 and "location_id" = 1; 
--then, update the average rating on the locations
update project_2.locations 
	set "avg_rating" = 
		(select AVG(ul."rating") 
		FROM project_2.users_locations ul
		WHERE ul."location_id" = 3)
	where "location_id" = 3;
--select avg_rating from project_2.locations to be returned
select l."avg_rating" from project_2.locations l where l."location_id"=3;
		
--add a new photo of the location
insert into project_2.location_images ("image")
	values ('image5') returning "image_id";
insert into project_2.locations_location_images ("location_id", "image_id")
	values (3,4);
--to return the array of images for the location
select li."image_id", array_agg(distinct (li."image")) as images
	from project_2.location_images li
	left join project_2.locations_location_images lli on li."image_id"=lli."image_id"
	where lli."location_id" = 2
	group by li."image_id";