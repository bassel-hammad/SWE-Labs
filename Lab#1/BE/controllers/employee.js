//This file is used to store the employee data and to handle the requests related to the employee data.
const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params; // get id from request
  const index = employee.findIndex(emp => emp.id === id); // find index of employee with id in the array
  if (index !== -1) { // if employee exists
    employee.splice(index, 1);
    res.status(200).json({ message: 'Employee deleted' });
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body; // extract id and name from request body
  if (!id || !name) {
    return res.status(400).json({ message: 'ID and name are required' });
  }
  // Check if employee with the same id exists
  const existingEmployee = employee.find(emp => emp.id === id);
  if (existingEmployee) {
    return res.status(400).json({ message: 'Employee with the same ID already exists' });
  }

  const newEmployee = { id, name };
  employee.push(newEmployee); 
  res.status(201).json({ message: 'Employee created', data: newEmployee });
};
