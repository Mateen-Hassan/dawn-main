class variantPicker extends HTMLElement{
    constructor(){
       super();
    }   
   
    get sectionId(){
       return this.dataset.sectionId;
    }
   
    connectedCallback(){
       this.variantPicker=this.querySelectorAll('input[type="radio"]')
   
       this.handleChange=this.handleChange.bind(this);
       this.variantPicker.forEach((picker)=>{
        picker.addEventListener('change', this.handleChange);
       })
   }
   disconnectedCallback(){
    this.variantPicker.forEach((picker)=>{
        picker.removeEventListener('change', this.handleChange);
       })
   }
   handleChange(){
       const optionValueIds = Array.from(
         this.querySelectorAll('fieldset input[type="radio"]:checked')
       )
         .map((input) => input.dataset.optionValueId)
         .filter(Boolean);

       const params = new URLSearchParams();
       if (optionValueIds.length) {
         params.set('option_values', optionValueIds.join(','));
       }
       params.set('section_id', this.sectionId);

       const url = `${window.location.pathname}?${params.toString()}`;

       fetch(url)
       .then((response) => response.text())
       .then((html) => {
           const tempDiv = document.createElement('div');
           tempDiv.innerHTML = html;

           document.querySelector('.container').innerHTML =
             tempDiv.querySelector('.container').innerHTML;

           const variantId = tempDiv.querySelector('input[name="id"]')?.value;
           const newUrl = new URL(window.location.pathname, window.location.origin);
           if (variantId) {
             newUrl.searchParams.set('variant', variantId);
           }
           window.history.pushState({}, '', newUrl.toString());
       });
   }
   }
   
   customElements.define("variant-picker", variantPicker)

  