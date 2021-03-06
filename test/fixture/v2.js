/* eslint no-unused-expressions: 0 */

import { Selector } from 'testcafe';

fixture`advanced`
  .page`http://localhost:8082`;

test('nice test', async (t) => {
  await t
    .expect(Selector('ris-app').exists)
    .ok('ris-app still working')
    .expect(Selector('search-bar input').value)
    .eql('cats', 'search-bar contains expected value')
    .expect(Selector('photo-thumb').count)
    .eql(25)
    .click(Selector('photo-thumb:nth-of-type(1)'))
    .expect(Selector('photo-details').visible)
    .ok()
    .expect(Selector('photo-details h3').textContent)
    .notEql('')
    .expect(Selector('photo-details img').exists)
    .ok()
    .click('photo-details .close')
    .expect(Selector('photo-details').visible)
    .notOk()
    .click('search-bar input')
    .pressKey('ctrl+a')
    .typeText('search-bar input', 'food')
    .click('search-bar button')
    .expect(Selector('photo-thumb').count)
    .gte(0)
    .hover('photo-thumb:nth-of-type(1)')
    .expect(Selector('photo-thumb:nth-of-type(1) .overlay').visible)
    .ok()
    .click('search-bar input')
    .pressKey('ctrl+a')
    .typeText('search-bar input', 'rgrgtrhtrhrthtrrhtrhrthrtfdew')
    .click('search-bar button')
    .expect(Selector('photo-alert').exists)
    .ok();
});
