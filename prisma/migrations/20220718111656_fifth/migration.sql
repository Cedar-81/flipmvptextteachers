/*
  Warnings:

  - The `classId` column on the `Teacher_Note` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Teacher_Note" DROP CONSTRAINT "Teacher_Note_classId_fkey";

-- DropForeignKey
ALTER TABLE "Teacher_Note" DROP CONSTRAINT "Teacher_Note_courseId_fkey";

-- AlterTable
ALTER TABLE "Teacher_Note" DROP COLUMN "classId",
ADD COLUMN     "classId" TEXT[];
