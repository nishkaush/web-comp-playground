class ColoredLink extends HTMLAnchorElement {
  constructor() {
    super();
    this.style.color = "red";
  }
}

customElements.define("nk-link", ColoredLink, { extends: "a" });
