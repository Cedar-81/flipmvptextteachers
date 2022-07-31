import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useQuery } from "@apollo/client";

const TeacherClassCourse = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      classes {
        id
        class
        classCode
        courses {
          id
          course
        }
      }
    }
  }
`;

function Class_course() {
  const [course_list, setCourse_list] = useState([]);
  const {
    toggle_class_course,
    teacherid,
    setClasscoursedata,
    classcoursedata,
    action,
    setAction,
    setCcdaction,
  } = useContext(TeacherContext);

  const { data, error, loading } = useQuery(TeacherClassCourse, {
    variables: { teacherId: teacherid },
  });

  let classes;

  if (loading) {
    classes = <p>loading...</p>;
  }
  console.log(data);
  if (data)
    classes = data.teacher.classes.map((val, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setClasscoursedata({
              courseId: "",
              classId: val.id,
              classCode: val.classCode,
            });
            setAction("Course");
          }}
          className="item cursor-pointer flex bg-accent_bkg_color w-[95%] mb-4 px-4 h-[3rem] justify-between items-center mx-auto rounded-xl"
        >
          <p className="item_text md:text-sm ml-4 text-xl font-semibold">
            {val.class}
          </p>
          <div className="action flex">
            <div
              onClick={() => setCcdaction("share_class")}
              className="rounded-full flex justify-center items-center bg-main_color h-8 w-8 shadow-md z-20 text-dark_color hover:text-accent_color"
            >
              <span className="material-icons text-[18px]">share</span>
            </div>
            <div
              onClick={() => {
                setCcdaction("delete_class");
              }}
              className="rounded-full flex justify-center ml-3 items-center bg-main_color shadow-md z-20 text-dark_color h-8 w-8 hover:text-accent_color"
            >
              <span className="material-icons text-[18px]  text-center">
                delete
              </span>
            </div>
          </div>
        </div>
      );
    });

  useEffect(() => {
    if (data && action === "Course" && classcoursedata.classId !== "") {
      let val = data.teacher.classes.filter(
        (val) => val.id === classcoursedata.classId
      );
      val = val[0].courses;
      setCourse_list(val);
    }
  }, [classcoursedata]);

  const courses = course_list.map((val, index) => {
    return (
      <div
        key={index}
        onClick={() => {
          setClasscoursedata({
            ...classcoursedata,
            courseId: val.id,
            action: "",
          });
          toggle_class_course(false);
        }}
        className="item cursor-pointer flex bg-accent_bkg_color justify-between w-[95%] mb-4 px-4 h-[3rem] items-center mx-auto rounded-xl"
      >
        <p className="item_text md:text-sm ml-4 text-xl font-semibold">
          {val.course}
        </p>
        <div
          onClick={() => {
            setCcdaction("delete_course");
          }}
          className="action rounded-full flex justify-center ml-3 items-center bg-main_color shadow-md z-20 text-dark_color h-8 w-8 hover:text-accent_color"
        >
          <span className="material-icons text-[18px]">delete</span>
        </div>
      </div>
    );
  });

  return (
    <div className="nav_displays z-50 fixed overflow-y-auto md:top-[9%] bg-main_color md:right-[6rem] md:pt-0 md:mt-4 md:h-max md:w-max md:rounded-md md:shadow-md top-0 h-[90%] w-[100vw] ">
      {classcoursedata.working && (
        <div className="w-full absolute z-10 top-1 flex items-center justify-center ">
          <p className="py-2 text-xs px-4 text-center mx-auto shadow-lg bg-accent_color text-main_color">
            {classcoursedata.workingText}Just a moment
          </p>
        </div>
      )}
      <div className="class_course w-full md:w-[20rem] pt-4 md:pt-0 bg-main_color md:bg-main_color md:h-[20rem] md:rounded-md items-center h-full">
        <div className="flex md:mt-0 md:hidden">
          <div
            onClick={() => toggle_class_course()}
            className="icon_con rounded-full h-10 w-10 cursor-pointer flex justify-center items-center"
          >
            <span className="material-symbols-outlined text-md">
              arrow_back_ios_new
            </span>
          </div>
          <h2 className="class_course_text ml-2 text-3xl text-accent_color font-semibold">
            Select {action}
          </h2>
        </div>

        <div className="class_course_con w-full mt-7 h-full ">
          {action == "Class" && (
            <div className="display bg-main_color h-full pt-8 md:pt-0">
              <div className="bg-main_color sticky top-0 pt-2 ">
                <div
                  onClick={() =>
                    setClasscoursedata({
                      ...classcoursedata,
                      action: "new_class",
                    })
                  }
                  className="item cursor-pointer flex bg-accent_color_2 w-[95%] mb-4 px-4 h-[3rem] items-center mx-auto rounded-xl"
                >
                  <span className="material-icons text-accent_color">add</span>
                  <p className="item_text md:text-sm ml-4 text-xl font-medium">
                    Add class
                  </p>
                </div>
              </div>
              {classes}
              <div className="h-4"></div>
            </div>
          )}

          {action == "Course" && (
            <div className="display bg-main_color h-full pt-8 md:pt-0">
              <div
                onClick={() => setAction("Class")}
                className="back_to_class sticky top-2 bg-main_color flex mb-4 md:ml-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-accent_color">
                  arrow_back_ios_new
                </span>
                <p className="text-sm font-semibold text-accent_color">
                  Change Class
                </p>
              </div>
              <div
                onClick={() =>
                  setClasscoursedata({
                    ...classcoursedata,
                    action: "new_course",
                  })
                }
                className="item cursor-pointer sticky top-4 flex bg-accent_color_2 w-[95%] mb-4 px-4 h-[3rem] items-center mx-auto rounded-xl"
              >
                <span className="material-icons text-accent_color">add</span>
                <p className="item_text md:text-sm ml-4 text-xl font-medium">
                  Add course
                </p>
              </div>
              {courses}
              <div className="h-4"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Class_course;
