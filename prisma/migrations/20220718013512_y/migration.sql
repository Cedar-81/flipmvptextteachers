/*
  Warnings:

  - You are about to drop the column `class` on the `Teacher_Note` table. All the data in the column will be lost.
  - You are about to drop the column `course` on the `Teacher_Note` table. All the data in the column will be lost.
  - Added the required column `classId` to the `Teacher_Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Teacher_Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teacher_Note" DROP COLUMN "class",
DROP COLUMN "course",
ADD COLUMN     "classId" TEXT NOT NULL,
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Teacher_Note" ADD CONSTRAINT "Teacher_Note_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher_Note" ADD CONSTRAINT "Teacher_Note_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
