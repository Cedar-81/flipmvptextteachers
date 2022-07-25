import React, { useContext, useEffect } from "react";
import { TeacherContext } from "../../../components/contexts/teachercontext";
import Welcome from "../../../public/assets/SVG/welcome.svg";

function Index() {
  const { setTopbaraction } = useContext(TeacherContext);
  useEffect(() => {
    setTopbaraction("Welcome");
  }, []);
  return (
    <div className="pt-[7%] h-[100vh] flex-row items-center z-0 justify-center w-[100vw] md:w-full ">
      <Welcome className="h-[67%] mt-[40%] ml-[4%] relative z-0 md:mt-8 md:mx-auto opacity-75" />
      <div className="w-[150vw] mt-[15%] md:w-full text-center md:mt-4">
        <h3 className=" text-3xl text-center font-[Fira-sans]">
          Welcome Aboard, lets get started.
          <span className="block text-lg font-[Inter] ">
            First, select a class from the topbar
          </span>
          <span className="block text-lg font-[Inter] ">
            Then, select a note to read.
          </span>
        </h3>
      </div>
    </div>
  );
}

export default Index;
