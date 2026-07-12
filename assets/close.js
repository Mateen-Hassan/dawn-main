class Accordion extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      console.log("Custom element is online");
      this.tabHeader=this.querySelector('[data-header]')
      this.tabContent=this.querySelector('[data-content]')

      this.addEventListener('click', this.handleToggle.bind(this))
    }
  
    disconnectedCallback() {
      console.log("Custom element removed");
    }

    handleToggle(){
        this.toggleAttribute('open')
    }
  }
  
  customElements.define("accordion-tab", Accordion);