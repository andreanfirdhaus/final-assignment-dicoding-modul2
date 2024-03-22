const books = [];
const RENDER_EVENT = "render-book";

console.log("default data: ", books)

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('formInputBook');
    submitForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addBook();

        let isValid = true;

        if (inputBookTitle.value.trim() === "") {
            inputBookTitle.focus();
            isValid = false;
        }
        if (inputBookAuthor.value.trim() === "") {
            inputBookAuthor.focus();
            isValid = false;
        }
        if (inputBookYear.value.trim() === "") {
            inputBookYear.focus();
            isValid = false;
        }

        if (isValid) {
            addModal.classList.remove('overlay-active');
            formReset.forEach(input => input.value = '');
        }

        return isValid;
    })

    document
        .getElementById("searchBookInput")
        .addEventListener("keydown", (e) => {
            const searchString = e.target.value.toUpperCase().trim();
            searchBook(searchString);

            if (e.key === 'Enter') {
                e.preventDefault();
                searchModal.classList.remove('overlay-active');
            }
        });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
})

document.addEventListener(RENDER_EVENT, function () {
    onLoadDefaultBook();  // uncomment to hide default data

    const addBooksInLibrary = document.getElementById('incompleteBookList');
    addBooksInLibrary.innerHTML = '';

    const addBookmarkAsRead = document.getElementById('completeBookList');
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