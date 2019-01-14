import './style.pcss';
import isScrollExpectedOffset from './libs/is-scroll-expected';
import isImage from './libs/is-image';

const html = String.raw;

export default class PhotoGallery extends HTMLElement {
  constructor() {
    super();
    this.scrollEvent = this.scrollEvent.bind(this);
  }

  static get observedAttributes() {
    return ['photo'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this[attrName] !== newValue) {
      this[attrName] = newValue;
    }
  }

  get loading() {
    return this._loading;
  }

  set loading(value) {
    this._loading = !!value;
  }

  get after() {
    return this._after;
  }

  set after(value) {
    if (this.after === value) return;
    this._after = value;
  }

  get photo() {
    return this._photo;
  }

  set photo(value) {
    if (this.photo === value) return;
    this._photo = value;
    if (this.children.length > 0) {
      this.setAttribute('photo', this.photo);
      window.scrollTo(0, 0);
      this.after = '';
      this.fetchData(true);
    }
  }

  template() {
    return html`<div class="photo-thumbs"></div>`;
  }

  connectedCallback() {
    window.addEventListener('scroll', this.scrollEvent);
    this.innerHTML = this.template();
    this.fetchData();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.scrollEvent);
  }

  fetchData(newSearch) {
    this.dispatchLoading(true);
    if (this.photo) {
      let uri = `https://www.reddit.com/r/${this.photo}/top.json`;
      uri = this.after ? `${uri}?after=${this.after}` : uri;
      fetch(uri)
        .then(this.handleResponse)
        .then(res => res.json())
        .then(payload => this.appendData(payload.data, newSearch))
        .catch(() => this.handleError('An error has occurred 😱. Please try another keyword.'));
    } else {
      this.handleError('Empty search 😢. Please search something.');
    }
  }

  handleResponse(res) {
    return res.ok ? Promise.resolve(res) : Promise.reject(res);
  }

  dispatchLoading(loading) {
    this.loading = loading;
    this.dispatchEvent(new CustomEvent('loading-photo', {
      detail  : { loading }, bubbles : true
    }));
  }

  dispatchError(text) {
    this.dispatchEvent(new CustomEvent('error-photo', {
      detail  : { error: text }, bubbles : true
    }));
  }

  appendData(data, newSearch) {
    if (data.children.length <= 0) {
      this.handleError('Empty list 🙈. Please try another keyword.');
    } else {
      if (newSearch) {
        this.innerHTML = this.template();
      }
      this.handleSuccess();
      const container = this.querySelector('.photo-thumbs');
      data.children
        .map(child => child.data)
        .forEach((d, i) => {
          const photo = document.createElement('photo-thumb');
          photo.author = d.author;
          photo.title = d.title;
          photo.preview = isImage(d) ? this.retrievePreview(d.preview) : '';
          photo.url = d.url;
          photo.permalink = `https://www.reddit.com${d.permalink}`;
          photo.thumbnail = isImage(d) ? d.thumbnail : './assets/images/thumbnail.png';
          photo.isImage = isImage(d);
          photo.delay = i;
          container.appendChild(photo);
        });
      this.after = data.after || '';
    }
  }

  retrievePreview(preview) {
    const index = preview.images[0].resolutions.length - 1;
    return preview.images[0].resolutions[index].url.replace(/&amp;/g, '&');
  }

  handleError(text) {
    this.dispatchError(text);
    this.dispatchLoading(false);
  }

  handleSuccess() {
    this.dispatchError(null);
    this.dispatchLoading(false);
  }

  scrollEvent() {
    if (this.loading || !this.after) return;
    const scrollTarget = {
      oH : document.body.offsetHeight,
      sY : window.scrollY,
      iH : window.innerHeight
    };
    if (isScrollExpectedOffset(scrollTarget, 10)) {
      this.fetchData();
    }
  }
}
