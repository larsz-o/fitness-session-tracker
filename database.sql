CREATE TABLE person (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"email_address" VARCHAR(800) UNIQUE NOT NULL,
	"token" VARCHAR (1000),
	"expiration" TIMESTAMP default now()
);
CREATE TABLE clients (
	"id" serial primary key, 
	"first_name" varchar (80) not null, 
	"last_name" varchar (80) not null, 
	"email_address" varchar (80), 
	"sessions" int
);

CREATE TABLE sessions (
	"id" serial primary key, 
	"date" date,
	"client_id" int references "clients" (id)  
);