import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import { TeacherContext } from "../../contexts/teachercontext";
import { gql, useQuery } from "@apollo/client";

const Note = gql`
  query Notes($authorId: ID!, $courseId: ID!, $classId: ID!) {
    notes(authorId: $authorId, courseId: $courseId, classId: $classId) {
      id
      topic
    }
  }
`;

function Sidebar3() {
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
    <div className="notification fixed w-[100vw] md:w-[20rem] md:h-[20rem] md:rounded-md items-center pt-8 h-full bg-main_color">
      <div className="flex mt-4 md:mt-0 md:hidden">
        <div
          onClick={() => setSidebartype("bar2")}
          className="icon_con rounded-full h-10 w-10 cursor-pointer flex justify-center items-center"
        >
          <span className="material-symbols-outlined text-md">
            arrow_back_ios_new
          </span>
        </div>
        <h2 className="notification_text ml-2 capitalize text-3xl text-accent_color font-semibold">
          {notetype} Notes
        </h2>
      </div>

      <div className="notification_con w-full pl-4">
        <div
          onClick={() => {
            new_note();
          }}
          className="new_con flex text-sm items-center py-2 px-2 mt-11 cursor-pointer hover:text-accent_color"
        >
          <span className="material-icons text-accent_color">edit</span>
          <p className="text ml-3 text-xl font-semibold">Create</p>
        </div>
        {notetype == "personal" && (
          <h3 className="text-lg font-semibold mt-5 ml-2 text-accent_color">
            NOTES
          </h3>
        )}
        {notetype == "school" && (
          <h3 className="text-lg font-semibold mt-5 ml-2 text-accent_color">
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
        {(classcoursedata.classId === "" ||
          classcoursedata.courseId === "") && (
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
    </div>
  );
}

export default Sidebar3;
