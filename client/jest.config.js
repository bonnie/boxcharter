module.exports = {
  testMatch: [
    'src/**/*-spec.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/helper/',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
}
