import React, { useContext, useState } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useMutation } from "@apollo/client";

const CreateCourse = gql`
  mutation CreateCourse($input: createCourseInput) {
    createCourse(input: $input)
  }
`;

const TeacherClassCourse = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      classes {
        courses {
          id
          course
        }
      }
    }
  }
`;

function Newcourse() {
  const { setClasscoursedata, classcoursedata, teacherid, setAction } =
    useContext(TeacherContext);
  const [coursename, setCourseName] = useState("");

  const [create_course, { data, loading, error }] = useMutation(CreateCourse, {
    refetchQueries: [
      { query: TeacherClassCourse, variables: { teacherId: teacherid } },
      "Teacher",
    ],
  });

  if (loading) console.log("Creating...");
  if (error) console.log(JSON.stringify(error, null, 2));

  const inputVal = {
    course: coursename,
    classId: classcoursedata.classId,
  };

  const create = async () => {
    setClasscoursedata({
      ...classcoursedata,
      action: "",
      working: true,
      workingText: "Creating...",
    });
    setAction("Class");
    await create_course({ variables: { input: inputVal } });
    setClasscoursedata({
      ...classcoursedata,
      action: "",
      working: false,
    });
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-50 bg-dark_color">
      <div className="w-[20rem] relative min-h-[11rem] h-max mt-[13%] bg-accent_bkg_color pt-[1rem] rounded-lg shadow-lg px-[1rem] mx-auto my-auto ">
        <div
          onClick={() => setClasscoursedata({ ...classcoursedata, action: "" })}
          className="cancel absolute right-5 cursor-pointer"
        >
          <span className="material-icons text-accent_color text-base">
            close
          </span>
        </div>
        <p className="text-xl text-center mx-auto max-w-full overflow-hidden">
          {/* {notetitle} */}
        </p>
        <input
          type={"text"}
          onChange={(e) => setCourseName(e.target.value)}
          className="w-full h-10 px-2 mt-[1.2rem] focus:shadow-lg focus:bg-main_color rounded-md outline-none"
          placeholder="Enter new coursename"
        />
        <div className="w-full flex justify-end">
          <button
            onClick={() => create()}
            className="bg-accent_color cursor-pointer hover:shadow-md text-main_color px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newcourse;
