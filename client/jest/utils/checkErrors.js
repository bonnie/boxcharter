
export function checkForErrors() {
  beforeEach(() => {
    jest.spyOn(console, 'error');
  });

  afterEach(() => {
    expect(console.error).toHaveBeenCalledTimes(0);
    console.error.mockClear();
  });
}