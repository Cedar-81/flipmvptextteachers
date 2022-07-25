import React, { useContext, useEffect } from "react";
import Note_creator from "../../../../components/bookshelf/minicomponents/note_creator";
import { TeacherContext } from "../../../../components/contexts/teachercontext";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("../../../../components/bookshelf/minicomponents/editor"),
  {
    ssr: false,
  }
);

function New() {
  const { setNotetype, createtype } = useContext(TeacherContext);

  useEffect(() => {
    setNotetype("school");
  }, []);

  return (
    <div>
      {createtype === "untitled" && <Note_creator />}
      {createtype === "editor" && <Editor />}
    </div>
  );
}

export default New;
