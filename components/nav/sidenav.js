import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../contexts/teachercontext";

function Sidenav() {
  const router = useRouter();
  const {
    setShelf2,
    setCreate,
    setTopbaraction,
    create,
    classcoursedata,
    setClass_course,
    teachername,
  } = useContext(TeacherContext);

  const show_shelf = () => {
    setCreate(false);
    setTopbaraction("Notes");
    setShelf2(true);
    if (router.query.id === undefined) {
      router.push("/teacher/bookshelf");
    }
  };

  console.log(
    teachername.split(" ")[0][0].toUpperCase() +
      teachername.split(" ")[1][0].toUpperCase()
  );

  return (
    <div className="w-[12rem] bg-sidenav_bkg_color shadow-md relative z-[67] top-0 h-[100%]">
      <div className=" absolute bottom-2 right-2 px-2">
        <Image src="/assets/logo.png" width={67} height={28} />
      </div>
      <div
        onClick={() => {
          setClass_course((prev) => !prev);
        }}
        className="details cursor-pointer mt-8 grid grid-cols-2 gap-0 bg-accent_bkg_hover px-2 rounded-lg mx-1 h-[5rem] "
      >
        <div className="initials border-2 w-[3rem] my-auto flex justify-center items-center text-lg font-semibold text-main_color bg-accent_color rounded-md h-[3rem]">
          {teachername.trim().length > 0
            ? teachername.split(" ")[0][0].toUpperCase() +
              teachername.split(" ")[1][0].toUpperCase()
            : "..."}
        </div>
        <div className="det_txt ml-[-1.7rem] my-auto">
          <p className="text-xs text-[#F7F7F7]">
            Class:{" "}
            <span className="font-medium">
              {classcoursedata.className != "" &&
              classcoursedata.className.length > 7
                ? classcoursedata.className.substring(0, 7) + "..."
                : classcoursedata.className}
              {classcoursedata.className === "" && "Select Cl..."}
            </span>
          </p>
          <p className="text-xs mt-1 text-[#F7F7F7]">
            Course:{" "}
            <span className="font-medium">
              {classcoursedata.courseName != "" &&
              classcoursedata.courseName.length > 7
                ? classcoursedata.courseName.substring(0, 7) + "..."
                : classcoursedata.courseName}
              {classcoursedata.courseName.trim().length === 0 && "Select C..."}
            </span>
          </p>
        </div>
      </div>
      <div className="icons w-full flex-row mt-[1rem]">
        <div
          onClick={show_shelf}
          className="icon_con flex mx-1 px-4 rounded-md items-center text-center py-2 hover:text-dark_color text-dark_color_2 cursor-pointer mt-4 hover:bg-accent_bkg_hover"
        >
          <span className="material-symbols-outlined text-[30px]">
            summarize
          </span>
          <p className="text-base font-medium ml-4">Notes</p>
        </div>
        <div
          onClick={() => {
            setTopbaraction("Settings");
            setCreate(false);
            router.push("/teacher/settings");
          }}
          className="icon_con flex mx-1 px-4 rounded-md items-center text-center py-2 hover:text-dark_color text-dark_color_2 cursor-pointer mt-2 hover:bg-accent_bkg_hover"
        >
          <span className="material-symbols-outlined text-[30px]">
            settings
          </span>
          <p className="text-base font-medium ml-4">Settings</p>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
