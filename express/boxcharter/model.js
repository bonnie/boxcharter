// use Sequelize ORM to create database model

var Sequelize = require('Sequelize')

// Get this error when running:
// DeprecationWarning: Using the automatically created return value from client.query as an event emitter is deprecated and will be removed in pg@7.0. Please see the upgrade guide at https://node-postgres.com/guides/upgrading
// Executing (default): SELECT 1+1 AS result
// github issue: https://github.com/sequelize/sequelize/issues/7818

// sequelize instance
const sequelize = new Sequelize(
  'postgres:///boxchart_express'
  // { define: { paranoid: true } } // when deleting a record, leave in db and set deletedAt
)

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
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: Sequelize.STRING,
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

// User.hasMany(Chart,
//   {
//     through: {
//       model: UserChart,
//       unique: false
//     }
// })

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
const Chart = sequelize.define('chart', {
  chartId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // text metadata
  title: { type: Sequelize.STRING },
  author: { type: Sequelize.STRING },
  composer: { type: Sequelize.STRING },
  lyricist: { type: Sequelize.STRING },

  // is the lyricist the same as the composer?
  lyricist_same: {
    type: Sequelize.BOOLEAN,
    default: false,
  },

  // chart pdf properties
  maxPages: {
    type: Sequelize.INTEGER,
    default: 1,
  },
  minFontsize: {
    type: Sequelize.INTEGER,
    default: 10,
  },
  pageWidth: {
    type: Sequelize.FLOAT,
    default: 8.5,
  },
  pageHeight: {
    type: Sequelize.FLOAT,
    default: 11,
  },
  pageUnits: {
    type: Sequelize.STRING,
    default: 'inches',
  }
})

////////////////
// associations

// user_id (many to many?)

// # chart key
// original_key = db.Column(db.String(2), db.ForeignKey('keys.key_code'))
// print_key = db.Column(db.String(2),
//                       db.ForeignKey('keys.key_code'),
//                       nullable=True)
//


///////////
// methods

//////////////////////////////////////////////////////////////////////////////
// Note / ScaleNote / Key
//////////////////////////////////////////////////////////////////////////////

//////////
// tables



////////////////
// associations


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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// create tables, but only if they don't already exist
// sequelize.sync()
sequelize.sync({force: true}) // force=true creates tables even if they already exist
  .then(() => {
    console.log('Tables created.')
  })
  .catch(error => {
    console.error(`Unable to create tables: ${error}`)
  })
