// details.js

const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get('id');

// Check if cardId is null or undefined
if (!cardId) {
    console.error('Card ID is null or undefined');
    // Puoi gestire questa situazione in modo appropriato, ad esempio, reindirizzando l'utente o mostrando un messaggio di errore
} else {
    // Se cardId è definito, esegui la richiesta al server
    fetch(`https://striveschool-api.herokuapp.com/api/product/${cardId}`, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2OTBiNmY2MTAwMzAwMTljYjlhMzkiLCJpYXQiOjE3MDY0NjM0MTUsImV4cCI6MTcwNzY3MzAxNX0.or8cDUw09bxmDoFe472TzLo0QwflgM_vsazxF9VdVO4'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Text: ${response.statusText}`);
        }
        return response.json();
    })
    .then(card => displayCardDetails(card))
    .catch(error => console.error('Error fetching card details:', error));
}

function displayCardDetails(card) {
    const detailsContainer = document.getElementById('detailsContainer');
    detailsContainer.innerHTML = '';

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = card.title + ': ' + card.content;
    detailsContainer.appendChild(cardElement);

    // Aggiungi eventuali dettagli o funzionalità aggiuntive qui
}

function editCard() {
    // Implementa la funzionalità di modifica qui
    console.log('Edit card clicked');
}

function deleteCard() {
    // Implementa la funzionalità di eliminazione qui
    console.log('Delete card clicked');
}

