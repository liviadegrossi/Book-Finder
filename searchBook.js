import { BookManager } from "./book.js";

const controller = new AbortController();
const searchForm = document.getElementById('searchForm');
const HARDCOVER_ENDPOINT = 'https://api.hardcover.app/v1/graphql';
const OPENLIBRARY_ENDPOINT = 'https://openlibrary.org/search.json';

window.addEventListener('load', async () => {

    const year = new Date().getFullYear();
    const URL = OPENLIBRARY_ENDPOINT + '?q=first_publish_year:' + year; // 'https://openlibrary.org/search.json?q=first_publish_year:2025'
    const books = await searchBooks(URL);
    const manager = new BookManager();

    books.docs.forEach(book => {
        manager.listBooks(book);
    });

});

searchForm.addEventListener('submit', async (event) => {
    console.log('searchForm')
    event.preventDefault();
    const searchBook = document.getElementById('searchBook');
    const URL = OPENLIBRARY_ENDPOINT + '?q=title:"' + searchBook.value + '"'; // https://openlibrary.org/search.json?q=title:"Sunrise on the Reaping"
    console.log(URL)
    const books = await searchBooks(URL);
    const manager = new BookManager();
    console.log(books.docs);

    manager.resetBookContainer();

    books.docs.forEach(book => {
        manager.listBooks(book);
    }); 

});

async function searchBooks(URL) {

    try {
        const response = await fetch(URL, {
            headers: {
                "Content-Type": "application/json",
            },
            signal: controller.signal,
        });
        if(!response.ok) throw new Error(`Response status: ${response.status}`);
        const result = await response.json();
        return result;
    } catch(error) {
        console.error(error.message);
    }
}

// await fetch('http://your.server.com/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     query: `
//       query GetProductName($id: ID!) {
//         product(id: $id) {
//           name
//         }
//       }
//     `,
//     variables: { id: "123" },
//   }),
// });

// async function readAPIKey(){
//     console.log('Read API Key');
//     const url = "APIKeys.json";
//     try{
//         const response = await fetch(url);
//         if(!response.ok) throw new Error(`Error while retrieving APIs keys. Response status: ${response.status}`);
//         const keys = await response.json();
//         return keys;
//     } catch(error) {
//         console.error(error.message);
//     }
// }

// async function searchBook() {

//     const HARDCOVER_ENDPOINT = 'https://api.hardcover.app/v1/graphql';
//     const requestBody = `query Test { 
//         books(where: {title: {_eq: 'Brimstone'}}) {
//             title 
//             description 
//             rating
//         }
//     }`;
//     console.log(requestBody);
//     const authorizationKey = keys.HARDCOVER_API_KEY;
//     console.log(authorizationKey);

//     try {
//         const response = await fetch(HARDCOVER_ENDPOINT, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": authorizationKey
//             },
//             signal: controller.signal,
//             body: JSON.stringify(requestBody),
//         });
//         if(!response.ok) throw new Error(`Response status: ${response.status}`);
//         const result = await response.json();
//         console.log(result);
//     } catch(error){
//         console.error(error.message);
//     }

// }


