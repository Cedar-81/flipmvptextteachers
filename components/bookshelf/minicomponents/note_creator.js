import React, { useContext, useEffect, useState } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [errMsg, setErrormsg] = useState("");
  const {
    notetitle,
    setNotetitle,
    setCreatetype,
    teacherid,
    classcoursedata,
    notetype,
    setCreatednoteid,
    setCreate,
    setShelf2,
    setShelf3,
    importnote,
    setImportnote,
    creatednoteid,
    setNotedata,
    setNotelink,
    noteLink,
    notedata,
  } = useContext(TeacherContext);

  useEffect(() => {
    setNotetitle("Untitled");
  }, []);

  useEffect(() => {
    if (notetitle.trim().length === 0) {
      setNotetitle("Untitled");
    }
  }, [notetitle]);

  const [addTeacherNote, { data, loading, error }] = useMutation(
    AddTeacherNote,
    {
      update(_, result) {
        setCreatednoteid(result.data.addTeacherNote.id);
        if (result.data.addTeacherNote.editableContent === "import") {
          setImportnote(true);
          setNotelink(result.data.addTeacherNote.content);
        }
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

  const create = () => {
    const inputVal = {
      authorId: teacherid,
      topic: notetitle,
      category: notetype,
      content: "",
      editableContent: "",
      classId: classcoursedata.classId,
      courseId: classcoursedata.courseId,
    };

    setCreatetype("editor");
    addTeacherNote({ variables: { input: inputVal } });
  };

  const importNote = async () => {
    if (noteLink.trim().length === 0) {
      setErrormsg("Please enter a valid link");
      setTimeout(() => {
        setErrormsg("");
      }, 5000);
    } else {
      setErrormsg("");
      const inputVal = {
        authorId: teacherid,
        topic: notetitle,
        category: notetype,
        content: noteLink,
        editableContent: "importedNote",
        classId: classcoursedata.classId,
        courseId: classcoursedata.courseId,
      };
      await addTeacherNote({ variables: { input: inputVal } });
      setNotedata({
        ...notedata,
        updateNote: false,
        updateContent: "",
        ready: false,
      });
      router.push("/teacher/bookshelf/" + notetype + "/" + creatednoteid);
    }
  };

  setShelf2(false);
  setShelf3(false);

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
        <p className="text-center text-accent_color mt-4 text-xs font-bold">
          {errMsg}
        </p>
        <input
          type={"text"}
          onKeyUp={(e) => (e.key === "Enter" ? create() : null)}
          onChange={(e) => setNotetitle(e.target.value)}
          className="w-full h-10 px-2 mt-[1rem] focus:shadow-lg focus:bg-main_color rounded-md outline-none"
          placeholder="Enter topic/title"
        />
        {importnote && (
          <input
            type={"text"}
            onChange={(e) => setNotelink(e.target.value)}
            className="w-full h-10 px-2 mt-[0.5rem] focus:shadow-lg focus:bg-main_color rounded-md outline-none"
            placeholder="Enter google docs link"
          />
        )}
        <div className="w-full flex justify-end mt-4">
          <button
            onClick={() => {
              setImportnote(!importnote);
            }}
            className=" bg-main_color border-2 border-accent_color  cursor-pointer hover:shadow-md text-accent_color mr-4 px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            {!importnote ? "Import" : "Cancel"}
          </button>
          <button
            onClick={() => {
              if (importnote) importNote();
              if (!importnote) create();
            }}
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
