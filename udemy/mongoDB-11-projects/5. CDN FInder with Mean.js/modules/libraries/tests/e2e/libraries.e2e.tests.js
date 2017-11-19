'use strict';

describe('Libraries E2E Tests:', function () {
  describe('Test Libraries page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/libraries');
      expect(element.all(by.repeater('library in libraries')).count()).toEqual(0);
    });
  });
});
