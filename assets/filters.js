class CollectionFilters extends HTMLElement{
    constructor(){
        super();
    }

    get sectionId() {
        return this.dataset.section_id;
        
     }
    connectedCallback(){
        this.filterInput= this.querySelectorAll("input");
        this.handleClick=this.handleClick.bind(this);

        this.minRange= this.querySelector('input[type="range"][data-min-value]')
        this.maxRange= this.querySelector('input[type="range"][data-max-value]')
        this.filterInput.forEach((input) =>{
            input.addEventListener('change', this.handleClick)
        })
    }
   
    handleClick(event){
        const input= event.currentTarget;
        let url;
        if (input.dataset.addUrl || input.dataset.removeUrl) {
             url = new URL(input.checked ? input.dataset.addUrl : input.dataset.removeUrl, window.location.origin);
        }else{
url=new URL(location.href)
url.searchParams.delete(this.minRange.dataset.param);
url.searchParams.delete(this.maxRange.dataset.param);
url.searchParams.set(this.minRange.dataset.param, this.minRange.value);
url.searchParams.set(this.maxRange.dataset.param, this.maxRange.value);
}
        
        
        url.searchParams.set("section_id", this.sectionId);
        fetch(url.toString())
        .then((response)=>{
            return response.text();
        })
        .then((html)=>{
            const tempdiv=document.createElement('div');
            tempdiv.innerHTML= html;

            document.querySelector(".collection-inner").innerHTML=tempdiv.querySelector(".collection-inner").innerHTML;

            url.searchParams.delete("section_id");
           window.history.pushState({},"",url.toString());
        })
        .catch((error) => {
            console.error('Error updating collection filters:', error);
           
        });
    }

}
customElements.define("collection-filters", CollectionFilters)