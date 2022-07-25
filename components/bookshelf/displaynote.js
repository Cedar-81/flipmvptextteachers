import React, { useContext } from "react";
import { TeacherContext } from "../contexts/teachercontext";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import Bookshelfeditbutton from "./minicomponents/bookshelfeditbutton";
import Editor from "./minicomponents/editor";

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

function Displaynote() {
  const { savenote, setCreate, creatednoteid, notedata, setNotedata } =
    useContext(TeacherContext);

  console.log(creatednoteid);
  const { data, error, loading } = useQuery(Note, {
    variables: {
      noteId: creatednoteid,
    },
  });

  let val = "...";
  if (loading) {
    val = "...";
  }
  if (error) {
    console.log(JSON.stringify(error, null, 2));
  }
  if (data) {
    val = data.note;
  }

  if (!notedata.updateNote) setCreate(false);

  function save_note_update() {
    setNotedata({
      ...notedata,
      updateNote: false,
      updateContent: "",
      ready: false,
    });
  }

  return (
    <>
      {!notedata.updateNote && (
        <>
          <div className="note_container mt-[6%] m-2 w-[8.5in] mx-auto bg-accent_bkg_color shadow-xl rounded-xl p-4 min-h-full">
            <p className="date text-sm text-accent_color font-medium">
              {moment(val?.updatedAt).format("LL")}
            </p>
            <div className="content mt-4">
              <h2 className="note_heading text-2xl font-medium">
                {val?.topic}
              </h2>
              <div
                className="note_content mt-5"
                dangerouslySetInnerHTML={{ __html: val?.content }}
              ></div>
            </div>
          </div>
          <Bookshelfeditbutton />
          <div className="h-[6rem]"></div>
        </>
      )}
      {notedata.updateNote && <Editor />}
      {notedata.updateNote && (
        <button
          onClick={save_note_update}
          className="fixed right-9 bottom-8 w-[6rem] h-[2.5rem] rounded-md bg-accent_color text-main_color cursor-pointer border-2"
        >
          Done
        </button>
      )}
    </>
  );
}

export default Displaynote;
