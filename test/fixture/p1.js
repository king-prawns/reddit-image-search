/* eslint no-unused-expressions: 0 */

import { Selector } from 'testcafe';
import SearchPage from '../pages/search';
import DetailsPage from '../pages/details';
import { scrollBottom } from '../helpers';

const searchPage = new SearchPage();
const detailsPage = new DetailsPage();

fixture`advanced`
  .page`http://localhost:8082`;

test('nice test', async (t) => {
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
    .gte(25)
    .click(searchPage.searchBar)
    .pressKey('ctrl+a')
    .typeText(searchPage.searchBar, 'food')
    .click(searchPage.searchBtn)
    .expect(searchPage.thumbnails.count)
    .gt(0)
    .hover(searchPage.thumbnails.nth(0))
    .expect(searchPage.thumbnails.nth(0).find('.overlay').visible)
    .ok()
    .click(searchPage.searchBar)
    .pressKey('ctrl+a')
    .typeText(searchPage.searchBar, 'rgrgtrhtrhrthtrrhtrhrthrtfdew')
    .click(searchPage.searchBtn)
    .expect(searchPage.alert.exists)
    .ok();
});
