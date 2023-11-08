const UserModel = require("./userModel"); // Import the User model class
const userModel = new UserModel();

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  const userId = req.params.userId;

  try {
    const user = await userModel.getById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new user
async function createUser(req, res) {
  const userData = req.body;

  try {
    const newUser = await userModel.create(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  const userId = req.params.userId;
  const updatedData = req.body;

  try {
    const updatedUser = await userModel.update(userId, updatedData);

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const userId = req.params.userId;

  try {
    const deletedUser = await userModel.delete(userId);
    if (deletedUser) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
