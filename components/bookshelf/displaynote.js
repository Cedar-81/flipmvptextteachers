import React, { useContext, useEffect } from "react";
import { TeacherContext } from "../contexts/teachercontext";
import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import Bookshelfeditbutton from "./minicomponents/bookshelfeditbutton";
import Editor from "./minicomponents/editor";
import { useRouter } from "next/router";

const Note = gql`
  query Note($noteId: ID!) {
    note(id: $noteId) {
      id
      topic
      content
      editableContent
      updatedAt
      authorId
      available
    }
  }
`;

function Displaynote() {
  const {
    savenote,
    setCreate,
    creatednoteid,
    notedata,
    notetype,
    setNotedata,
    setUpdatenotechecker,
    classcoursedata,
  } = useContext(TeacherContext);

  const { data, error, loading } = useQuery(Note, {
    variables: {
      noteId: creatednoteid,
    },
  });

  const router = useRouter();

  useEffect(() => {
    if ((classcoursedata.classId === "", classcoursedata.courseId === "")) {
      router.push("/teacher/bookshelf");
    }
  }, []);

  let val = {
    topic: "...",
    content: "loading...",
  };
  if (loading) {
    val = {
      topic: "...",
      content: "loading...",
    };
  }

  if (data) {
    val = data.note;
  }

  if (!notedata.updateNote) setCreate(false);

  return (
    <>
      {!notedata.updateNote && (
        <>
          <div className="note_container m-2 w-[8.5in] mx-auto bg-accent_bkg_color shadow-xl rounded-xl p-4 min-h-full">
            <p className="date text-sm text-accent_color font-medium">
              {moment(new Date(+val?.updatedAt)).format("LL")}
            </p>
            {notetype === "school" && (
              <p className="date text-sm mt-1 text-accent_color font-medium">
                Status:{" "}
                <span className="font-bold">
                  {val?.available ? "Shared" : "Unshared"}
                </span>
              </p>
            )}
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
    </>
  );
}

export default Displaynote;
