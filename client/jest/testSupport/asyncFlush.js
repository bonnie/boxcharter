// from https://github.com/jacek-rzrz/react-integration-tests-enzyme/blob/master/src/test_support/asyncFlush.js

export const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 0));
