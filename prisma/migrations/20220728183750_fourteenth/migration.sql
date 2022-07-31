/*
  Warnings:

  - You are about to drop the `_ClassToCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassToCourse" DROP CONSTRAINT "_ClassToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToCourse" DROP CONSTRAINT "_ClassToCourse_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "classId" TEXT;

-- DropTable
DROP TABLE "_ClassToCourse";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
