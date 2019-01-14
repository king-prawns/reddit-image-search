import './style.pcss';

const html = String.raw;

export default class PhotoLoader extends HTMLElement {
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
    if (this.children.length > 0) {
      if (this.show) {
        this.setAttribute('show', true);
      } else {
        this.removeAttribute('show');
      }
    }
  }

  template() {
    return html`
      <div class="loader">
        <div class="spinner">
          <img src="./assets/images/loader.svg" alt="loader">
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template();
  }
}
