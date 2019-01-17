import { Selector } from 'testcafe';

export default class SearchPage {
  constructor() {
    this.searchBar = Selector('search-bar input');
    this.searchBtn = Selector('search-bar button');
    this.thumbnails = Selector('photo-thumb');
    this.alert = Selector('photo-alert');
  }
}
