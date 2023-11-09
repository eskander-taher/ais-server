const userService = require("./userService");

// Create a new user
async function createUser(req, res) {
  const userData = req.body;

  try {
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get user by ID
async function getUserById(req, res) {
  const userId = req.params.id;

  try {
    const user = await userService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update user by ID
async function updateUserById(req, res) {
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const updatedUser = await userService.updateUserById(
      userId,
      updatedUserData
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete user by ID
async function deleteUserById(req, res) {
  const userId = req.params.id;

  try {
    const deletedUser = await userService.deleteUserById(userId);

    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
