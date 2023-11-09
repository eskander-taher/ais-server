const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class UserModel {
  async create(userData) {
    return prisma.user.create({
      data: userData,
    });
  }

  async getAll() {
    return prisma.user.findMany();
  }

  async getById(userId) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async updateById(userId, updatedUserData) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedUserData,
    });
  }

  async deleteById(userId) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}

module.exports = UserModel;
