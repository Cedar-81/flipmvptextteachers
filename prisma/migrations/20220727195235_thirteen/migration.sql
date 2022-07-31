-- AddForeignKey
ALTER TABLE "Student_Teacher_Course" ADD CONSTRAINT "Student_Teacher_Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
