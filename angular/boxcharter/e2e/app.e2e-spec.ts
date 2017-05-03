import { BoxcharterPage } from './app.po';

describe('boxcharter App', () => {
  let page: BoxcharterPage;

  beforeEach(() => {
    page = new BoxcharterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
