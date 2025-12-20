// AmazonAPI https://webservices.amazon.com/paapi5/documentation/
// GoogleAPI 
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // to prevent the browser to navigate away
   openFile();
});

async function openFile() {

    const response = await fetch('GoogleAPI.json', {cache: 'no-store'});

    if(!response.ok) throw new Error('Could not open the file.', response.status);
    const API_KEY = await response.json();
    console.log(API_KEY.API_KEY);
}