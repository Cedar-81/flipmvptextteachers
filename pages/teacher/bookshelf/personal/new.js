import React, { useContext, useEffect } from "react";
import Editor from "../../../../components/bookshelf/minicomponents/editor";
import { TeacherContext } from "../../../../components/contexts/teachercontext";
import Note_creator from "../../../../components/bookshelf/minicomponents/note_creator";

function New() {
  const { setNotetype, createtype } = useContext(TeacherContext);

  useEffect(() => {
    setNotetype("personal");
  }, []);

  return (
    <div>
      {createtype === "untitled" && <Note_creator />}
      {createtype === "editor" && <Editor />}
    </div>
  );
}

export default New;
