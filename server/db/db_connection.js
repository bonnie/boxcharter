const pgp = require('pg-promise')()

const connectionString = process.env.DB_URL || 'postgres://localhost/boxcharter_test'
const db = pgp(connectionString)

module.exports = { db }
