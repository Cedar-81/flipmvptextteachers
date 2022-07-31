import React, { useContext, useState } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { useRouter } from "next/router";

function Shareclass() {
  const [btn_txt, setBtn_txt] = useState("Copy");
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

  const copy_class = async () => {
    navigator.clipboard.writeText(classcoursedata.classCode);
    setClasscoursedata({
      ...classcoursedata,
      classId: "",
      working: false,
      workingText: "",
    });
    setAction("Class");
    setBtn_txt("Copied");

    setTimeout(() => {
      setBtn_txt("Copy");
    }, 3000);
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-50 bg-dark_color">
      <div className="w-[20rem] relative min-h-[11rem] h-max mt-[13%] bg-accent_bkg_color pt-[1rem] rounded-lg shadow-lg px-[1rem] mx-auto my-auto ">
        <div
          onClick={() => {
            setCcdaction("");
            setAction("Class");
          }}
          className="cancel absolute right-5 cursor-pointer"
        >
          <span className="material-icons text-accent_color text-base">
            close
          </span>
        </div>
        <p className="text-xl text-center mx-auto font-medium max-w-full text-accent_color overflow-hidden">
          Class Link!!!
        </p>
        <p className=" mt-3">
          <span className="text-xs text-left block">
            Hey, here&apos;s a link to this class you can share it to whomever
            you want to join the class.
          </span>
          <span className="text-xl mt-2 text-center block">
            {classcoursedata.classCode}
          </span>
        </p>
        <div className="w-full flex justify-end">
          <button
            onClick={() => copy_class()}
            className="bg-accent_color cursor-pointer hover:shadow-md text-main_color px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            {btn_txt}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Shareclass;
