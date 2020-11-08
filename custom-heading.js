class CustomHeading extends HTMLHeadingElement {
  constructor() {
    super();
    this.style.color = "red";
  }
}

customElements.define("nk-custom-heading", CustomHeading, { extends: "h1" });
