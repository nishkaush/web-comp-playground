class HideShowButton extends HTMLElement {
  constructor() {
    super();
    // this creates a shadow DOM and makes available this.shadowRoot
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
    <button></button>
    <p><slot></slot></p>
    `;

    // props to help us access elements and their text
    this._btn;
    this._para;
    this._btnText;
    this._isParaVisible = false;
  }

  connectedCallback() {
    console.log("connected");
    this._btn = this.shadowRoot.querySelector("button");
    this._para = this.shadowRoot.querySelector("p");
    this._isParaVisible = this.getAttribute("is-visible") === "true" ? true : false;

    this._btnText = this._isParaVisible ? "Hide" : "Show";
    this._para.style.display = this._isParaVisible ? "block" : "none";
    this._btn.textContent = this._btnText;
    this._btn.addEventListener("click", this.handleBtnClick.bind(this));
  }

  handleBtnClick() {
    // console.log("btn clicked");
    this._isParaVisible = !this._isParaVisible;
  }

  static get observedAttributes() {
    return ["is-visible"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log("[attributeChangedCallback] changed from -> to", { oldVal, newVal });
    // if(oldVal===newVal)return;
    if (name === "_isParaVisible") {
      console.log("Para visibility changed from -> to", { oldVal, newVal });
    }
  }
}

customElements.define("nk-hide-show-btn", HideShowButton);
