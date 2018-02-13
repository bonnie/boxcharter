# Boxcharter
  An open-source web application that creates chord/lyric "box charts" for jamming. This is currently a work in progress; _eventually_ it will be deployed at http://boxcharter.com.

## Getting Started
  These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
  To run this project, you'll need

  - (https://nodejs.org)[Node.js] 8.x
  - (https://github.com/creationix/nvm)[nvm]
  - (https://www.postgresql.org/)[PostgreSQL] 9.x

### Installing
  1. Clone or fork repo

  2. __Configuration__: `$ cp server/config.js.template server/config.js`

    Fill out the variables in `config.js`

  3. __Node setup__: 
  
    a. `$ nvm use`

    This will use the nvm version assigned for this project. __Note__: nvm may instruct you to install a new version of Node; follow instructions as necessary.

    b. `$ npm run setup`

    This will accomplish a number of things: 
  
    1. install all node modules and dependencies
    2. create and seed the development PostgreSQL database: `boxcharter_dev`
    3. create the test PostgreSQL database: `boxcharter_test`

  4. __Start servers__: 

    a. Start two separate shells
    b. In one of the shells, cd into the `client` directory; in the other cd into the `server` directory. 
    c. Run `$ npm run dev:start` in each directory.

    __Notes__: 
    - The advantage of running these separately is to have separate output for each server.
    - These scripts use `nodemon` start both the React client / Node Express server in a way that will reload on changes to the code.

### Accessing the server

  Log on to [http://localhost:8080] to access the client front end. The Express server, by default, runs on port 3090.

### Running the Tests

  `$ npm test`

  This will run: 

  - Server tests
  - Client tests
  - End to End tests

### Logs
  Coming in the future...

## Built With

  - (https://www.postgresql.org/)[PostgreSQL]
  - (https://nodejs.org)[Node.js]
  - (https://github.com/vitaly-t/pg-promise)[pg-promise]
  - (https://expressjs.com/)[Express]
  - (https://reactjs.org/)[React]
  - (https://redux.js.org/)[Redux]
  - (https://www.npmjs.com/package/redux-thunk)[Redux Thunk]
  - (https://getbootstrap.com/)[Bootstrap]

## Contributing
  Coming in the future...

  ### Linting
    Coming in the future...

## Versioning
  Coming in the future...

## Authors
  - (https://github.com/flyrightsister)[Bonnie Schulkin] - _Initial work_

## License
  BoxCharter is licensed under the (GNU Affero General Public License)[http://www.gnu.org/licenses/).

## Project History
  This has been a learning project for me. I started with a Python Flask back end and an AngularJS / Clarity front end to learn AngularJS. Then I switched to using Node.js and React/Redux on the job, and refactored this to have a Node Express back end and React/Redux on the front end to learn those technologies. 

## Acknowledgments
  - Many thanks to (https://www.rallycoding.com/)[Stephen Grider] for his outstanding React courses on Udemy! 