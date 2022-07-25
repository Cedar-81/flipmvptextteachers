import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { TeacherContext } from "../contexts/teachercontext";

function Sidenav() {
  const router = useRouter();
  const { setShelf2, setCreate, setTopbaraction, topbaraction } =
    useContext(TeacherContext);

  const show_shelf = () => {
    if (router.query.id === undefined) {
      router.push("/teacher/bookshelf");
      console.log(true);
    }
    console.log("router", router.query.id);
    setTopbaraction("Notes");
    setShelf2(true);
  };

  return (
    <div className="w-[5%] bg-main_color fixed shadow-lg z-30 top-0 h-[100%]">
      <div className="mt-[2rem] px-2">
        <Image src="/assets/logo.png" width={67} height={28} />
      </div>
      <div className="icons w-full flex-row mt-[2rem]">
        <div
          onClick={show_shelf}
          className="icon_con flex justify-center items-center h-[3rem] hover:text-main_color hover:shadow-lg text-accent_color cursor-pointer mt-4 hover:bg-accent_color"
        >
          <span className="material-icons text-[30px] ">local_library</span>
        </div>
        <div
          onClick={() => {
            setTopbaraction("Settings");
            setCreate(false);
            router.push("/teacher/settings");
          }}
          className="icon_con flex justify-center items-center h-[3rem] hover:text-main_color hover:shadow-lg text-accent_color cursor-pointer mt-4 hover:bg-accent_color"
        >
          <span className="material-icons text-[30px] ">manage_accounts</span>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
