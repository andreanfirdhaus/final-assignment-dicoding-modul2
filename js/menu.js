const addModal = document.getElementById('modal-added');
const searchModal = document.getElementById('modal-search');
const addBtn = document.getElementById('add');
const searchBtn = document.getElementById('search');
const libraryBtn = document.getElementById('library');
const markAsReadBtn = document.getElementById('complete');
const closeBtn = document.querySelectorAll('.xmark-icon');
const isActive = document.getElementById('add');
const formReset = document.querySelectorAll('input');
const inputBookTitle = document.getElementById('inputBookTitle');
const inputBookAuthor = document.getElementById('inputBookAuthor');
const inputBookYear = document.getElementById('inputBookYear');
const initialFilterValue = 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(115%) contrast(100%)';
const buttons = document.querySelectorAll('footer nav li button');

function setActiveButton(button) {
    buttons.forEach(btn => {
        btn.classList.remove('isActive');
        btn.style.backgroundColor = '';
        btn.querySelector('i').style.filter = initialFilterValue;
    });

    button.classList.add('isActive');
    button.style.backgroundColor = 'white';
    button.querySelector('i').style.filter = 'none';
}

buttons.forEach(button => {
    button.addEventListener('click', function () {
        setActiveButton(this);
    });

    button.addEventListener('mouseenter', function () {
        this.querySelector('i').style.filter = 'none';
    });

    button.addEventListener('mouseleave', function () {
        if (!this.classList.contains('isActive')) {
            this.querySelector('i').style.filter = initialFilterValue;
        }
    });
});

setActiveButton(buttons[0]);

addBtn.addEventListener('click', function () {
    addModal.classList.add('overlay-active');
})
searchBtn.addEventListener('click', function () {
    searchModal.classList.add('overlay-active');
})

closeBtn.forEach(function (button) {
    button.addEventListener('click', () => {
        const check = button.closest('.layer-overlay');

        if (check === addModal) {
            addModal.classList.remove('overlay-active');
            formReset.forEach(input => input.value = '');
        }

        if (check === searchModal) {
            searchModal.classList.remove('overlay-active');
        }
    });
});

window.onclick = function (e) {
    if (e.target == addModal) {
        addModal.classList.remove('overlay-active');
    }

    if (e.target === searchModal) {
        searchModal.classList.remove('overlay-active');
    }
}

function toggleDisplay(idToShow, idToHide) {
    const elementToShow = document.getElementById(idToShow);
    const elementToHide = document.getElementById(idToHide);

    elementToShow.style.display = 'block';
    elementToHide.style.display = 'none';
}

toggleDisplay('incompleteBookshelf', 'completeBookshelf');

libraryBtn.addEventListener('click', function () {
    toggleDisplay('incompleteBookshelf', 'completeBookshelf');
});

markAsReadBtn.addEventListener('click', function () {
    toggleDisplay('completeBookshelf', 'incompleteBookshelf');
});