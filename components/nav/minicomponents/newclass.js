import React, { useContext, useState } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useMutation } from "@apollo/client";

const CreateClass = gql`
  mutation CreateClass($input: createClassInput) {
    createClass(input: $input)
  }
`;

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

function Newclass() {
  const { setClasscoursedata, classcoursedata, teacherid } =
    useContext(TeacherContext);
  const [classname, setClassName] = useState("");

  const [create_class, { data, loading, error }] = useMutation(CreateClass, {
    refetchQueries: [
      { query: TeacherClassCourse, variables: { teacherId: teacherid } },
      "Teacher",
    ],
  });

  if (loading) console.log("Creating...");
  if (error) console.log(JSON.stringify(error, null, 2));

  const inputVal = {
    class: classname,
    teacherId: teacherid,
  };

  const create = () => {
    create_class({ variables: { input: inputVal } });
    setClasscoursedata({
      ...classcoursedata,
      action: "",
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
          onChange={(e) => setClassName(e.target.value)}
          className="w-full h-10 px-2 mt-[1.2rem] focus:shadow-lg focus:bg-main_color rounded-md outline-none"
          placeholder="Enter new classname"
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

export default Newclass;
