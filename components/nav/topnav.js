import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../contexts/teachercontext";
import { gql, useQuery } from "@apollo/client";

const TeacherClassCourse = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      firstName
    }
  }
`;

function Topnav() {
  const {
    toggle_notification,
    toggle_class_course,
    notetitle,
    create,
    setNotetitle,
    toggle_menu,
    topbaraction,
    teacherid,
  } = useContext(TeacherContext);

  console.log("rerendered");

  const { data, error, loading } = useQuery(TeacherClassCourse, {
    variables: { teacherId: teacherid },
  });

  let val = "...";
  if (loading) {
    val = "...";
  }
  if (data) {
    val = data.teacher.firstName;
  }

  return (
    <div className="topnav fixed md:w-[95%] z-10 top-0 flex justify-between h-[10%] items-center w-full shadow-md md:px-8 bg-accent_bkg_color">
      {create && (
        <input
          placeholder="Untitled"
          value={notetitle}
          onChange={(e) => {
            setNotetitle(e.target.value);
          }}
          className="hidden md:flex text-2xl font-medium bg-accent_bkg_color py-2 outline-none"
        />
      )}
      {!create && (
        <h1 className="label hidden md:contents text-2xl font-medium">
          {topbaraction}
        </h1>
      )}
      <div className="right flex justify-between md:w-max w-full md:flex-row-reverse ">
        <div className="profile flex md:flex-row-reverse items-center">
          <div className="profile_img rounded-full cursor-pointer h-10 ml-4 w-10 bg-main_color shadow-md"></div>
          <h2 className="greeting font-medium text-[100% + 4rem] md:w-max w-2 ml-2">
            Hello, {val}!
          </h2>
        </div>

        <div className="icons md:mr-8 mr-4 flex justify-between w-[9rem] md:w-[6rem]">
          <div
            onClick={() => {
              toggle_class_course();
            }}
            className="icon_con rounded-full h-8 w-8 cursor-pointer bg-main_color flex justify-center items-center shadow-md p-[19px]"
          >
            <span className="material-symbols-outlined text-accent_color">
              edit_attributes
            </span>
          </div>
          <div
            onClick={() => {
              toggle_notification();
            }}
            className="icon_con rounded-full h-8 w-8 cursor-pointer bg-main_color flex justify-center items-center shadow-md p-[19px]"
          >
            <span className="material-symbols-outlined text-accent_color ">
              notifications
            </span>
          </div>
          <div
            onClick={() => toggle_menu()}
            className="icon_con rounded-full h-8 w-8 md:hidden cursor-pointer bg-main_color flex justify-center items-center shadow-md p-[19px]"
          >
            <span className="material-symbols-outlined text-accent_color">
              menu
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topnav;
