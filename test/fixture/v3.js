/* eslint no-unused-expressions: 0 */

import { Selector } from 'testcafe';
import SearchPage from '../pages/search';
import DetailsPage from '../pages/details';
import { scrollBottom } from '../helpers';

const searchPage = new SearchPage();
const detailsPage = new DetailsPage();

fixture`expert`
  .page`http://localhost:8082`
  .beforeEach(async (t) => {
    await t.maximizeWindow();
  });

test('awesome test', async (t) => {
  await t
    .expect(Selector('ris-app').exists)
    .ok()
    .expect(searchPage.searchBar.value)
    .eql('cats')
    .expect(searchPage.thumbnails.count)
    .eql(25)
    .click(searchPage.thumbnails.nth(0))
    .expect(detailsPage.modal.visible)
    .ok()
    .expect(detailsPage.title.textContent)
    .notEql('')
    .expect(detailsPage.image.exists)
    .ok()
    .click(detailsPage.closeBtn)
    .expect(detailsPage.modal.visible)
    .notOk();
  await scrollBottom();
  await t
    .expect(searchPage.thumbnails.count)
    .gte(25);
  await searchPage.doSearch('food');
  await t
    .expect(searchPage.thumbnails.count)
    .gt(0)
    .hover(searchPage.thumbnails.nth(0))
    .expect(searchPage.thumbnails.nth(0).find('.overlay').visible)
    .ok();
  await searchPage.doSearch('rgrgtrhtrhrthtrrhtrhrthrtfdew');
  await t
    .expect(searchPage.alert.exists)
    .ok();
});
