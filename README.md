<p align="center">
<img src="client/assets/dbhive-logo.png" width="600">
</p>

<h1 align="center">Welcome to dbHive! 🐝</h1>
<h3 align="center">PostgreSQL Monitoring Tool</h3>
<br>

## Table of Contents
- [About](#about)
- [Getting Started](#getting-started)
- [Features](#features)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## About
dbHive offers an interactive dashboard to visualize the performance of one or more PostgreSQL databases. By providing easily accessible information about the health and activity of a database, dbHive enables developers to make informed decisions that optimize the way they store their data.

## Getting Started
### Method 1: Non-containerized
1. **Fork** and **clone** this [repository](https://github.com/oslabs-beta/dbhive) to your machine.
2. Navigate to the project directory and install dependencies.
```
npm install
```
3. Enter the following command to start up dbHive. 
```
npm start
```
4. Navigate to [http://localhost:3000](http://localhost:3000/).
5. Create an account on the sign up page.
6. Connect your database and get started!

### Method 2: Containerized
1. **Fork** and **clone** this [repository](https://github.com/oslabs-beta/dbhive) to your machine.
2. Navigate to the project directory and enter the following command:
```
docker-compose -f docker-compose-prod.yml up
```
3. Navigate to [http://localhost:3000](http://localhost:3000/).
4. Create an account on the sign up page.
5. Connect your database and get started!

## Features

### ➮ Query Execution Times
Get a broad sense of database performance by viewing average query times across the database, as well as averages for specific types of SQL queries. Pinpoint the slowest queries to gain insight for database improvement.
###
![Dashboard showing database metrics](client/assets/db-metrics.gif)

### ➮ Most Frequent Queries
To analyze common and recurring database activity, view charts on the most frequent queries within and across all query types.

### ➮ Other Key Stats
At a glance, gather other vital information, including:
- conflicts
- deadlocks
- rolled back transactions
- cache hit ratio
- block hits
- and more

### ➮ Access everything with a secure account
Maintain privacy and security with dbHive's required secure login. All database information and metrics are protected with encrypted accounts.

### ➮ Connect one or more databases
Easily access all databases and metrics within one place with the ability to toggle between multiple database dashboards.
###
![Toggle between database dashboards](client/assets/toggle-dbs.gif)

### ➮ Customize database metrics dashboard
Use dropdowns to view more details on a given metric. Expand graphs to fill the screen. Adjust the fetch interval, the frequency at which the dashboard is updated with the latest metrics.

### ➮ Delete a database
Navigate to the Setup page and remove a database when it is no longer in use, keeping your dashboard clean.

## Troubleshooting
If certain database metrics are not showing up in the dashboard, look into the database user's permissions. User permissions and admin privileges can vary depending on the database hosting service used.

# Contributing

Read our [contribution guide](https://github.com/oslabs-beta/dbhive/blob/main/CONTRIBUTING.md) for more information on how to contribute to dbHive.

## Development Mode
If you would like to participate in developing new features, the app can be launched in development mode:
``` 
npm run dev
```
or
```
docker-compose -f docker-compose-dev-hot.yml up
```

## Future Enhancements
- **Search Feature:** Add a search bar to the dashboard that allows users to find data by keywords.
- **Expansion to Other Databases:** Make dbHive available for other databases besides PostgreSQL.
- **Comparing Schemas:** Allow users to compare the performance of alternate database schemas alongside their current schemas.
- **Additional Customization:** Give users more power to customize graphs and dashboard arrangement.

### Authors
- Melanie Forbes [GitHub](https://github.com/mforbz12) | [LinkedIn](https://www.linkedin.com/in/melanie-forbes-/)
- Elise McConnell [GitHub](https://github.com/enmcco) | [LinkedIn](https://www.linkedin.com/in/elisemcconnell/)
- Brandon Miller [GitHub](https://github.com/bmiller1881) | [LinkedIn](https://www.linkedin.com/in/brandon-j-miller/)
- Emily Paine [GitHub](https://github.com/erpaine) | [LinkedIn](https://www.linkedin.com/in/emily-paine1/)
- Jeffery Richardson [GitHub](https://github.com/jrichardson-rn) | [LinkedIn](https://www.linkedin.com/in/jeffery-richardson-ii-2ba819100/)
