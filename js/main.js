// handle bottom menu. use inline css
const buttons = document.querySelectorAll('footer nav li button');

// initial filter value for the icon
const initialFilterValue = 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(115%) contrast(100%)';

for (const button of buttons) {
    button.addEventListener('click', function () {
        const clickedButton = this;

        // remove "bottomMenuActive" class from all buttons first
        buttons.forEach((btn) => btn.classList.remove('bottomMenuActive'));

        // apply "bottomMenuActive" class only to the clicked button
        clickedButton.classList.add('bottomMenuActive');

        // reset filter on all buttons
        buttons.forEach((btn) => {
            btn.querySelector('i').style.filter = initialFilterValue;
        });

        // add icon filter on click (the filter set to be 'none')
        clickedButton.querySelector('i').style.filter = 'none';
    });

    // add hover event listener. (when bottom menu is hovered over then the filter icon will be set to 'none')
    button.addEventListener('mouseenter', function () {
        this.querySelector('i').style.filter = 'none'; // Apply filter on hover
    });

    // Add mouseleave event listener
    button.addEventListener('mouseleave', function () {
        if (!this.classList.contains('bottomMenuActive')) {
            // Reset filter only if not active
            this.querySelector('i').style.filter = initialFilterValue;
        }
    });
}

// displays added modal
const addModal = document.getElementById('modal-added')
const addBtn = document.getElementById('add')
const closeBtn = document.getElementById('close-btn')
const bottomMenuActive = document.getElementById('add')

addBtn.addEventListener('click', function () {
    console.log("event dari add button")
    addModal.classList.add('overlay-active');
})

closeBtn.addEventListener('click', function () {
    console.log("event dari close button")
    addModal.classList.remove('overlay-active');

    // reset bottomMenuActive and filter on all buttons
    buttons.forEach((btn) => {
        btn.classList.remove('bottomMenuActive');
        btn.querySelector('i').style.filter = initialFilterValue;
    });
})

window.onclick = function (e) {
    if (e.target == addModal) {
        addModal.classList.remove('overlay-active');
        // Reset bottomMenuActive and filter on all buttons
        buttons.forEach((btn) => {
            btn.classList.remove('bottomMenuActive');
            btn.querySelector('i').style.filter = initialFilterValue;
        });
    }
}