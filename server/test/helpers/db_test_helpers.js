const db = require('../../db/db_connection.js').db

const getTables = () =>
  // get all tables in current db
  db.query(`SELECT table_name
              FROM information_schema.tables
              WHERE table_schema = 'public';`)

const resetDB = () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cowardly refusing to truncate production db.')
  }
  getTables()
    .then((tables) => {
      Promise.all(tables.map(table =>
        db.none(`TRUNCATE ${table.table_name} RESTART IDENTITY CASCADE`),
      ))
        .catch(console.error)
    })
    .catch(console.error)
}

const seedDB = () => {
  db.none()
}

const initDB = () => {
  resetDB()
    .then(() => seedDB())
    .catch(console.error)
}

module.exports = { initDB }
