/* eslint no-unused-expressions: 0 */

import { Selector, ClientFunction } from 'testcafe';

fixture`Homepage`
  .page`http://localhost:8082`
  .beforeEach(async (t) => {
    await t.maximizeWindow();
  });

test('features', async (t) => {
  const scrollDown = ClientFunction(() => window.scrollTo(0, 10000));

  await t
    .expect(Selector('ris-app').exists)
    .ok('ris-app component is present')
    .expect(Selector('search-bar input').value)
    .eql('cats', 'search-bar contains expected value')
    .expect(Selector('photo-thumb').count)
    .eql(25, 'there are expected number of photo thumbs')
    .click(Selector('photo-thumb:nth-of-type(1)'))
    .expect(Selector('photo-details').visible)
    .ok('photo-details component is visible')
    .expect(Selector('photo-details h3').textContent)
    .notEql('', 'photo-details title is not empty')
    .expect(Selector('photo-details img.preview').exists)
    .ok('photo-details img is present')
    .click('photo-details .close')
    .expect(Selector('photo-details').visible)
    .notOk('photo-details component is not visible');
  await scrollDown();
  await t
    .expect(Selector('photo-thumb').count)
    .gte(25, 'there are more photo thumbs than before')
    .click('search-bar input')
    .pressKey('ctrl+a')
    .typeText('search-bar input', 'food')
    .click('search-bar button')
    .expect(Selector('photo-thumb').count)
    .gte(0, 'there is at least 1 photo thumb')
    .hover('photo-thumb:nth-of-type(1)')
    .expect(Selector('photo-thumb:nth-of-type(1) .overlay').visible)
    .ok('photo-thumb overlay is visible')
    .click('search-bar input')
    .pressKey('ctrl+a')
    .typeText('search-bar input', 'rgrgtrhtrhrthtrrhtrhrthrtfdew')
    .click('search-bar button')
    .expect(Selector('photo-alert').exists)
    .ok('photo-alert is present');
});
