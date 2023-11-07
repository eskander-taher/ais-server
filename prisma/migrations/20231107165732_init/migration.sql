-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "buildingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccessPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessLog" (
    "id" TEXT NOT NULL,
    "accessStatus" TEXT NOT NULL,
    "accessType" TEXT NOT NULL,
    "accessTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "accessPointId" TEXT NOT NULL,

    CONSTRAINT "AccessLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BuildingToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BuildingToUser_AB_unique" ON "_BuildingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BuildingToUser_B_index" ON "_BuildingToUser"("B");

-- AddForeignKey
ALTER TABLE "AccessPoint" ADD CONSTRAINT "AccessPoint_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessLog" ADD CONSTRAINT "AccessLog_accessPointId_fkey" FOREIGN KEY ("accessPointId") REFERENCES "AccessPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuildingToUser" ADD CONSTRAINT "_BuildingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuildingToUser" ADD CONSTRAINT "_BuildingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
