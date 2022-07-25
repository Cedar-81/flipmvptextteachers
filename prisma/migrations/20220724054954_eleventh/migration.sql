/*
  Warnings:

  - You are about to drop the column `verified` on the `Student_Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student_Note" DROP COLUMN "verified";

-- CreateTable
CREATE TABLE "Student_Teacher_Course" (
    "id" TEXT NOT NULL,
    "student" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "courseList" TEXT[],
    "verified" BOOLEAN NOT NULL,

    CONSTRAINT "Student_Teacher_Course_pkey" PRIMARY KEY ("id")
);
