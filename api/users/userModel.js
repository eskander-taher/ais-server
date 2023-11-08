const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserModel {
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

  async create(userData) {
    return prisma.user.create({
      data: userData,
    });
  }

  async update(userId, updatedData) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedData,
    });
  }

  async delete(userId) {
    return prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async getBuildings(userId) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        buildings: true,
      },
    });
  }

  async getAccessLogs(userId) {
    return prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        accessLogs: true,
      },
    });
  }
}

module.exports = UserModel;
