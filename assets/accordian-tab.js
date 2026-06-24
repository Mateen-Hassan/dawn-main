class AccordionTab extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback(){
//this runs when the element is added to the DOM
    console.log('AccordianTab added to the DOM');
    //this is to get the header and content elements
    this.tabHeader = this.querySelector('[data-header]');
    this.tabContent = this.querySelector('[data-content]');
    this.tabHeader.addEventListener('click', this.handleToggle.bind(this));
}
    disconnectedCallback(){
        //this runs when the element is removed from the DOM
        console.log('AccordianTab removed from the DOM');
    }
    handleToggle(){
        this.toggleAttribute('open');
    }
}
customElements.define("mateen-tab", AccordionTab);
