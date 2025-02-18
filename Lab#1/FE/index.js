function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener("click", () => deleteEmployee(item.id)); // Add event listener to delete button
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button
document.getElementById('submitButton').addEventListener('click', createEmployee);

// TODO
function createEmployee (){
  // get data from input field
  const id = document.getElementById('id').value;
  const name = document.getElementById('name').value;
  // send data to BE
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, name })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
    fetchEmployees(); // Refresh the employee list
  })
  .catch(error => console.error(error));
}

// TODO
function deleteEmployee (id){
  // Send DELETE request to the backend
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
    fetchEmployees(); // Refresh the employee list
  })
  .catch(error => console.error(error));
}

fetchEmployees() //call fetchEmployees to display the data when the page loads
