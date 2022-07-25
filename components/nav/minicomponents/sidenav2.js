import React, { useContext } from "react";
import { TeacherContext } from "../../contexts/teachercontext";

function Sidenav2() {
  const { setShelf2, setShelf3, setNotetype } = useContext(TeacherContext);
  return (
    <div className="w-[15%] fixed ml-[5%] z-20 h-[100%] bg-main_color shadow-lg">
      <div
        onClick={() => {
          setShelf2(false);
          setShelf3(false);
        }}
        className="icon_con mt-4 w-full cursor-pointer text-right"
      >
        <span className="material-icons text-sm text-accent_color">
          arrow_back_ios
        </span>
      </div>
      <div className="search_con mt-11 border-[1px] items-center pr-1 border-accent_color h-10 flex  mx-2 rounded-md ">
        <input
          type="search"
          placeholder="Search"
          className="w-[90%] outline-none px-1 h-full"
        />
        <span className="material-icons text-accent_bkg_dark_color">
          search
        </span>
      </div>
      <div className="selections mt-8">
        <div
          onClick={() => {
            setShelf3(true);
            setNotetype("personal");
          }}
          className="item flex pl-2 text-sm cursor-pointer py-2 hover:text-accent_color mb-3 items-center"
        >
          <span className="material-symbols-outlined text-accent_color">
            verified_user
          </span>
          <p className="text ml-3 font-medium">Personal Notes</p>
        </div>
        <div
          onClick={() => {
            setShelf3(true);
            setNotetype("school");
          }}
          className="item flex pl-2 text-sm cursor-pointer py-2 hover:text-accent_color mb-3 items-center"
        >
          <span className="material-symbols-outlined text-accent_color">
            school
          </span>
          <p className="text ml-3 font-medium">School Notes</p>
        </div>
      </div>
    </div>
  );
}

export default Sidenav2;
