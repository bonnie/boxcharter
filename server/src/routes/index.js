const user = require('./user_routes')
const auth = require('./auth_routes')
const chart = require('./chart_routes')

module.exports = function(app) {

  app.use('/api/users', user)
  app.use('/api/auth', auth)
  app.use('/api/charts', chart)

}