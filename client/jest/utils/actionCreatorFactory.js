// from https://github.com/jacek-rzrz/react-integration-tests-enzyme/blob/master/src/utils/actionCreatorFactory.js

export const actionCreatorFactory = type => {
  const actionCreator = payload => ({type, payload});
  actionCreator.type = type;
  return actionCreator;
};