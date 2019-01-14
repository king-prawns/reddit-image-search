import './style.pcss';

const html = String.raw;

export default class PhotoAlert extends HTMLElement {
  constructor() {
    super();
    this.timer = null;
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
  }

  template() {
    return html`
      <div class="alert">
        <span>${this.message}</span>
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template();
    this.timer = setTimeout(() => {
      this.parentNode.removeChild(this);
    }, 3000);
  }

  disconnectedCallback() {
    clearTimeout(this.timer);
  }
}
