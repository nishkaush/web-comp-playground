class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = template;
    this.modalContainer = this.shadowRoot.querySelector("#modal-container");
    this.modal = this.shadowRoot.querySelector("#modal");

    this.inputElm = this.shadowRoot.querySelector("input");
    this.reconsentCheckbox = this.shadowRoot.querySelector("#reconsent-checkbox");

    this.cancelBtn = this.shadowRoot.querySelector("#cancel-btn");
    this.okayBtn = this.shadowRoot.querySelector("#okay-btn");
    this.cancelBtn.addEventListener("click", this.handleCancel.bind(this));
    this.okayBtn.addEventListener("click", this.handleOkay.bind(this));
    this.modal.addEventListener("click", (e) => e.stopPropagation());
    this.modalContainer.addEventListener("click", this.handleBackDropClick.bind(this));

    this.inputElm.addEventListener("input", (e) => this.handleInput(e));
  }

  connectedCallback() {
    if (!this.getAttribute("opened")) {
      this.style.display = "none";
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "opened") newVal === "" ? this.open() : this.close();
  }

  static get observedAttributes() {
    return ["opened"];
  }

  handleCancel() {
    this.close();
  }
  handleOkay() {
    const val = this.inputElm.value;
    const consent = this.reconsentCheckbox.checked;
    const customEvent = new CustomEvent("inputchanged", {
      bubbles: true,
      composed: true,
      detail: { val, consent },
    });
    this.dispatchEvent(customEvent);
    this.close();
  }
  handleBackDropClick(e) {
    this.close();
  }

  handleInput(e) {}

  open() {
    console.log("opening..");
    this.style.display = "block";
  }

  close() {
    console.log("closing..");
    this.style.display = "none";
  }
}

const template = `
<style>
  :host{
    font-family: sans-serif;
  }
  :host button{
    width: 150px;
    height: 30px;
  }
  :host input{
    border:1px solid green;
    padding: 2%;
    margin: 2%;  
    border-radius: 2px;
  }
  #modal-container{
    position:absolute;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    z-index: 10;
    display: flex;
    justify-content:center;
    align-items:center;
    animation: appearing 0.3s;
  }
  #modal{
    background:white;
    width: 500px;
    margin: 0 auto;
    padding: 2%;
    box-shadow: 0px 2px 2px 2px rgba(0,0,0,0.2);
    border-radius: 3px;
    animation: scaling 0.5s;
  }

  ::slotted(.my-header){
    color:red;
  }

  @keyframes scaling {
    from{
      transform: scale(0);
    }
    to{
      transform:scale(1);
    }
  }

  @keyframes appearing {
    from{
      opacity: 0;
    }
    to{
      opacity: 1
    }
  }
</style>


<div id="modal-container">
  <div id="modal">
  <header>
    <slot name="header"><h1>Default heading</h1></slot>
  </header>
  <section>
    <slot name="body">Default Body</slot>
  </section>
  <input type="text" slot="body" placeholder="Type your name" />
  <input type="checkbox" id="reconsent-checkbox"/>
  <label htmlFor="reconsent-checkbox">I consent to all the policies</label>
  <section>
    <button id="cancel-btn">Cancel</button>
    <button id="okay-btn">Okay</button>
  </section>
  <slot></slot>
  </div>
</div>
`;

customElements.define("nk-modal", Modal);
