import './style.pcss';

const html = String.raw;

export default class PhotoDetails extends HTMLElement {
  constructor() {
    super();
    this.closeDetail = this.closeDetail.bind(this);
    this.imageLoad = this.imageLoad.bind(this);
  }

  static get observedAttributes() {
    return ['show'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this[attrName] !== newValue) {
      this[attrName] = newValue;
    }
  }

  get show() {
    return this._show;
  }

  set show(value) {
    if (this.show === !!value) return;
    this._show = !!value;
    if (this.show) {
      this.setAttribute('show', true);
    } else {
      this.removeAttribute('show');
    }
    this.lazyRender();
  }

  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }

  get preview() {
    return this._preview;
  }

  set preview(value) {
    this._preview = value;
  }

  get url() {
    return this._url;
  }

  set url(value) {
    this._url = value;
  }

  get permalink() {
    return this._permalink;
  }

  set permalink(value) {
    this._permalink = value;
  }

  get author() {
    return this._author;
  }

  set author(value) {
    this._author = value;
  }

  get loaded() {
    return this._loaded;
  }

  set loaded(value) {
    this._loaded = !!value;
    if (this.loaded) {
      this.setAttribute('loaded', true);
    } else {
      this.removeAttribute('loaded');
    }
  }

  template() {
    if (this.show) {
      return html`
      <div class="modal">
        <h3>${this.title}</h3>
        <div class="image">
          <span class="close">✖️</span>
          <img class="preview" src="${this.preview}" alt="${this.title}">
          <img class="loader" src="./assets/images/loader.svg" alt="loader">
        </div>
        <div class="more">
          <div class="info">
            <label>Original URL: </label>
            <a href="${this.url}" target="_blank">open image</a>
          </div>
          <div class="info">
            <label>Subreddit: </label>
            <a href="${this.permalink}" target="_blank">open website</a>
          </div>
          <div class="info">
            <label>Author: </label>
            <span>${this.author}</span>
          </div>
        </div>
      </div>
    `;
    }
    return html`<div></div>`;
  }

  connectedCallback() {}

  disconnectedCallback() {}

  lazyRender() {
    if (this.show) {
      document.body.setAttribute('fullscreen', true);
      this.innerHTML = this.template();
      this.querySelector('.close').addEventListener('click', this.closeDetail);
      this.querySelector('.preview').addEventListener('load', this.imageLoad);
    } else {
      document.body.removeAttribute('fullscreen');
      this.querySelector('.close').removeEventListener('click', this.closeDetail);
      this.querySelector('.preview').removeEventListener('load', this.imageLoad);
      this.loaded = false;
      this.innerHTML = this.template();
    }
  }

  imageLoad() {
    this.loaded = true;
  }

  closeDetail() {
    this.dispatchEvent(new CustomEvent('close-photo', { bubbles: true }));
  }
}
