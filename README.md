# Boxcharter
  An open-source web application that creates chord/lyric "box charts" for jamming. This is currently a work in progress; _eventually_ it will be deployed at http://boxcharter.com.

## Getting Started
  These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
  To run this project, you'll need

  - [https://nodejs.org](Node.js) 8.x
  - [https://www.postgresql.org/](PostgreSQL) 9.x

### Installing
  1. Clone or fork repo

  2. __Configuration__

    - `$ cp server/config.js.template server/config.js`
      Fill out the variables in `config.js`

    - `$ cp server/env/production.sh.template server/env/production.sh`
      Fill out the environment variables in the template in `production.sh`

  3. __Node setup__: `$ npm run setup`

    This will accomplish a number of things: 
    
    a. install all node modules and dependencies
    b. create and seed the development PostgreSQL database: `boxcharter_dev`
    c. create the test PostgreSQL database: `boxcharter_test`

  4. __Start servers__: `$ npm start`

    This will use `nodemon` start both the React client and the Node Express server in a way that will reload on changes to the code.

### Running the Tests

  `$ npm test`

  This will run: 

  - Server tests
  - Client tests
  - End to End tests

## Built With

  - [https://www.postgresql.org/](PostgreSQL)
  - [https://nodejs.org](Node.js)
  - [https://github.com/vitaly-t/pg-promise](pg-promise)
  - [https://expressjs.com/](Express)
  - [https://reactjs.org/](React)
  - [https://redux.js.org/](Redux)
  - [https://www.npmjs.com/package/redux-thunk](Redux Thunk)
  - [https://getbootstrap.com/](Bootstrap)

## Contributing
  Coming soon...

  ### Linting
    Coming soon...

## Versioning
  Coming soon...

## Authors
  - [https://github.com/flyrightsister](Bonnie Schulkin) - _Initial work_

## License
  BoxCharter is licensed under the [GNU Affero General Public License](http://www.gnu.org/licenses/).

## Project History
  This has been a learning project for me. I started with a Python Flask back end and an AngularJS / Clarity front end to learn AngularJS. Then I switched to using Node.js and React/Redux on the job, and refactored this to have a Node Express back end and React/Redux on the front end to learn those technologies. 

## Acknowledgments
  - Many thanks to [https://www.rallycoding.com/](Stephen Grider) for his outstanding React courses on Udemy! 