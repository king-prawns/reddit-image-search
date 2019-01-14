import './style.pcss';

const html = String.raw;

export default class RisApp extends HTMLElement {
  constructor() {
    super();
    this.keyword = 'cats'; // initial value
  }

  static get observedAttributes() {
    return ['keyword', 'error'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this[attrName] !== newValue) {
      this[attrName] = newValue;
    }
  }

  get keyword() {
    return this._keyword;
  }

  set keyword(value) {
    if (this.keyword === value) return;
    this._keyword = value;
    if (this.children.length > 0) {
      this.querySelector('photo-gallery').photo = this.keyword;
    }
  }

  get error() {
    return this._error;
  }

  set error(value) {
    if (this.error === !!value) return;
    this._error = !!value;
    if (this.error) {
      this.setAttribute('error', true);
    } else {
      this.removeAttribute('error');
    }
  }

  template() {
    return html`
      <search-bar search="${this.keyword}"></search-bar>
      <div class="container">
        <header>HEADER</header>
        <nav>NAVIGATION</nav>
        <main>
          <photo-details></photo-details>
          <photo-loader></photo-loader>
          <photo-gallery photo="${this.keyword}"></photo-gallery>
        </main>
        <aside>ASIDE</aside>
        <footer>RIS</footer>
      </div>
    `;
  }

  connectedCallback() {
    this.addEventListener('search-photo', this.handleSearch);
    this.addEventListener('loading-photo', this.handleLoader);
    this.addEventListener('error-photo', this.handleError);
    this.addEventListener('open-photo', this.handleOpen);
    this.addEventListener('close-photo', this.handleClose);
    this.innerHTML = this.template();
  }

  disconnectedCallback() {
    this.removeEventListener('search-photo', this.handleSearch);
    this.removeEventListener('loading-photo', this.handleLoader);
    this.removeEventListener('error-photo', this.handleError);
    this.removeEventListener('open-photo', this.handleOpen);
    this.addEventListener('close-photo', this.handleClose);
  }

  handleSearch(e) {
    this.keyword = e.detail.value;
  }

  handleLoader(e) {
    this.querySelector('photo-loader').show = e.detail.loading;
    this.querySelector('search-bar').disabled = e.detail.loading;
  }

  handleError(e) {
    if (e.detail.error) {
      const photoError = document.createElement('photo-alert');
      photoError.message = e.detail.error;
      this.querySelector('.container').appendChild(photoError);
    }
  }

  handleOpen(e) {
    const photoDetails = this.querySelector('photo-details');
    photoDetails.title = e.detail.title;
    photoDetails.preview = e.detail.preview;
    photoDetails.url = e.detail.url;
    photoDetails.permalink = e.detail.permalink;
    photoDetails.author = e.detail.author;
    photoDetails.show = true;
  }

  handleClose() {
    this.querySelector('photo-details').show = false;
  }
}
