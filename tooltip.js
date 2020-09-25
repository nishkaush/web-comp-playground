class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.tooltipContainer;
    this.tooltipText;
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.tooltipText = this.getAttribute("text");
    const tooltipSpan = document.createElement("span");
    tooltipSpan.textContent = "(?)";
    tooltipSpan.addEventListener("mouseenter", this.showTooltip);
    tooltipSpan.addEventListener("mouseleave", this.hideTooltip);
    this.shadowRoot.appendChild(tooltipSpan);
  }

  showTooltip() {
    this.tooltipContainer = document.createElement("p");
    this.tooltipContainer.style.backgroundColor = "red";
    this.tooltipContainer.style.color = "white";
    this.tooltipContainer.textContent = this.tooltipText;
    this.shadowRoot.appendChild(this.tooltipContainer);
  }

  hideTooltip() {
    this.shadowRoot.removeChild(this.tooltipContainer);
  }
}

customElements.define("my-tooltip", Tooltip);
