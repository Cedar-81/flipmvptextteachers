import Image from "next/image";
import React, { useContext } from "react";
import { TeacherContext } from "../../contexts/teachercontext";

function Sidebar() {
  const { setSidebartype, toggle_menu } = useContext(TeacherContext);
  return (
    <div
      onClick={() => toggle_menu()}
      className="md:hidden w-[6rem] h-full fixed top-0 z-10 left-0 bg-main_color shadow-lg"
    >
      <div className="mt-[2rem] px-2">
        <Image src="/assets/logo.png" width={67} height={28} />
      </div>
      <div className="icons w-full flex-row mt-[5rem]">
        <div
          onClick={() => setSidebartype("bar2")}
          className="icon_con flex justify-center items-center h-[3rem] hover:text-main_color hover:shadow-lg text-accent_color cursor-pointer mt-[3rem] hover:bg-accent_color"
        >
          <span className="material-icons text-[4rem] ">local_library</span>
        </div>
        <div
          onClick={() => router.push("/teacher/settings")}
          className="icon_con flex justify-center items-center h-[3rem] hover:text-main_color hover:shadow-lg text-accent_color cursor-pointer mt-[5rem] hover:bg-accent_color"
        >
          <span className="material-icons text-[4rem] ">manage_accounts</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
