import { AirfindsAngularPage } from './app.po';

describe('airfinds-angular App', function() {
  let page: AirfindsAngularPage;

  beforeEach(() => {
    page = new AirfindsAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
