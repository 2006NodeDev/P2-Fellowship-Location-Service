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
