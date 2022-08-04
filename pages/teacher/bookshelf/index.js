import React, { useContext, useEffect } from "react";
import { TeacherContext } from "../../../components/contexts/teachercontext";
import Read from "../../../public/assets/SVG/bookshelf.svg";

function Index() {
  const { setTopbaraction } = useContext(TeacherContext);
  useEffect(() => {
    setTopbaraction((prev) => "Notes");
  }, []);

  return (
    <div className="h-full overflow-y-hidden flex-row items-center justify-center w-full ">
      <Read className="h-[67%] mt-8 mx-auto opacity-75" />
      <div className="w-full text-center mt-4">
        <h3 className=" text-3xl text-dark_color_2 font-[Fira-sans]">
          Ready to read? lets get started.
        </h3>
      </div>
    </div>
  );
}

export default Index;
