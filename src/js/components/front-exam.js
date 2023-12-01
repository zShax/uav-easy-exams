import { baseURL } from '../index';

// Exam answers array

let formExamAnswers = [];

document.addEventListener('DOMContentLoaded', () => {
  fetch(baseURL + '/exam/1', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(body => populateExam(body));
});

function populateExam(exam) {
  // Create document fragment for the questions and the answers to be imported efficiently (all at once for each question)
  const fieldsetFrag = document.createDocumentFragment();
  const formExam = document.getElementById('formExam');
  const formSubmitExam = document.createElement('input');

  formSubmitExam.setAttribute('type', 'submit');

  for (let i = 0; i < exam.exercises.length; i++) {
    // Get the arrays of Qs and As
    const examQuestions = exam.exercises[i].question;
    const examAnswers = exam.exercises[i].answers;

    // Add exercise base
    const fieldset = document.createElement('fieldset');

    // Add the Q
    let legend = document.createElement('legend');
    legend.innerText = examQuestions;
    fieldsetFrag.appendChild(legend);

    // Number the question
    fieldset.setAttribute('id', `question${i + 1}`);

    let currentAnswers = [];

    // Add the As to the Qs
    for (let j = 0; j < exam.exercises[i].answers.length; j++) {
      let input = document.createElement('input');
      input.setAttribute('id', `q${i + 1}a${j + 1}`);
      input.setAttribute('type', 'radio');
      input.setAttribute('name', `q${i}`);

      let label = document.createElement('label');
      label.setAttribute('for', `q${i + 1}a${j + 1}`);

      label.innerText = examAnswers[j].answer;
      answerId = examAnswers[j].id;

      fieldsetFrag.appendChild(input);
      fieldsetFrag.appendChild(label);

      currentAnswers.push({
        input: input,
        label: label,
        answerId: answerId,
      });
    }

    formExamAnswers.push(currentAnswers);

    // Put the fragment together at once
    formExam.appendChild(fieldset).appendChild(fieldsetFrag);
  }

  formExam.appendChild(formSubmitExam);
}

document.getElementById('formExam').addEventListener('submit', event => {
  event.preventDefault();

  const examOutputAnswers = [];
  const examOutputQuestions = [];

  for (let i = 0; i < exam.exercises.length; i++) {
    examOutputQuestions.push(exam.exercises[i].id);

    const findCorrectAnswer = formExamAnswers[i].find(
      element => element.input.checked === true
    );

    if (!findCorrectAnswer) {
      // Auto-choose the first answer if none is selected
      examOutputAnswers.push(exam.exercises[i].answers[0].id);
    } else {
      examOutputAnswers.push(findCorrectAnswer.answerId);
    }
  }

  const examOutput = {
    questions: [],
    answers: [],
  };

  for (let i = 0; i < examOutputQuestions.length; i++) {
    examOutput.questions.push(examOutputQuestions[i]);
    examOutput.answers.push(examOutputAnswers[i]);
  }

  console.dir(examOutput);
});

// Timer Function

// Function to calculate remaining time and update HTML element
function updateRemainingTime() {
  const currentDate = new Date(); // Current date and time
  const endDate = new Date(examData.endTime); // End date and time

  // Check if the current date is before the end date
  if (currentDate < endDate) {
    const timeDiff = endDate - currentDate; // Difference in milliseconds
    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / 1000 / 3600) % 24);
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));

    // Get the HTML element by its ID
    const timerElement = document.getElementById('remainingTime');

    // Update the inner text of the HTML element
    timerElement.innerText = `Remaining Time: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  } else {
    // Get the HTML element by its ID
    const timerElement = document.getElementById('remainingTime');

    // Update the inner text of the HTML element for the case where the end date has passed
    timerElement.innerText = 'The end date has already passed.';
  }
}

// Call the function initially
updateRemainingTime();

// Update the remaining time every second (adjust the interval as needed)
setInterval(updateRemainingTime, 1000);
