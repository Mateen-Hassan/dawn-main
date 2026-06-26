class variantPicker extends HTMLElement {
    constructor() {
        super();
        this.isLoading = false;
    }

    get sectionId() {
        return this.dataset.sectionId;
    }

    connectedCallback() {
        this.variantPicker = this.querySelector('select[name="id"]');
        
        if (!this.variantPicker) {
            console.warn('No select element with name="id" found');
            return;
        }

        this.variantPicker.addEventListener('change', this.handleChange.bind(this));
    }

    handleChange(event) {
        const select = event.currentTarget;
        
        // Prevent duplicate requests
        if (this.isLoading) return;
        this.isLoading = true;
        select.disabled = true;

        const url = `${window.location.pathname}?variant=${select.value}&section_id=${this.sectionId}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                const newContainer = tempDiv.querySelector('.container');
                const currentContainer = document.querySelector('.container');
                
                if (newContainer && currentContainer) {
                    // More efficient: replace children only
                    currentContainer.innerHTML = newContainer.innerHTML;
                } else {
                    console.warn('Container not found in response');
                }
                const newUrl= new URL(url,window.location.origin)
                newUrl.searchParams.delete('section_id')
                window.history.pushState({},"",newUrl.toString())
            })
            .catch(error => {
                console.error('Error fetching variant:', error);
                // Optionally show user feedback
            })
            .finally(() => {
                this.isLoading = false;
                select.disabled = false;
            });
    }
}

customElements.define('variant-picker', variantPicker);