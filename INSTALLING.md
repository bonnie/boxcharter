# Installing BoxCharter

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