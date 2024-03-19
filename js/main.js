const books = [];
const RENDER_EVENT = "render-book";

console.log("default data array", books)

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('formInputBook');
    submitForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addBook();
    })

    document
        .getElementById("searchBookInput")
        .addEventListener("keydown", (e) => {
            const searchString = e.target.value.toUpperCase();
            searchBook(searchString);

            if (e.key === 'Enter') {
                e.preventDefault();
                searchModal.classList.remove('overlay-active');
            }
        });

    // const searchInput = document.getElementById("searchBookInput");
    // const searchButton = document.getElementById("searchButton");

    // searchInput.addEventListener("keyup", (event) => {
    //     const searchString = event.target.value.toUpperCase();
    //     searchBook(searchString);

    //     // Prevent default form submission behavior (if applicable)
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //     }
    // });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
})

document.addEventListener(RENDER_EVENT, function () {
    onLoadDefaultBook();  // uncomment to hide default data

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