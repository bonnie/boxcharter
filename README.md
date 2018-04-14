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

  See [INSTALLING.md](https://github.com/flyrightsister/boxcharter/blob/master/INSTALLING.md) for details.

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
    - [Redux Persist](https://github.com/rt2zz/redux-persist)
    - [Clarity](https://vmware.github.io/clarity)
    - [Jest](https://facebook.github.io/jest/)
    - [Enzyme](http://airbnb.io/enzyme/)

## Contributing
  
  See [CONTRIBUTING.md](https://github.com/flyrightsister/boxcharter/blob/master/CONTRIBUTING.md) for details.

### Linting
  This project uses [ESLint](https://eslint.org/), with the [AirBnB base](https://github.com/airbnb/javascript).

  To check linting, run `npm run lint` from the top level. This will check linting on both
  client and server JavaScript. Note that this uses the `--fix` flag and will automatically fix errors that can be fixed without human intervention.

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