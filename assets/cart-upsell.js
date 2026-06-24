class CartUpsell extends HTMLElement{

    constructor(){
        super();
    }
    connectedCallback(){
        this.submitForm = this.querySelector('form[action="/cart/add"]');
        if (this.submitForm) {
            this.submitForm.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }
    disconnectedCallback(){

    }
    handleSubmit(event){
        event.preventDefault();
        
        const formData = new FormData(this.submitForm);

        fetch('/cart/add.js',{
            method:'POST',
            body: formData
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.rerenderCart();
        })
        .catch(error=>{
            console.error('error adding item in the cart', error)
        })
    }
    rerenderCart(){
        // Fixed: Use proper section_id parameter and parse as text, not JSON
        fetch('/?section_id=cart-drawer')
        .then(response=> response.text())  // Get HTML as text
        .then(html=>{
            const cartDrawer = document.querySelector('cart-drawer .drawer__inner');
            if (cartDrawer) {
                const fakeDiv = document.createElement('div');
                fakeDiv.innerHTML = html;
                // Find the drawer__inner in the new content
                const newDrawerInner = fakeDiv.querySelector('.drawer__inner');
                if (newDrawerInner) {
                    cartDrawer.innerHTML = newDrawerInner.innerHTML;
                }
            }
            console.log('Cart drawer updated');
        })
        .catch(error=>{
            console.log('Error rendering cart:', error);
        })
    }
}

customElements.define("cart-upsel", CartUpsell);