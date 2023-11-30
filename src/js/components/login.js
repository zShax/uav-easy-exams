import { baseURL } from '../index';

document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();

  fetch(baseURL + '/login', {
    method: 'POST',
    body: JSON.stringify({
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(body => {
      alert(body);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
