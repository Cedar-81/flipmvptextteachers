/*
  Warnings:

  - You are about to drop the column `courseList` on the `Student_Teacher_Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "stcId" TEXT;

-- AlterTable
ALTER TABLE "Student_Teacher_Course" DROP COLUMN "courseList";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_stcId_fkey" FOREIGN KEY ("stcId") REFERENCES "Student_Teacher_Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
