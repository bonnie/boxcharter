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
}
