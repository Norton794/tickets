const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching users' });
  }
}

async function createUser(req, res) {
    const { username, password, accessLevel, departmentId} = req.body;
    await bcrypt.hash(password, saltRounds, function(err, hashPassword) {
      if (err) throw err;
    try {
      const newUser = userService.createUser(username, hashPassword, accessLevel, departmentId);
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating a user' });
    }
  });
  }


  async function getUserById(req, res) {
    const { id } = req.params;
    try {
      const users = await userService.getUserById(id);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching users' });
    }
  }

async function updateUser(req, res) { 
  const { id } = req.params;
  const { username, password, accessLevel, departmentId } = req.body;
  await bcrypt.hash(password, saltRounds, function(err, hashPassword) {
    if (err) throw err;
  try {
    const updatedUser = userService.updateUser(
      parseInt(id),
      username, 
      hashPassword, 
      accessLevel, 
      departmentId
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the user' });
  }
});

}

async function deleteUser(req, res) { 
  const { id } = req.params;
  try {
    const deleted = await userService.deleteUser(parseInt(id));
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the user' });
  }
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
