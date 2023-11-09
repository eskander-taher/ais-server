// Import Prisma client and models
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.accessLog.deleteMany({});
  await prisma.building.deleteMany({});
  await prisma.user.deleteMany({});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User CRUD operations', () => {
  let createdUserId;

  it('should create a new user', async () => {
    const newUser = {
      name: 'Test User',
    };

    const user = await prisma.user.create({
      data: newUser,
    });

    expect(user.name).toEqual(newUser.name);
    expect(user.id).toBeDefined();

    // Store the created user's ID for later tests
    createdUserId = user.id;
  });

  it('should read user data', async () => {
    const user = await prisma.user.findUnique({
      where: { id: createdUserId },
    });

    expect(user).not.toBeNull();
  });

  it('should update user data', async () => {
    const updatedName = 'Updated User';

    const updatedUser = await prisma.user.update({
      where: { id: createdUserId },
      data: { name: updatedName },
    });

    expect(updatedUser.name).toEqual(updatedName);
  });

  it('should delete a user', async () => {
    const deletedUser = await prisma.user.delete({
      where: { id: createdUserId },
    });

    expect(deletedUser.id).toEqual(createdUserId);

    // Check if the user has been deleted
    const user = await prisma.user.findUnique({
      where: { id: createdUserId },
    });

    expect(user).toBeNull();
  });
});

describe('Building CRUD operations', () => {
  let createdBuildingId;

  it('should create a new building', async () => {
    const newBuilding = {
      name: 'Test Building',
    };

    const building = await prisma.building.create({
      data: newBuilding,
    });

    expect(building.name).toEqual(newBuilding.name);
    expect(building.id).toBeDefined();

    // Store the created building's ID for later tests
    createdBuildingId = building.id;
  });

  it('should read building data', async () => {
    const building = await prisma.building.findUnique({
      where: { id: createdBuildingId },
    });

    expect(building).not.toBeNull();
  });

  it('should update building data', async () => {
    const updatedName = 'Updated Building';

    const updatedBuilding = await prisma.building.update({
      where: { id: createdBuildingId },
      data: { name: updatedName },
    });

    expect(updatedBuilding.name).toEqual(updatedName);
  });

  it('should delete a building', async () => {
    const deletedBuilding = await prisma.building.delete({
      where: { id: createdBuildingId },
    });

    expect(deletedBuilding.id).toEqual(createdBuildingId);

    // Check if the building has been deleted
    const building = await prisma.building.findUnique({
      where: { id: createdBuildingId },
    });

    expect(building).toBeNull();
  });
});

describe('AccessLog CRUD operations', () => {
  let createdAccessLogId;
  let userId;
  let buildingId;

  beforeAll(async () => {
    const createdUser = await prisma.user.create({
      data: {
        name: 'test user for access log',
      },
    });

    const createdBuilding = await prisma.building.create({
      data: {
        name: 'test building for access log',
      },
    });

    userId = createdUser.id;
    buildingId = createdBuilding.id;
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: userId },
    });
    await prisma.building.delete({
      where: { id: buildingId },
    });
  });

  it('should create a new access log', async () => {
    const newAccessLog = {
      accessStatus: 'Granted',
      accessType: 'Entry',
      userId,
      buildingId,
    };

    const accessLog = await prisma.accessLog.create({
      data: newAccessLog,
    });

    expect(accessLog.accessStatus).toEqual(newAccessLog.accessStatus);
    expect(accessLog.id).toBeDefined();

    // Store the created access log's ID for later tests
    createdAccessLogId = accessLog.id;
  });

  it('should read access log data', async () => {
    const accessLog = await prisma.accessLog.findUnique({
      where: { id: createdAccessLogId },
    });

    expect(accessLog).not.toBeNull();
  });

  it('should update access log data', async () => {
    const updatedAccessStatus = 'Denied';

    const updatedAccessLog = await prisma.accessLog.update({
      where: { id: createdAccessLogId },
      data: { accessStatus: updatedAccessStatus },
    });

    expect(updatedAccessLog.accessStatus).toEqual(updatedAccessStatus);
  });

  it('should delete an access log', async () => {
    const deletedAccessLog = await prisma.accessLog.delete({
      where: { id: createdAccessLogId },
    });

    expect(deletedAccessLog.id).toEqual(createdAccessLogId);

    // Check if the access log has been deleted
    const accessLog = await prisma.accessLog.findUnique({
      where: { id: createdAccessLogId },
    });

    expect(accessLog).toBeNull();
  });
});
