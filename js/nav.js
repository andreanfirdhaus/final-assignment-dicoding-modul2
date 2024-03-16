const initialFilterValue = 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(115%) contrast(100%)';

const buttons = document.querySelectorAll('footer nav li button');
const firstButton = buttons[0];
firstButton.classList.add('bottomMenuActive');
firstButton.querySelector('i').style.filter = 'none';
firstButton.style.backgroundColor = 'white';

// dynamic hover & active navigation
for (const button of buttons) {
    button.addEventListener('click', function () {
        const clickedButton = this;

        buttons.forEach((btn) => {
            btn.classList.remove('bottomMenuActive');
            btn.style.backgroundColor = '';
            btn.querySelector('i').style.filter = initialFilterValue;
        });

        // apply "bottomMenuActive" class only to the clicked button
        clickedButton.classList.add('bottomMenuActive');

        // reset filter on all buttons
        buttons.forEach((btn) => {
            btn.querySelector('i').style.filter = initialFilterValue;
        });

        // add icon filter on click (the filter set to be 'none')
        clickedButton.querySelector('i').style.filter = 'none';
    });

    // hover effect event. (when bottom menu is hovered over then the filter icon will be set to 'none')
    button.addEventListener('mouseenter', function () {
        this.querySelector('i').style.filter = 'none';
    });

    // (when the mouse leaves from the icon)
    button.addEventListener('mouseleave', function () {
        if (!this.classList.contains('bottomMenuActive')) {
            this.querySelector('i').style.filter = initialFilterValue;
        }
    });
}

const addModal = document.getElementById('modal-added')
const addBtn = document.getElementById('add')
const myLibrary = document.getElementById('myLibrary');
const myArchive = document.getElementById('myArchive');
const libraryBtn = document.getElementById('library')
const markAsReadBtn = document.getElementById('markAsRead')
const closeBtn = document.getElementById('close-btn')
const submitBtn = document.getElementById('formSubmitBtn')
const bottomMenuActive = document.getElementById('add')

addBtn.addEventListener('click', function () {
    addModal.classList.add('overlay-active');
})

closeBtn.addEventListener('click', function () {
    addModal.classList.remove('overlay-active');

    // buttons.forEach((btn) => {
    //     btn.classList.remove('bottomMenuActive');
    //     btn.querySelector('i').style.filter = initialFilterValue;
    // });
})

submitBtn.addEventListener('click', function () {
    addModal.classList.remove('overlay-active');

    // reset bottomMenuActive and filter on all buttons
    // buttons.forEach((btn) => {
    //     btn.classList.remove('bottomMenuActive');
    //     btn.querySelector('i').style.filter = initialFilterValue;
    // });
})

window.onclick = function (e) {
    if (e.target == addModal) {
        addModal.classList.remove('overlay-active');
        // reset bottomMenuActive and filter on all buttons
        // buttons.forEach((btn) => {
        //     btn.classList.remove('bottomMenuActive');
        //     btn.querySelector('i').style.filter = initialFilterValue;
        // });
    }
}


function toggleDisplay(idToShow, idToHide) {
    const elementToShow = document.getElementById(idToShow);
    const elementToHide = document.getElementById(idToHide);

    elementToShow.style.display = 'block';
    elementToHide.style.display = 'none';
}

toggleDisplay('myLibrary', 'myArchive');

libraryBtn.addEventListener('click', function () {
    toggleDisplay('myLibrary', 'myArchive');
});

markAsReadBtn.addEventListener('click', function () {
    toggleDisplay('myArchive', 'myLibrary');
});