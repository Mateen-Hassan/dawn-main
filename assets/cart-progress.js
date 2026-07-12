(function(){
    document.addEventListener("DOMContentLoaded", () => {
        const threshHold = document.querySelector('.main-container');
        
        // Safety check to prevent errors if the element is missing
        if (threshHold) {
            let THRESHHOLD = threshHold.dataset.set;
            console.log(THRESHHOLD);
        } else {
            console.warn("Element .main-container not found on the page.");
        }
        
    });
})();
