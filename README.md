# Game Tracker
  ## ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

  ## Description
  A social-media web application that allows a user to make an account and log in, create, edit, and delete owned games entries following a template that saves to the user, add or remove friends, and share entries with added friends. This application is hosted by Heroku. This is intended for users who want to share what games they own with their in-site friends.

  The application is hosted on a server and uses many node modules to make the development easier, including: Express, Express-Session, Express-Handlebars, MySQL2, Sequelize, Connect-Session-Sequelize, Bcrypt, Bootstrap-icons, Validator and Dotenv. It is a fully functional web page that uses:
  * Node.js and Express.js to create RESTful APIs
  * Handlebars.js as the template engine
  * MySQL and the Sequelize ORM for the database
  * GET, POST, PUT, and DELETE routes to deal with data 
  * new Validator package & open-source code: Tiny Star Rating System In Vanilla JavaScript by nuflix
  * folder structure that meets MVC paradigm
  * authentication (express-session and cookies)
  * .env & .gitignore which protects personal information
  * Bootstrap to ensure a clean and responsive UI


  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Questions](#questions)
  
  ## Installation
  To install Node.js, follow the documentation [Node.js](https://coding-boot-camp.github.io/full-stack/nodejs/how-to-install-nodejs)

  To install MySQL, follow the documentation [MySQL](https://dev.mysql.com/downloads/installer/)

  To install necessary dependencies, run the following command: 
  ```
  npm i
  ```
  
  ## Usage
  Access the webpage by going to the deployed site: [Social-Game-Library](https://secret-beach-64321.herokuapp.com/). 
  
  Use the test account: Email: test@email.com password: !t3stmyPw0rd

  If you want to run this on a local server, set the path to the Social-Game-Library folder in the terminal and log in to MySQL and source the schema.sql by running `source db/schema.sql`. Run `npm seed` to source the seeds folder, if you want preset data.  Then run the server.js file by typing `npm start`. Go to http://localhost:3001 to acesss the site.
  
![GameTrackerLibrary](https://user-images.githubusercontent.com/83731627/133897304-41f08e77-944a-4df7-8360-7c5e6e5d9f1f.png)
![GameTrackerAddGame](https://user-images.githubusercontent.com/83731627/133897310-05c9c949-781e-4b4a-9ef3-ee02470b42bd.png)
![GameTrackerFeed](https://user-images.githubusercontent.com/83731627/133897306-d03507cf-badb-470d-84ca-b2fa9db42894.png)
![GameTrackerFriendsList](https://user-images.githubusercontent.com/83731627/133897323-3a0af4f7-2869-4edb-a962-2dcb50df2d70.png)


  ## License  
  This project is licensed under the terms of the [MIT License](https://opensource.org/licenses/MIT).

  ## Contributing
  Authors include: 
  David Gaither, Elbin Cenisev, & Nick Leon.
  If you would like to contribute alongside us, find our contact information below and reach out.


  ## Questions
  If you have any questions about the repo, you can either open an issue here on Github or contact any of us directly:
  David Gaither - Email: Gaitherdb@gmail.com - Github: [Gaitherdb](https://github.com/Gaitherdb)
  Elbin Cenisev - Email: elbincenisev@outlook.com  - Github: [Elbindb](https://github.com/elbin-cenisev)
  Nicolas Leon - Email: nicolas7@vt.edu - Github: [NickLeon92](https://github.com/NickLeon92)
