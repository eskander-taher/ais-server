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

  const accessPoints = [
    {
      id: 'accessPoint1',
      name: 'Access Point 1',
      buildingId: 'building1',
    },
    {
      id: 'accessPoint2',
      name: 'Access Point 2',
      buildingId: 'building2',
    },
  ];

  const accessLogs = [
    {
      id: 'accessLog1',
      accessStatus: 'Granted',
      accessType: 'Entry',
      userId: 'user1',
      accessPointId: 'accessPoint1',
    },
    {
      id: 'accessLog2',
      accessStatus: 'Denied',
      accessType: 'Entry',
      userId: 'user2',
      accessPointId: 'accessPoint2',
    },
  ];

  // Create users, buildings, access points, and access logs
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

  for (const accessPointData of accessPoints) {
    await prisma.accessPoint.create({
      data: accessPointData,
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
