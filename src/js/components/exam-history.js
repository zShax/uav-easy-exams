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
    // Number the row as a table head
    const tableHead = document.createElement('th');
    tableHead.innerText = `#${i + 1}`;

    // Create new row
    const tableRow = document.createElement('tr');

    // Get the relevant information for the history table
    // const examId = data.exams[i].id; TODO

    // Create element for table data
    const tableData = document.createElement('td');
    const examName = data.exams[i].name;
    tableData.innerText = examName;
    tableBodyFrag.appendChild(tableHead);

    const examStartTime = data.exams[i].start_time;
    tableData.innerText = examStartTime;
    tableBodyFrag.appendChild(examStartTime);

    const examEndTime = data.exams[i].end_time;
    tableData.innerText = examEndTime;
    tableBodyFrag.appendChild(examEndTime);

    const examsStartingGrade = data.exams[i].starting_grade;
    tableData.innerText = examsStartingGrade;
    tableBodyFrag.appendChild(examsStartingGrade);

    const examsMaximumGrade = data.exams[i].maximum_grade;
    tableData.innerText = examsMaximumGrade;
    tableBodyFrag.appendChild(examsMaximumGrade);

    // Add new row and the relevant information inside of it
    historyTableBody.appendChild(tableRow).appendChild(tableBodyFrag);
  }
}
