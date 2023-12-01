import { baseURL } from '../index';

//   Create html elements after the DOM content has loaded
document.addEventListener('DOMContentLoaded', () => {
  fetch(baseURL + `/teacher/${localStorage.getItem('Id')}/exams`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(body => populateHistory(body));
});

function populateHistory(data) {
  // Find the table where to put the information in
  const historyTableBody = document.getElementById('historyTableBody');
  const tableBodyFrag = document.createDocumentFragment();

  for (let i = 0; i < data.exams.length; i++) {
    // Create new row
    const tableRow = document.createElement('tr');

    // Get the relevant information for the history table
    const examId = exams[i].id;
    const examName = exams[i].name;
    const examStartTime = exams[i].start_time;
    const examEndTime = exams[i].end_time;
    const examsStartingGrade = exams[i].starting_grade;
    const examsMaximumGrade = exams[i].maximum_grade;

    // Number the row as a table head
    const tableHead = document.createElement('th').innerText(`#${i + 1}`);

    // Create element for table data
    const tableData = document.createElement('td');

    // Populate the td elements with actual data
    tableBodyFrag.appendChild(tableHead.innerText(examId));
    tableBodyFrag.appendChild(tableData.innerText(examName));
    tableBodyFrag.appendChild(tableData.innerText(examStartTime));
    tableBodyFrag.appendChild(tableData.innerText(examEndTime));
    tableBodyFrag.appendChild(tableData.innerText(examsStartingGrade));
    tableBodyFrag.appendChild(tableData.innerText(examsMaximumGrade));

    // Add new row and the relevant information inside of it
    historyTableBody.appendChild(tableRow).appendChild(tableBodyFrag);
  }
}
