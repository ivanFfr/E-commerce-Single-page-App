import { ECommerceSinglePageAppPage } from './app.po';

describe('e-commerce-single-page-app App', () => {
  let page: ECommerceSinglePageAppPage;

  beforeEach(() => {
    page = new ECommerceSinglePageAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
