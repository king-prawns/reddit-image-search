import './style.pcss';

const html = String.raw;

export default class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.searchByKeyup = this.searchByKeyup.bind(this);
    this.searchByBlur = this.searchByBlur.bind(this);
    this.searchByClick = this.searchByClick.bind(this);
  }

  static get observedAttributes() {
    return ['search', 'disabled'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this[attrName] !== newValue) {
      this[attrName] = newValue;
    }
  }

  get search() {
    return this._search;
  }

  set search(value) {
    if (this.search === value) return;
    this._search = value;
    this.setAttribute('search', this.search);
  }

  get disabled() {
    return this._disabled;
  }

  set disabled(value) {
    if (this.disabled === !!value) return;
    this._disabled = !!value;
    const searchInput = this.querySelector('input');
    const searchBtn = this.querySelector('button');
    if (this.children.length > 0) {
      if (this.disabled) {
        searchInput.setAttribute('disabled', true);
        searchBtn.setAttribute('disabled', true);
      } else {
        searchInput.removeAttribute('disabled');
        searchBtn.removeAttribute('disabled');
      }
    }
  }

  template() {
    return html`
      <div class="search">
        <input type="search" placeholder="type something" value="${this.search}">
        <button type="button"><span>Search</span></button>
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template();
    this.querySelector('input').addEventListener('keyup', this.searchByKeyup);
    this.querySelector('input').addEventListener('blur', this.searchByBlur);
    this.querySelector('button').addEventListener('click', this.searchByClick);
  }

  disconnectedCallback() {
    this.querySelector('input').removeEventListener('keyup', this.searchByKeyup);
    this.querySelector('input').removeEventListener('blur', this.searchByBlur);
    this.querySelector('button').removeEventListener('click', this.searchByClick);
  }

  searchByKeyup(e) {
    return e.keyCode === 13 ? this.onSearch(e.target.value) : false;
  }

  searchByBlur(e) {
    return this.onSearch(e.target.value);
  }

  searchByClick() {
    return this.onSearch(this.querySelector('input').value);
  }

  onSearch(value) {
    this.search = value;
    this.dispatchEvent(new CustomEvent('search-photo', {
      detail  : { value }, bubbles : true
    }));
  }
}
