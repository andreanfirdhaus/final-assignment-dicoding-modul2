function isValidUrl(url) {
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

function addBook() {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const imageUrlInput = document.getElementById('inputBookUrl').value;
    const isCompleted = document.getElementById('inputBookIsCompleteToRead').checked;

    // check if imageUrlInput is a valid URL
    const isUrl = isValidUrl(imageUrlInput);
    const imageUrl = isUrl ? imageUrlInput : './assets/img/img404.jpg';

    const generatedID = generateId();
    const bookObject = generateObjectBook(generatedID, title, author, year, imageUrl, isCompleted);
    books.push(bookObject);
    saveData();

    document.dispatchEvent(new Event(RENDER_EVENT));
}

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

    const cardLink = document.createElement('div');
    cardLink.classList.add('card-link');
    cardLink.append(deleteButton, buttonContainer);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.append(title, authorYearContainer);

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.append(imageUrl, cardLink);

    const cardContainer = document.createElement('article');
    cardContainer.classList.add('card');
    cardContainer.append(cardHeader, cardBody);
    cardContainer.setAttribute('id', `book-${bookObject.id}`);

    // isCompleted is true
    if (bookObject.isCompleted) {
        buttonContainer.append(readButton, markAsUnreadButton);
        markAsUnreadButton.addEventListener('click', function () {
            markAsUnread(bookObject.id);
        })

        deleteButton.addEventListener('click', function () {
            removeBookFromBookmark(bookObject.id);
        })

    } else {
        buttonContainer.append(readButton, markAsReadButton);
        markAsReadButton.addEventListener('click', function () {
            markAsRead(bookObject.id);
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
    saveData();
}

function markAsUnread(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeBookFromBookmark(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
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

function defaultBookData() {
    let bookIdCounter = 0;
    const generateUniqueId = () => generateId() + bookIdCounter++;

    return [
        {
            id: generateUniqueId(),
            title: 'One Piece 1061',
            author: 'Eiichiro Oda',
            year: 2022,
            imageUrl: 'https://comicvine.gamespot.com/a/uploads/scale_large/11161/111610434/9002817-6125859241-97840.jpg',
            isCompleted: false
        },
        {
            id: generateUniqueId(),
            title: 'My Neighbor Totoro',
            author: 'Hayao Miyazaki',
            year: 1988,
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1539433028i/17571527.jpg',
            isCompleted: false
        },
        {
            id: generateUniqueId(),
            title: 'Gadis Kretek',
            author: 'Ratih Kumala',
            year: 2023,
            imageUrl: 'https://cdn.gramedia.com/uploads/picture_meta/2023/10/24/qsey9q69mtex5nshhdhjn6.jpg',
            isCompleted: false
        },
        {
            id: generateUniqueId(),
            title: 'Hujan',
            author: 'Tere Liye',
            year: 2022,
            imageUrl: 'https://cdn.gramedia.com/uploads/items/img20220905_11493451.jpg',
            isCompleted: false
        },
        {
            id: generateUniqueId(),
            title: 'Filosofi Teras',
            author: 'Henry Manampiring',
            year: 2022,
            imageUrl: 'https://cdn.gramedia.com/uploads/items/img20220101_11444970.jpg',
            isCompleted: false
        },
        {
            id: generateUniqueId(),
            title: 'Sejarah Dunia yang Disembunyikan',
            author: 'Jonathan Black',
            year: 2015,
            imageUrl: '.././assets/img/img404.jpg',
            isCompleted: false
        },
        {
            id: generateUniqueId(),
            title: '70 Resep Easy Cook',
            author: 'Yunita Anwar',
            year: 2021,
            imageUrl: 'https://cdn.gramedia.com/uploads/items/COVER_YUNITA_ANWAR_C_1_4_R4-1.jpg',
            isCompleted: false
        },

    ];
}


function onLoadDefaultBook() {
    // Check if books have already been loaded
    if (books.length > 0) {
        return; // Prevent duplicate loading
    }

    const defaultBooks = defaultBookData();
    books.push(...defaultBooks);

    document.dispatchEvent(new Event(RENDER_EVENT));
}