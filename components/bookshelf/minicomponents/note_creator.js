import React, { useContext } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useMutation } from "@apollo/client";

const AddTeacherNote = gql`
  mutation AddTeacherNote($input: addTeacherNoteInput) {
    addTeacherNote(input: $input) {
      id
    }
  }
`;

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

function Note_creator() {
  const {
    notetitle,
    setNotetitle,
    setCreatetype,
    teacherid,
    classcoursedata,
    notetype,
    setCreatednoteid,
    setCreate,
  } = useContext(TeacherContext);

  const [addTeacherNote, { data, loading, error }] = useMutation(
    AddTeacherNote,
    {
      update(_, result) {
        setCreatednoteid(result.data.addTeacherNote.id);
      },
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
    }
  );

  if (loading) console.log("Creating...");
  if (error) console.log(error);

  const inputVal = {
    authorId: teacherid,
    topic: notetitle,
    category: notetype,
    content: "",
    editableContent: "",
    classId: [classcoursedata.classId],
    courseId: classcoursedata.courseId,
  };

  const create = () => {
    console.log("here again");
    setCreatetype("editor");
    addTeacherNote({ variables: { input: inputVal } });
    console.log("data", data);
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-50 bg-dark_color">
      <div className="w-[20rem] relative min-h-[11rem] h-max mt-[13%] bg-accent_bkg_color pt-[1rem] rounded-lg shadow-lg px-[1rem] mx-auto my-auto ">
        <div
          onClick={() => {
            setCreate(false);
            setCreatetype("");
          }}
          className="cancel absolute right-5 cursor-pointer"
        >
          <span className="material-icons text-accent_color text-base">
            close
          </span>
        </div>
        <p className="text-xl text-center mx-auto max-w-full overflow-hidden">
          {notetitle}
        </p>
        <input
          type={"text"}
          onChange={(e) => setNotetitle(e.target.value)}
          className="w-full h-10 px-2 mt-[1.2rem] focus:shadow-lg focus:bg-main_color rounded-md outline-none"
          placeholder="Enter topic/title"
        />
        <div className="w-full flex justify-end">
          <button
            onClick={() => create()}
            className="bg-accent_color cursor-pointer hover:shadow-md text-main_color px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note_creator;
