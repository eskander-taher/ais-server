// Import Prisma client and models
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define the seed data
async function main() {
  const users = [
    {
      id: 'user1',
      name: 'Alice',
    },
    {
      id: 'user2',
      name: 'Bob',
    },
  ];

  const buildings = [
    {
      id: 'building1',
      name: 'Building A',
    },
    {
      id: 'building2',
      name: 'Building B',
    },
  ];

  const accessLogs = [
    {
      id: 'accessLog1',
      accessStatus: 'Granted',
      accessType: 'Entry',
      userId: 'user1',
      buildingId: 'building1',
    },
    {
      id: 'accessLog2',
      accessStatus: 'Denied',
      accessType: 'Entry',
      userId: 'user2',
      buildingId: 'building2',
    },
  ];

  // Create users, buildings, and access logs
  for (const userData of users) {
    await prisma.user.create({
      data: userData,
    });
  }

  for (const buildingData of buildings) {
    await prisma.building.create({
      data: buildingData,
    });
  }

  for (const accessLogData of accessLogs) {
    await prisma.accessLog.create({
      data: accessLogData,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
