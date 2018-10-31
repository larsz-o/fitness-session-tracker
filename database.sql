CREATE TABLE person (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE clients (
	"id" serial primary key, 
	"first_name" varchar (80) not null, 
	"last_name" varchar (80) not null, 
	"phone_number" varchar (15), 
	"email_address" varchar (80)
);

CREATE TABLE sessions (
	"id" serial primary key, 
	"date" date,
	"client_id" int references "clients" (id)  
);