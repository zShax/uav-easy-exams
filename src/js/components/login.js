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
    .then(response => {
      // verify if access is granted
      if (response.status === 200) {
        return response.json(); // return the parsed JSON
      } else {
        throw new Error('Access denied');
      }
    })
    .then(body => {
      // now you can use the parsed body
      localStorage.setItem('Id', body.id);
      location.href = 'profile.html';
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
