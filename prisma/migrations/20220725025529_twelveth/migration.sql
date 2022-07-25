/*
  Warnings:

  - You are about to drop the column `class` on the `Student_Note` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Student_Note` table. All the data in the column will be lost.
  - You are about to drop the column `student` on the `Student_Teacher_Course` table. All the data in the column will be lost.
  - Added the required column `classId` to the `Student_Teacher_Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student_Note" DROP COLUMN "class",
DROP COLUMN "course";

-- AlterTable
ALTER TABLE "Student_Teacher_Course" DROP COLUMN "student",
ADD COLUMN     "classId" TEXT NOT NULL;
