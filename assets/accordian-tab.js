class AccordianTab extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback(){
//this runs when the element is added to the DOM
    console.log('AccordianTab added to the DOM');
}
    disconnectedCallback(){
        //this runs when the element is removed from the DOM
        console.log('AccordianTab removed from the DOM');
    }
}

