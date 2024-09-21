/*
  Warnings:

  - You are about to drop the column `teamId` on the `EmployeeProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_teamId_fkey";

-- AlterTable
ALTER TABLE "EmployeeProfile" DROP COLUMN "teamId";

-- CreateTable
CREATE TABLE "_EmployeeTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeTeams_AB_unique" ON "_EmployeeTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeTeams_B_index" ON "_EmployeeTeams"("B");

-- AddForeignKey
ALTER TABLE "_EmployeeTeams" ADD CONSTRAINT "_EmployeeTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "EmployeeProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeTeams" ADD CONSTRAINT "_EmployeeTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
