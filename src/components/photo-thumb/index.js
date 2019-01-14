import './style.pcss';

const html = String.raw;

export default class PhotoThumb extends HTMLElement {
  constructor() {
    super();
    this.imageClick = this.imageClick.bind(this);
    this.imageLoad = this.imageLoad.bind(this);
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

  get thumbnail() {
    return this._thumbnail;
  }

  set thumbnail(value) {
    this._thumbnail = value;
  }

  get isImage() {
    return this._isImage;
  }

  set isImage(value) {
    this._isImage = !!value;
  }

  get delay() {
    return this._delay;
  }

  set delay(value) {
    this._delay = +value;
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
    return html`
      <div class="content">
        <img
          src="${this.thumbnail}"
          alt="${this.title}"
          style="animation-delay: ${this.delay / 20}s">
        <div class="overlay">
          <span>${this.isImage ? 'show' : 'open'}</span>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template();
    this.querySelector('.content').addEventListener('click', this.imageClick);
    this.querySelector('img').addEventListener('load', this.imageLoad);
  }

  disconnectedCallback() {
    this.querySelector('.content').removeEventListener('click', this.imageClick);
    this.querySelector('img').removeEventListener('load', this.imageLoad);
  }

  imageLoad() {
    this.loaded = true;
  }

  imageClick() {
    if (this.isImage) {
      this.dispatchEvent(new CustomEvent('open-photo', {
        detail: {
          title     : this.title,
          preview   : this.preview,
          url       : this.url,
          permalink : this.permalink,
          author    : this.author
        },
        bubbles: true
      }));
    } else {
      window.open(this.url);
    }
  }
}
