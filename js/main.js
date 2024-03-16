const books = [];
const RENDER_EVENT = "render-book";

console.log("default data array", books)

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('formInputBook');
    submitForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addBook();
    })

    if (isStorageExist()) {
        loadDataFromStorage();
    }
})

document.addEventListener(RENDER_EVENT, function () {
    onLoadDefaultBook();

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