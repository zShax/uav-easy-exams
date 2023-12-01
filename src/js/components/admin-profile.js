import { baseURL } from '../index';

// Exam answers array

let teacherProfileData = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch(baseURL + `/teacher/${localStorage.getItem('Id')}/profile`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(body => {
      updateTeacherProfile(body);
    });
});

function updateTeacherProfile(data) {
  var profileId = document.getElementById('profileId');
  var profileFirstName = document.getElementById('profileFirstName');
  var profileLastName = document.getElementById('profileLastName');
  var profileEmail = document.getElementById('profileEmail');

  profileId.innerText = data.id;
  profileFirstName.innerText = data.first_name;
  profileLastName.innerText = data.last_name;
  profileEmail.innerText = data.email;
}
