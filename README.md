# BoxCharter

### WIP: An open-source web application that creates chord/lyric "box charts" for songwriting and jamming. 

## Contents

1. [Deployed Site](#deployed-site)
2. [Overview](#overview)
3. [Getting Started](#getting-started)
4. [Built With](#built-with)
5. [Contributing](#contributing)
6. [Versioning](#versioning)
7. [Authors](#authors)
8. [License](#license)
9. [Project History](#project-history)
10. [Acknowledgements](#acknowledgments)

## Deployed Site
  
__This is currently a work in progress__; it will eventually be deployed at http://boxcharter.com.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
To run this project, you'll need

- [Node.js](https://nodejs.org) 8.x
- [nvm](https://github.com/creationix/nvm)
- [PostgreSQL](https://www.postgresql.org/) 9.x

### Installation
  1. Clone or fork repo

  2. Configuration
  
      1. `$ cp server/config.js.template server/config.js`
      2. Populate the values in `server/config.js`
      3. `$ cp client/config.js.template client/config.js`
      4. Populate the values in `client/config.js`

  3. Node setup 
  
      1. `$ nvm use`

          This will use the nvm version assigned for this project. 
          
          __Notes__: 
          
          - `nvm` may instruct you to install a new version of Node; follow instructions as necessary. Run `nvm use` again after installing a new version.
          - You will need to run `nvm use` whenever you open a new shell for this project.

      2. `$ npm run setup`

          This will accomplish a number of things: 

          1. install all node modules and dependencies

          2. create and seed the development PostgreSQL database: `boxcharter_dev` __Note__: This database will be _destroyed and overwritten_ if it already exists!

          3. create the test PostgreSQL database: `boxcharter_test` __Note__: This database will be _destroyed and overwritten_ if it already exists!

  4. Start servers 

      1. Start two separate shells

      2. In one of the shells, cd into the `client` directory; in the other cd into the `server` directory. 

      3. In each directory, run `$ nvm use`

      4. In each directory, run `$ npm run dev:start`

      __Notes__: 
      - The advantage of running these separately is to have separate output for each server.
      - These scripts use `nodemon` start both the React client / Node Express server in a way that will reload on changes to the code.

### Accessing the application

  Log on to [http://localhost:8080](http://localhost:8080) to access the client front end. The Express server, by default, runs on port 3090.

### Running tests

  `$ npm test`

  This will run: 

  - Server tests
  - Client tests
  - End to End tests

### Logs

  Coming in the future...

## Built With

  - Back End
    - [PostgreSQL](https://www.postgresql.org/)
    - [Node.js](https://nodejs.org)
    - [pg-promise](https://github.com/vitaly-t/pg-promise)
    - [Express](https://expressjs.com/)
    - [Mocha](https://mochajs.org/)
    - [Chai](http://chaijs.com/)
  - Front End
    - [React](https://reactjs.org/)
    - [Redux](https://redux.js.org/)
    - [Redux Thunk](https://www.npmjs.com/package/redux-thunk)
    - [Clarity](https://vmware.github.io/clarity)
    - [Jest](https://facebook.github.io/jest/)
    - [Enzyme](http://airbnb.io/enzyme/)

## Contributing
  Coming in the future...

### Linting
  Coming in the future...

## Versioning
  Coming in the future...

## Authors
  - [Bonnie Schulkin](https://github.com/flyrightsister) - _Initial work_

## License
  BoxCharter is licensed under the [GNU Affero General Public License](http://www.gnu.org/licenses/).

## Project History
  This has been a learning project for me. I started with a Python Flask back end and an AngularJS / Clarity front end to learn AngularJS. Then I switched to using Node.js and React/Redux on the job, and refactored this to have a Node Express back end and React/Redux on the front end to learn those technologies. 

## Acknowledgments
  - Many thanks to [Stephen Grider](https://www.rallycoding.com/) for his outstanding React courses on Udemy! 