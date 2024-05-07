# Easy Tracking 
## Description

EasyTracking is a calorie counting application.
Inside the app, you can browse through different types of foods and add them to a meal in your personal "MyMeals"page.
The app uses an external API for many different types of foods, and their nutritional values, So you can be sure that you are keeping track of your calorie intake accurately.
On the "My Meals" page, you can change quantities, add or delete different foods from different meals and track the daily balance of calories you have consumed.

## Demo video

A short youtube video showing the application running: https://youtu.be/34MakeR1XE0

## Prerequisites

* Docker
* Docker Compose

## Installation 

1. Clone this repository to your local machine:
```
git clone (https://github.com/SagiDahari/EasyTracking.git)
```
2. Navigate to the project directory:
```
cd myapp
```
3. Build the Docker images and run the containers using docker-compose:
```
docker-compose up --build
```
The UI of the application is now running at: http://localhost:3000
The backend of the application is now running at: http://localhost:8000

### Enjoy!

## Testing

To run tests, navigate to the backend directory and and run: 
```
docker exec backend_c pytest test_main.py
```

## Built With

- [FastAPI](https://fastapi.tiangolo.com/) - Backend
- [React](https://reactjs.org/) - Frontend
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Docker](https://www.docker.com/) - Containerization and deployment

## Acknowledgements

For this project I used an external API of API Ninjas, in order to get the nutritional values of the different foods.
URL: https://api-ninjas.com/api/nutrition

## Authors

- Sagi Dahari - SagiDahari (https://github.com/SagiDahari)
