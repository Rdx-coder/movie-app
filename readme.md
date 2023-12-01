# Movie Search Web App

This web application allows users to search for movies and TV shows, view details, and add their favorite movies to a collection.

## Getting Started

Follow the steps below to set up and run the Movie Search Web App locally.

### Prerequisites

1. Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. **Clone the Repository:**
  
   git clone [https://github.com/Rdx-coder/movie-app.git]
   cd movie-search-web-app

Install Dependencies:

npm install

-- Use the database
USE movie_app_db;

-- Create a table for favorites
CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year VARCHAR(10) NOT NULL,
  type VARCHAR(50) NOT NULL,
  poster VARCHAR(255) NOT NULL
);

run on terminal this command 

node app.js