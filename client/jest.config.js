const path = require('path');

module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/helper/',
  ],
  globals: {
    // put globals here
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/jest/setupTests.js',
};
