// adapted from https://github.com/jacek-rzrz/react-integration-tests-enzyme/blob/master/src/test_support/mockApi.js

class MockApi {

  API_URI = 'http://localhost:4000/';

  mockPostItem(item) {
      fetchMock.postOnce(this.API_URI, item);
  }

  mockGetItems(items, options) {
      fetchMock.get(this.API_URI, items, options);
  }

  mockGetItemsOnce(items) {
      this.mockGetItems(items, {times: 1})
  }
}

export const mockApi = new MockApi();