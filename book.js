class Book {
    constructor(title, author, yearPublished){
        this.title = title;
        this.author = author;
        this.yearPublished = yearPublished;
    }
}

export class BookManager {

    bookContainer = document.querySelector('.books__container');

    listBooks(bookData){

        const book = document.createElement("li");
        book.classList.add("book__item");

        const bookImg = document.createElement("img");
        bookImg.src = "./assets/bookIcon.jpg";
        bookImg.width = 120;
        bookImg.height = 150;
        bookImg.alt = "A generic book icon";
        book.appendChild(bookImg);

        const bookTitle = document.createElement("h3");
        bookTitle.classList.add("book__title");
        bookTitle.innerText = bookData.title;
        book.appendChild(bookTitle);

        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = bookData.author_name;
        book.appendChild(bookAuthor);

        const bookYearPublished = document.createElement("p");
        bookYearPublished.innerText = bookData.first_publish_year;
        book.appendChild(bookYearPublished);

        this.bookContainer.appendChild(book);
    }

    resetBookContainer() {
        this.bookContainer.replaceChildren();
    }
}
