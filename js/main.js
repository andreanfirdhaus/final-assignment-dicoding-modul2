// handle bottom menu. use inline css
const buttons = document.querySelectorAll('footer nav li button');

// initial filter value for the icon
const initialFilterValue = 'invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(115%) contrast(100%)';

// Set default styles for the first button
const firstButton = buttons[0];
firstButton.classList.add('bottomMenuActive');
firstButton.querySelector('i').style.filter = 'none';
firstButton.style.backgroundColor = 'white';

for (const button of buttons) {
    button.addEventListener('click', function () {
        const clickedButton = this;

        // remove "bottomMenuActive" class from all buttons first
        buttons.forEach((btn) => {
            btn.classList.remove('bottomMenuActive');
            btn.style.backgroundColor = ''; // Reset background color
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
const submitBtn = document.getElementById('formSubmitBtn')

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

submitBtn.addEventListener('click', function () {
    console.log('event setelah melakukan submit form')
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

// form 1
function addBook() {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const imageUrlInput = document.getElementById('inputBookUrl').value;

    // Check if imageUrlInput is a valid URL using regex
    const isUrl = isValidUrl(imageUrlInput);

    // Set imageUrl based on validation result
    const imageUrl = isUrl ? imageUrlInput : './assets/img/img404.jpg';

    const generatedID = generateId();
    const bookObject = generateObjectBook(generatedID, title, author, year, imageUrl, false)
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function isValidUrl(url) {
    // simple regex pattern to check if the input is a valid URL
    const urlRegex = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,.\/?%&=]*)?\.(png|jpg|jpeg)$/i;
    return urlRegex.test(url);
}

function generateId() {
    return +new Date();
}

function generateObjectBook(id, title, author, year, imageUrl, isCompleted) {
    return {
        id, title, author, year, imageUrl, isCompleted
    }
}

// form 2 make books
function makeBook(bookObject) {
    const imageUrl = document.createElement('img');
    imageUrl.setAttribute('src', bookObject.imageUrl);
    imageUrl.setAttribute('alt', bookObject.title);

    const title = document.createElement('h3');
    title.classList.add('text-paragraph', 'font-bold', 'text-primary', "capitalize");
    title.innerText = bookObject.title;

    const author = document.createElement('p');
    author.classList.add("text-paragraph-sm", "text-secondary", "capitalize")
    author.innerText = bookObject.author + " • ";

    const year = document.createElement('p');
    year.classList.add("text-paragraph-sm", "text-secondary")
    year.innerText = bookObject.year;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="trash-icon"></i>';

    const readButton = document.createElement('button');
    readButton.classList.add('btn', 'btn-sm', 'text-white');
    readButton.textContent = 'Read';

    const markAsReadButton = document.createElement('button');
    markAsReadButton.classList.add('btn', 'btn-sm', 'text-white');
    markAsReadButton.textContent = 'Mark as read';

    const markAsUnreadButton = document.createElement('button');
    markAsUnreadButton.classList.add('btn', 'btn-sm', 'text-white');
    markAsUnreadButton.textContent = 'Mark as Unread';

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex', 'flex-col-100');

    const authorYearContainer = document.createElement('div');
    authorYearContainer.classList.add("flex", "gap-2");
    authorYearContainer.append(author, year);
    console.log("container paragraph", authorYearContainer);

    const cardLink = document.createElement('div');
    cardLink.classList.add('card-link');
    cardLink.append(deleteButton, buttonContainer);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.append(title, authorYearContainer);
    console.log('element dari card-body', cardBody);

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.append(imageUrl, cardLink);
    console.log('element dari card-header', cardHeader);

    const cardContainer = document.createElement('article');
    cardContainer.classList.add('card');
    cardContainer.append(cardHeader, cardBody);
    cardContainer.setAttribute('id', `book-${bookObject.id}`);
    console.log('element dari article', cardContainer)

    // isCompleted is true
    if (bookObject.isCompleted) {
        console.log('ini adlaah buku ketika SUDAH selesai dibaca');
        buttonContainer.append(readButton, markAsUnreadButton);

        markAsUnreadButton.addEventListener('click', function () {
            markAsUnread(bookObject.id);
        })

        deleteButton.addEventListener('click', function () {
            removeBookFromBookmark(bookObject.id);
        })
    } else {
        console.log('ini adlaah buku ketika BELUM selesai dibaca');
        buttonContainer.append(readButton, markAsReadButton);

        markAsReadButton.addEventListener('click', function () {
            markAsRead(bookObject.id);
            console.log('buku telah ditandai sebagai markAsRead()');
        })

        deleteButton.addEventListener('click', function () {
            removeBookFromBookmark(bookObject.id);
        })
    }

    return cardContainer;
}

function markAsRead(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    console.log("nilai dari isCOmpleted setelah markAsReadButton diklik", bookTarget.isCompleted)
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }

    return -1;
}

function removeBookFromBookmark(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    console.log("buku telah dihapus")
}

function markAsUnread(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    console.log("ini adalah event dari markAsUnreadButton")
}

const books = [];
const RENDER_EVENT = "render-book";

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('formInputBook');
    submitForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addBook();
    })
})

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);

    const addBooksInLibrary = document.getElementById('books-library');
    addBooksInLibrary.innerHTML = '';

    const addBookmarkAsRead = document.getElementById('mark-asRead');
    addBookmarkAsRead.innerHTML = '';

    for (const bookItem of books) {
        const booksLibrary = makeBook(bookItem);

        if (!bookItem.isCompleted) {
            addBooksInLibrary.append(booksLibrary);
        } else {
            addBookmarkAsRead.append(booksLibrary);
        }
    }
});