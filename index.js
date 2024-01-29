import { fetchCards, displayCards, showCardDetails } from './utils.js';

document.getElementById('cardForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const requestBody = {
        title: title,
        content: content
    };

    fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2OTBiNmY2MTAwMzAwMTljYjlhMzkiLCJpYXQiOjE3MDY0NjM0MTUsImV4cCI6MTcwNzY3MzAxNX0.or8cDUw09bxmDoFe472TzLo0QwflgM_vsazxF9VdVO4'
        },
        body: JSON.stringify(requestBody)
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
    .catch(error => console.error('Error posting card:', error));
});

// Fetch and display cards on page load
fetchCards();
