import React, { useContext } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const TeacherClassCourse = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      classes {
        id
        class
        courses {
          id
          course
        }
      }
    }
  }
`;

const DeleteNote = gql`
  mutation DeleteClass($input: deleteCourseInput) {
    deleteCourse(input: $input)
  }
`;

function Deletecourse() {
  const {
    setCreatetype,
    teacherid,
    classcoursedata,
    notetype,
    setCreate,
    notedata,
    setNotedata,
    setClasscoursedata,
    setAction,
    setCcdaction,
  } = useContext(TeacherContext);

  const router = useRouter();

  const [deleteCourse, { data, loading, error }] = useMutation(DeleteNote, {
    refetchQueries: [
      {
        query: TeacherClassCourse,
        variables: { teacherId: teacherid },
      },
      "TeacherClassCourse",
    ],
  });

  if (loading) console.log("Creating...");
  if (error) console.log("error", JSON.stringify(error, null, 2));

  const inputVal = {
    id: classcoursedata.courseId,
  };

  const delete_course = async () => {
    setClasscoursedata({
      ...classcoursedata,
      courseId: "",
      courseName: "",
      working: true,
      workingText: "Deleting...",
    });
    setCcdaction("");
    setAction("Class");
    await deleteCourse({ variables: { input: inputVal } });
    setClasscoursedata({
      ...classcoursedata,
      working: false,
    });
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-50 bg-dark_color">
      <div className="w-[20rem] relative min-h-[11rem] h-max mt-[13%] bg-accent_bkg_color pt-[1rem] rounded-lg shadow-lg px-[1rem] mx-auto my-auto ">
        <div
          onClick={() => {
            setCcdaction("");
            setAction("Course");
          }}
          className="cancel absolute right-5 cursor-pointer"
        >
          <span className="material-icons text-accent_color text-base">
            close
          </span>
        </div>
        <p className="text-xl text-center mx-auto font-medium max-w-full text-accent_color overflow-hidden">
          Delete Alert!!!
        </p>
        <p className="text-sm text-left mt-3">
          Hey, you sure you want to delete this oourse and all its content
        </p>
        <div className="w-full flex justify-end">
          <button
            onClick={() => delete_course()}
            className="bg-accent_color cursor-pointer hover:shadow-md text-main_color px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Deletecourse;
