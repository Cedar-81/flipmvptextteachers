import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TeacherContext } from "../../contexts/teachercontext";

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

function Bookshelfeditbutton() {
  const {
    bookshelfbuttons,
    setBookshelfbuttons,
    setNotedata,
    notedata,
    setNotetitle,
  } = useContext(TeacherContext);
  const router = useRouter();

  const { data, error, loading } = useQuery(Note, {
    variables: {
      noteId: router.query.id,
    },
  });

  const delete_note = () => {
    return setNotedata({
      ...notedata,
      deleteNote: true,
      deleteNoteId: router.query.id,
    });
  };

  const find_note = () => {
    let val = "...";
    if (loading) {
      val = "...";
    }
    if (error) {
      console.log(JSON.stringify(error, null, 2));
    }
    if (data) {
      return data.note;
    }
  };

  const styles = {
    bookshelfeditbutton_container:
      " flex flex-col-reverse absolute right-7 bottom-7 ",
    editbuttontoggler_container:
      "bg-main_color cursor-pointer shadow-main p-3 w-max rounded-full mb-3",
    icon: "w-[25px] h-[25px] rounded-full text-accent_color  ",
    editcomponents: "",
  };

  const edit_note = () => {
    console.log(router.query.id);
    console.log("its me");
    const note = find_note(router.query.id);
    setNotetitle(note.topic);
    setNotedata({
      ...notedata,
      updateNote: true,
      updateContent: note.content,
    });
  };

  return (
    <div className="fixed bottom-5 right-4 flex flex-col-reverse">
      <div
        onClick={() =>
          setBookshelfbuttons({
            ...bookshelfbuttons,
            toggle_components: !bookshelfbuttons.toggle_components,
          })
        }
        className="bg-main_color h-[3rem] flex items-center justify-center rounded-full shadow-md cursor-pointer w-[3rem]"
      >
        <span className="material-icons text-accent_color">more_horiz</span>
      </div>

      {bookshelfbuttons.toggle_components && (
        <div className={`editcomponents ${styles.editcomponents} `}>
          <div
            className="bg-main_color h-[3rem] flex items-center justify-center rounded-full shadow-md cursor-pointer w-[3rem] mb-4"
            onClick={edit_note}
          >
            <span className="material-icons text-accent_color">edit</span>
          </div>
          <div className="bg-main_color h-[3rem] flex items-center justify-center rounded-full shadow-md cursor-pointer w-[3rem] mb-4">
            <span className="material-icons text-accent_color">share</span>
          </div>
          <div
            onClick={delete_note}
            className="bg-main_color h-[3rem] flex items-center justify-center rounded-full shadow-md cursor-pointer w-[3rem] mb-4"
          >
            <span className="material-icons text-accent_color">delete</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookshelfeditbutton;
