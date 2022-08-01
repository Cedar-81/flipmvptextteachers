import React, { useContext } from "react";
import { useCallback, useEffect, useState } from "react";
import "quill/dist/quill.bubble.css";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const load_quill = () => {
  if (typeof document !== "undefined") {
    const Quill = require("quill");
    return Quill;
  }
};

const UpdateTeacherNote = gql`
  mutation UpdateTeacherNote($input: updateTeacherNoteInput) {
    updateTeacherNote(input: $input) {
      id
      topic
    }
  }
`;

const useInterval = (callback, delay) => {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Note = gql`
  query Note($noteId: ID!) {
    note(id: $noteId) {
      id
      topic
      content
      editableContent
      updatedAt
      authorId
    }
  }
`;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  ["image", "blockquote", "code-block", "link", "video"],
  ["clean"],
];

const SAVE_INTERVAL_MS = 5000;

function Editor({ edit_content }) {
  const router = useRouter();
  const {
    setNotecontent,
    setEditablecontent,
    setCreate,
    notecontent,
    notetitle,
    creatednoteid,
    editablecontent,
    notetype,
    teacherid,
    classcoursedata,
    notedata,
    setNotedata,
    setSavenote,
    savenote,
    updatenotechecker,
    setUpdatenotechecker,
  } = useContext(TeacherContext);
  const [quill, setQuill] = useState();
  const [ready, setReady] = useState(false);
  const [textchange, setTextChange] = useState("");

  useEffect(() => setCreate(true));

  useEffect(() => {
    if (classcoursedata.courseId === "" || classcoursedata.classId === "") {
      router.push("/teacher/bookshelf");
    }
  }, []);

  const [updateTeacherNote, { data, loading, error }] = useMutation(
    UpdateTeacherNote,
    {
      refetchQueries: [
        { query: Note, variables: { noteId: creatednoteid } },
        "Note",
      ],
    }
  );

  if (error) console.log(JSON.stringify(error, null, 2));

  const inputVal = {
    id: creatednoteid,
    authorId: teacherid,
    topic: notetitle,
    category: notetype,
    content: notecontent,
    editableContent: JSON.stringify(editablecontent),
    classId: classcoursedata.classId,
    courseId: classcoursedata.courseId,
  };

  const save_note = async () => {
    setSavenote(true);
    setTextChange("Saving...Just a moment");
    await updateTeacherNote({ variables: { input: inputVal } });
    setSavenote(false);
    setUpdatenotechecker(false);
    setNotedata({
      ...notedata,
      updateNote: false,
      updateContent: "",
      ready: false,
    });
    router.push("/teacher/bookshelf/" + notetype + "/" + creatednoteid);
  };

  useEffect(() => {
    if (updatenotechecker) {
      save_note();
    }
  }, []);

  useEffect(() => {
    if (quill !== undefined && notedata.updateNote) {
      quill.root.innerHTML = notedata.updateContent;
      quill.enable();
    }
  }, [notedata.ready, quill]);

  if (quill !== undefined) {
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source == "user") {
        setEditablecontent(quill.getContents());
        setNotecontent(quill.root.innerHTML);
      }
    });
    if (notedata.ready === false) {
      setNotedata({
        ...notedata,
        ready: true,
      });
    }
  }

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    if (typeof document !== "undefined") {
      let Quill = load_quill();
      const q = new Quill(editor, {
        theme: "bubble",
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      setQuill(q);
      if (notedata.updateNote) {
        q.disable();
        q.setText("Loading...");
      }
    }
  }, []);

  return (
    <>
      {savenote && (
        <div className="w-full flex items-center justify-center border-2">
          <p className="fixed py-2 text-xs z-[55] px-4 text-center mx-auto shadow-lg bg-accent_color text-main_color top-[17%]">
            {textchange}
          </p>
        </div>
      )}
      <div className="container" ref={wrapperRef}></div>

      <button
        onClick={save_note}
        className="fixed right-9 bottom-8 w-[6rem] h-[2.5rem] z-[60] rounded-md bg-accent_color text-main_color cursor-pointer border-2"
      >
        Done
      </button>
    </>
  );
}

export default Editor;
