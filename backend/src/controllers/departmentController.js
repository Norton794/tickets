const departmentService = require('../services/departmentService');

async function getDepartments(req, res) {
  try {
    const departments = await departmentService.getAllDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching departments' });
  }
}

async function getDepartment(req, res) {
  const { id } = req.params;
  try {
    const department = await departmentService.getDepartmentById(parseInt(id));
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the department' });
  }
}

async function createDepartment(req, res) {
  const { name } = req.body;
  try {
    const newDepartment = await departmentService.createDepartment(name);
    res.json(newDepartment);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating a department' });
  }
}

async function updateDepartment(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedDepartment = await departmentService.updateDepartment(parseInt(id), name);
    if (updatedDepartment) {
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the department' });
  }
}

async function deleteDepartment(req, res) {
  const { id } = req.params;
  try {
    const isDeleted = await departmentService.deleteDepartment(parseInt(id));
    if (isDeleted) {
      res.json({ message: 'Department deleted successfully' });
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the department' });
  }
}

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
