-- AlterTable
ALTER TABLE "Teacher_Note" ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "classId" DROP NOT NULL,
ALTER COLUMN "classId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Teacher_Note" ADD CONSTRAINT "Teacher_Note_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher_Note" ADD CONSTRAINT "Teacher_Note_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
