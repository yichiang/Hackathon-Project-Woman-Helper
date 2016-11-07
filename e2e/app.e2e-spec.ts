import { WomanHelpPage } from './app.po';

describe('woman-help App', function() {
  let page: WomanHelpPage;

  beforeEach(() => {
    page = new WomanHelpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
