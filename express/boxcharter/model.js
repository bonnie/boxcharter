// use Sequelize ORM to create database model

var Sequelize = require('Sequelize')

// Get this error when running:
// DeprecationWarning: Using the automatically created return value from client.query as an event emitter is deprecated and will be removed in pg@7.0. Please see the upgrade guide at https://node-postgres.com/guides/upgrading
// Executing (default): SELECT 1+1 AS result
// github issue: https://github.com/sequelize/sequelize/issues/7818

//////////////////////////////////////////////////////////////////////////////
// User
//////////////////////////////////////////////////////////////////////////////

//////////
// table
const User = sequelize.define('user', {
  userId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: Sequelize.STRING
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  // don't need joinedAt, since timestamps is true by default, and
  // createdAt, updatedAt will automatically be populated
})

////////////////
// associations

User.hasMany(Chart,
  through: {
  model: UserChart,
  unique: false
})

///////////
// methods
// // Adding a class level method
// User.classLevelMethod = function() {
//   return 'foo';
// };
//
// // Adding an instance level method
// User.prototype.instanceLevelMethod = function() {
//   return 'bar';
// };

//////////////////////////////////////////////////////////////////////////////
// Chart
//////////////////////////////////////////////////////////////////////////////

//////////
// table

////////////////
// associations

///////////
// methods

//////////////////////////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////////////////////////

//////////
// table

////////////////
// associations

///////////
// methods


//////////////////////////////////////////////////////////////////////////////
// Database connection and creation
//////////////////////////////////////////////////////////////////////////////

const sequelize = new Sequelize(
  'postgres:///boxchart_express',
  // { define: { paranoid: true } } // when deleting a record, leave in db and set deletedAt
)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// create tables, but only if they don't already exist
sequelize.sync()
  .then(() => {
    console.log('Tables created.')
  })
  .catch(error => {
    console.error(`Unable to create tables: ${error}`)
  })
)
