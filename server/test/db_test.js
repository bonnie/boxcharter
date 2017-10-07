const expect = require('chai').expect
const initDB = require('./helpers/db_test_helpers.js').resetDB

describe('DB tests', () => {
  beforeEach('Reset the DB', () => initDB())
  it('should not fail', () => {
    expect(true).to.equal(true)
  })
})
