import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useQuery } from "@apollo/client";

const Note = gql`
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

function Sidenav3() {
  const router = useRouter();
  const {
    setShelf3,
    notetype,
    setCreate,
    setSidebartype,
    setCreatetype,
    teacherid,
    classcoursedata,
    setCreatednoteid,
    setClass_course,
  } = useContext(TeacherContext);

  // let notes = [];

  const [notes, setNotes] = useState([]);

  const { data, error, loading } = useQuery(Note, {
    variables: {
      authorId: teacherid,
      courseId: classcoursedata.courseId,
      classId: classcoursedata.classId,
      noteType: notetype,
    },
  });

  useEffect(() => {
    if (classcoursedata.classId === "" || classcoursedata.courseId === "") {
      setNotes([
        {
          id: "123",
          topic:
            "Please select a class and course to create or display its contents.",
        },
      ]);
    } else {
      if (loading) {
        setNotes([{ topic: "...", id: "..." }]);
      }
      if (error) {
        console.log(JSON.stringify(error, null, 2));
      }
      if (data && data.notes.length > 0) {
        setNotes(data.notes);
        console.log("data", data.notes);
      } else if (data && data.notes.length <= 0) {
        setNotes([
          {
            id: "123",
            topic:
              "Uhh... you dont have any note here, why dont you create one.",
          },
        ]);
      }
    }
  }, [data]);

  let selected_notes;

  selected_notes = notes.map((val, index) => {
    return (
      <p
        key={index}
        onClick={() => read_note(val.id)}
        className="text hover:text-accent_color cursor-pointer py-2"
      >
        {val.topic}
      </p>
    );
  });

  const new_note = () => {
    setSidebartype("");
    setCreate(true);
    setCreatetype("untitled");
    if (notetype == "school")
      return router.push("/teacher/bookshelf/school/new");
    if (notetype == "personal")
      return router.push("/teacher/bookshelf/personal/new");
  };

  const read_note = (id) => {
    setCreate(false);
    if (
      classcoursedata.classId !== "" &&
      classcoursedata.courseId !== "" &&
      data &&
      data.notes &&
      data.notes.length === 0
    )
      return new_note();
    if (classcoursedata.classId !== "" && classcoursedata.courseId !== "") {
      setCreatednoteid(id);
      router.push("/teacher/bookshelf/" + notetype + "/" + id);
    } else {
      setClass_course(true);
    }
  };

  return (
    <div className="w-[15%]  overflow-y-auto fixed ml-[20%] z-[61] h-[100%] bg-main_color shadow-lg">
      <div
        onClick={() => setShelf3(false)}
        className="icon_con bg-main_color mt-4 w-full sticky top-1 cursor-pointer text-right"
      >
        <span className="material-icons text-sm text-accent_color">
          arrow_back_ios
        </span>
      </div>
      {classcoursedata.classId !== "" && classcoursedata.courseId !== "" && (
        <div
          onClick={() => {
            new_note();
          }}
          className="new_con flex sticky bg-main_color top-5 text-sm items-center py-2 px-2 mt-11 cursor-pointer hover:text-accent_color"
        >
          <span className="material-icons text-accent_color">edit</span>
          <p className="text ml-3 font-semibold">Create</p>
        </div>
      )}
      {notetype == "personal" && (
        <h3 className="text-xs font-semibold mt-5 ml-2 text-accent_color">
          NOTES
        </h3>
      )}
      {notetype == "school" && (
        <h3 className="text-xs font-semibold mt-5 ml-2 text-accent_color">
          TOPICS
        </h3>
      )}
      {classcoursedata.classId !== "" && classcoursedata.courseId !== "" && (
        <>
          {data && data.notes && data.notes.length === 0 && (
            <div className="items mx-3 mt-1 h-[50%] text-xs flex items-center text-accent_bkg_dark_color text-center">
              <div className="flex-row">
                <span className="material-icons text-6xl font-semibold text-accent_bkg_dark_color">
                  sentiment_very_dissatisfied
                </span>
                {selected_notes}
              </div>
            </div>
          )}
          {data && data.notes.length > 0 && (
            <div className="items mx-3 mt-1 text-sm">{selected_notes}</div>
          )}
        </>
      )}
      {(classcoursedata.classId === "" || classcoursedata.courseId === "") && (
        <div className="items mx-3 mt-1 h-[70%] text-xs flex items-center text-accent_bkg_dark_color text-center">
          <div className="flex-row">
            <span className="material-icons text-6xl font-semibold text-accent_bkg_dark_color">
              hourglass_empty
            </span>
            {selected_notes}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidenav3;
