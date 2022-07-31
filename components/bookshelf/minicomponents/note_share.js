import React, { useContext, useState } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const Notes = gql`
  query Notes(
    $authorId: ID!
    $courseId: ID!
    $classId: ID!
    $noteType: String!
  ) {
    notes(
      authorId: $authorId
      courseId: $courseId
      classId: $classId
      noteType: $noteType
    ) {
      id
      topic
    }
  }
`;

const ShareNote = gql`
  mutation ShareNote($input: shareNoteInput) {
    shareNote(input: $input)
  }
`;

function Note_share() {
  const {
    setCreatetype,
    teacherid,
    classcoursedata,
    notetype,
    setCreate,
    notedata,
    setNotedata,
    setCcdaction,
  } = useContext(TeacherContext);

  const [btn_txt, setBtn_txt] = useState("Share");

  const router = useRouter();

  const [shareNote, { data, loading, error }] = useMutation(ShareNote, {
    refetchQueries: [
      {
        query: Notes,
        variables: {
          authorId: teacherid,
          courseId: classcoursedata.courseId,
          classId: classcoursedata.classId,
          noteType: notetype,
        },
      },
      "Notes",
    ],
  });

  if (loading) console.log("Creating...");
  if (error) console.log("error", JSON.stringify(error, null, 2));

  const inputVal = {
    id: router.query.id,
    available: true,
  };

  const share_note = async () => {
    setBtn_txt("Sharing");
    await shareNote({ variables: { input: inputVal } });
    setBtn_txt("Shared");
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-50 bg-dark_color">
      <div className="w-[20rem] relative min-h-[11rem] h-max mt-[13%] bg-accent_bkg_color pt-[1rem] rounded-lg shadow-lg px-[1rem] mx-auto my-auto ">
        <div
          onClick={() => {
            setCcdaction("");
          }}
          className="cancel absolute right-5 cursor-pointer"
        >
          <span className="material-icons text-accent_color text-base">
            close
          </span>
        </div>
        <p className="text-xl text-center mx-auto font-medium max-w-full text-accent_color overflow-hidden">
          Share Alert!!!
        </p>
        <p className="text-sm text-left mt-3">
          By default school notes are private, by clicking the share button it
          becomes available to students in this class
        </p>
        <div className="w-full flex justify-end">
          <button
            onClick={() => share_note()}
            className="bg-accent_color cursor-pointer hover:shadow-md text-main_color px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            {btn_txt}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note_share;
