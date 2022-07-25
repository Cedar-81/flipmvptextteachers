import { useRouter } from "next/router";
import React, { useContext } from "react";
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
  } = useContext(TeacherContext);

  const { data, error, loading } = useQuery(Note, {
    variables: {
      authorId: teacherid,
      courseId: classcoursedata.courseId,
      classId: classcoursedata.classId,
      noteType: notetype,
    },
  });

  let val = "...";
  if (loading) {
    val = "...";
  }
  if (data) {
    console.log("data", data);
  }

  const notes = {
    personal: [
      "Trig unfinished",
      "Binomial Theorem research",
      "Questions for test",
    ],
    school: [
      "Trigonometry",
      "Binomial Theorem",
      "Arithemetic and Geometric Progression",
    ],
  };

  let selected_notes;

  if (notetype == "personal") {
    selected_notes = notes["personal"].map((val, index) => {
      return (
        <p
          key={index}
          onClick={() => read_note("1234")}
          className="text hover:text-accent_color text-xl cursor-pointer py-2"
        >
          {val}
        </p>
      );
    });
  } else if (notetype == "school") {
    selected_notes = notes["school"].map((val, index) => {
      return (
        <p
          key={index}
          onClick={() => read_note("1234")}
          className="text hover:text-accent_color text-xl cursor-pointer py-2"
        >
          {val}
        </p>
      );
    });
  }

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
    setSidebartype("");
    setCreate(false);
    router.push("/teacher/bookshelf/" + notetype + "/" + id);
  };
  return (
    <div className="notification w-[100vw] md:w-[20rem] md:h-[20rem] md:rounded-md items-center pt-8 h-full bg-main_color">
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
        <div className="items mx-3 mt-1 text-sm">{selected_notes}</div>
      </div>
    </div>
  );
}

export default Sidebar3;
