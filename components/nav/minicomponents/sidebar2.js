import React, { useContext } from "react";
import { TeacherContext } from "../../contexts/teachercontext";

function Sidebar2() {
  const { setShelf2, setSidebartype, setNotetype } = useContext(TeacherContext);
  return (
    <div className="notification fixed md:hidden w-[100vw] pt-8 md:w-[20rem] md:h-[20rem] md:rounded-md items-center h-full bg-main_color">
      <div className="flex mt-4 md:mt-0 md:hidden">
        <div className="icon_con rounded-full h-10 w-10 cursor-pointer flex justify-center items-center">
          <span
            onClick={() => {
              setSidebartype("");
            }}
            className="material-symbols-outlined text-md"
          >
            arrow_back_ios_new
          </span>
        </div>
        <h2 className="notification_text ml-2 text-3xl text-accent_color font-semibold">
          Note Type
        </h2>
      </div>

      <div className="notification_con w-full mt-7">
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
              setSidebartype("bar3");
              setNotetype("personal");
            }}
            className="item flex pl-2 text-sm cursor-pointer py-2 hover:text-accent_color mb-3 items-center"
          >
            <span className="material-symbols-outlined text-accent_color">
              verified_user
            </span>
            <p className="text ml-3 text-xl font-medium">Personal Notes</p>
          </div>
          <div
            onClick={() => {
              setSidebartype("bar3");
              setNotetype("school");
            }}
            className="item flex pl-2 text-sm cursor-pointer py-2 hover:text-accent_color mb-3 items-center"
          >
            <span className="material-symbols-outlined text-accent_color">
              school
            </span>
            <p className="text text-xl ml-3 font-medium">School Notes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar2;
