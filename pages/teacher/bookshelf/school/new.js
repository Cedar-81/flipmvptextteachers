import React, { useContext, useEffect } from "react";
import Note_creator from "../../../../components/bookshelf/minicomponents/note_creator";
import { TeacherContext } from "../../../../components/contexts/teachercontext";
import Editor from "../../../../components/bookshelf/minicomponents/editor";

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
