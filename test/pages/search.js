import { Selector, t } from 'testcafe';

export default class SearchPage {
  constructor() {
    this.searchBar = Selector('search-bar input');
    this.searchBtn = Selector('search-bar button');
    this.thumbnails = Selector('photo-thumb');
    this.alert = Selector('photo-alert');
  }

  async doSearch(text) {
    await t
      .click(this.searchBar)
      .pressKey('ctrl+a')
      .typeText(this.searchBar, text)
      .click(this.searchBtn);
  }
}
