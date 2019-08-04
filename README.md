# Fitness Session Tracker 
A React.js web application for personal trainers to track their clients' sessions. Trainers can add their clients and track how many sessions they've had out of their total number of prepaid sessions. Trainers can add clients, including their name, email address, and how many sessions they've purchased. They can then log sessions as they occur. When a client is nearing the end of their prepaid sessions (within 3), an email icon appears on the client's card, which allows the trainer to send a reminder email to the client, asking them to purchase additional sessions. Once the client's card is full (all prepaid sessions have been completed), the trainer can no longer log new sessions, ensuring that all sessions have been pre-purchased. If the trainer clears the client's card, the prepaid sessions are set to 0. The trainer can then edit the client's information (adding more sessions) when they have purchased additional sessions. 

## Built With
* React
* Node
* Express
* PostgreSQL
* Nodemailer
* Material UI
* Passport
* Redux
* Redux-Sagas
* Chance 


## Replicating this application

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table
```
Create a new database called `fitness_sessions`. 
Set up your database using the commands in `database.sql`. 
```

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project.
* You will need to add API keys for Nodemailer. Set up for [Nodemailer](https://nodemailer.com/about/).
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Screenshots
![home screen](https://github.com/larsz-o/fitness-session-tracker/blob/master/src/images/login.png?raw=true)
![client card filled](https://github.com/larsz-o/fitness-session-tracker/blob/master/src/images/client_card_full.png?raw=true)
![reminder email](https://github.com/larsz-o/fitness-session-tracker/blob/master/src/images/send_reminder_email.png?raw=true)

## Completed Features
- [x] Trainers can create, view, edit, and delete clients.
- [x] Trainers can log personal training sessions for specific clients.
- [x] When a client is nearing the end of their prepaid sessions, trainers can email the client to remind them to purchase additional sessions.
- [x] The email is send through Nodemailer, directly from the application's server. 
- [x] Once all prepaid sessions are completed, no additional sessions can be logged, unless the card is cleared and new prepaid sessions are added to the client's record. 
- [x] Trainers can reset their passwords.
- [x] Application is mobile-friendly! 

## Authors
Lars Mackenzie 