import { Selector } from 'testcafe';

export default class DetailsPage {
  constructor() {
    this.title = Selector('photo-details h3');
    this.modal = Selector('photo-details');
    this.image = Selector('photo-details img');
    this.closeBtn = Selector('photo-details .close');
  }
}
