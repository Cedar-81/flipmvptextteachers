import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../contexts/teachercontext";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const TeacherClassCourse = gql`
  query Teacher($teacherId: ID!) {
    teacher(teacherId: $teacherId) {
      firstName
      image
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
    teacherprofile,
    setTopbaraction,
  } = useContext(TeacherContext);

  const router = useRouter();

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

  useEffect(() => {
    if (typeof document !== "undefined" && data) {
      document.getElementById(
        "profile_img"
      ).style.backgroundImage = `url(${data.teacher.image})`;
    }
  }, [teacherprofile, data]);

  return (
    <div className="topnav fixed md:w-[95%] z-[60] top-0 flex justify-between h-[6rem] md:h-[10%] items-center w-full shadow-md md:px-8 bg-accent_bkg_color">
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
          <div
            onClick={() => {
              setTopbaraction("Personal");
              router.push("/student/settings");
            }}
            id="profile_img"
            className="profile_img rounded-full cursor-pointer bg-no-repeat bg-cover bg-center h-[3rem] md:h-10 md:w-10 ml-4 w-[3rem] bg-main_color shadow-md"
          ></div>
          <h2 className="greeting font-medium text-[2rem] md:text-[1rem] w-max ml-2">
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
