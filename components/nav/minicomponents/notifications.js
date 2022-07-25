import React from "react";

function Notifications() {
  return (
    <div className="nav_displays z-50 fixed bg-main_color md:right-[6rem] md:pt-0 md:mt-4 md:h-max md:w-max md:rounded-md md:shadow-md top-[10%] h-[90%] w-[100vw] ">
      <div className="notification w-full md:w-[20rem] md:h-[20rem] md:rounded-md items-center h-full bg-main_color">
        <div className="flex mt-4 md:mt-0 md:hidden">
          <div className="icon_con rounded-full h-10 w-10 cursor-pointer flex justify-center items-center">
            <span className="material-symbols-outlined text-md">
              arrow_back_ios_new
            </span>
          </div>
          <h2 className="notification_text ml-2 text-3xl text-accent_color font-semibold">
            Notifications
          </h2>
        </div>

        <div className="notification_con w-full mt-7">
          <div className=" bg-accent_bkg_color mx-auto py-4 rounded-md px-3 w-[90%]">
            <div className="label p-1 w-max bg-accent_color_2 rounded-md relative float-right">
              <p className="text-[9px] text-main_color">TEACHER</p>
            </div>
            <h4 className="title text-md font-medium">Note Shared</h4>
            <p className="content text-xs font-light">
              Note has been shared with students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
