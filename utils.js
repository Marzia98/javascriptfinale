// utils.js
export async function fetchCards() {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2OTBiNmY2MTAwMzAwMTljYjlhMzkiLCJpYXQiOjE3MDY0NjM0MTUsImV4cCI6MTcwNzY3MzAxNX0.or8cDUw09bxmDoFe472TzLo0QwflgM_vsazxF9VdVO4'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Text: ${response.statusText}`);
        }

        const cards = await response.json();
        displayCards(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

export function displayCards(cards) {
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.innerHTML = '';

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.title;
        cardElement.addEventListener('click', () => showCardDetails(card._id));
        cardsContainer.appendChild(cardElement);
    });
}

export function showCardDetails(cardId) {
    window.location.href = `details.html?id=${cardId}`;
}

// index.js
import { fetchCards, displayCards, showCardDetails } from './utils.js';

document.getElementById('cardForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2OTBiNmY2MTAwMzAwMTljYjlhMzkiLCJpYXQiOjE3MDY0NjM0MTUsImV4cCI6MTcwNzY3MzAxNX0.or8cDUw09bxmDoFe472TzLo0QwflgM_vsazxF9VdVO4'
        },
        body: JSON.stringify({
            title: title,
            content: content
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Text: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Card posted successfully:', data);
        fetchCards();
    })
    .catch(error => {
        console.error('Error posting card:', error);
        // Log additional details about the error
        console.log('Request Body:', JSON.stringify({ title, content }));
    });
});

// Fetch and display cards on page load
fetchCards();
