const UserModel = require("./userModel");
const userModel = new UserModel();

async function createUser(userData) {
  return userModel.create(userData);
}

async function getAllUsers() {
  return userModel.getAll();
}

async function getUserById(userId) {
  return userModel.getById(userId);
}

async function updateUserById(userId, updatedUserData) {
  return userModel.updateById(userId, updatedUserData);
}

async function deleteUserById(userId) {
  return userModel.deleteById(userId);
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
