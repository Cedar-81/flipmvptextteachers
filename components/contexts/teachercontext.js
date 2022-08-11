import React, { createContext, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

const TeacherContext = createContext();

function Teachercontextprovider({ children }) {
  const [notification, setNotification] = useState(false);
  const [class_course, setClass_course] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [topbaraction, setTopbaraction] = useState("Welcome");
  const [sidebarcon, setSidebarcon] = useState(false);
  const [sidebartype, setSidebartype] = useState("");
  const [shelf2, setShelf2] = useState(false);
  const [shelf3, setShelf3] = useState(false);
  const [noteLink, setNotelink] = useState("");
  const [updatenotechecker, setUpdatenotechecker] = useState(false);
  const [bookshelfbuttons, setBookshelfbuttons] = useState({
    toggle_components: true,
    show_editor: false,
  });
  const [classcoursedata, setClasscoursedata] = useState({
    classId: "",
    courseId: "",
    action: "",
    className: "",
    courseName: "",
    working: false,
    workingText: "",
    classCode: "",
  });
  const [ccdaction, setCcdaction] = useState("");
  const [notedata, setNotedata] = useState({
    updateNote: false,
    updateContent: "",
    ready: false,
    deleteNoteId: "",
    deleteNote: false,
  });
  const [createtype, setCreatetype] = useState("");
  const [notetype, setNotetype] = useState("");
  const [create, setCreate] = useState(false);
  const [notecontent, setNotecontent] = useState("");
  const [notetitle, setNotetitle] = useState("Untitled");
  const [editablecontent, setEditablecontent] = useState("");
  const [creatednoteid, setCreatednoteid] = useState("");
  const [importnote, setImportnote] = useState(false);
  const [savenote, setSavenote] = useState(false);
  const [action, setAction] = useState("Class");
  const [teachername, setTeachername] = useState("");
  const [teacherid, setTeacherid] = useState("cl60fwtlx0056dckskcuwnjey");
  const [teacherprofile, setTeacherprofile] = useState({
    firstname: "",
    lastname: "",
    address: "",
    email: "",
    tel: "",
    country: "",
    state: "",
    image: "",
    postal_code: "",
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  function toggle_notification() {
    setClass_course(false);
    setSidebar(false);
    setNotification(!notification);
  }

  function toggle_class_course() {
    setNotification(false);
    setSidebar(false);
    setClass_course(!class_course);
  }

  function toggle_menu() {
    setSidebarcon(!sidebarcon);
    setSidebar(!sidebar);
    setNotification(false);
    setClass_course(false);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      let data = window.localStorage.getItem("FLIP_CLASSROOM_STATE_TEACHER");
      if (data !== null) {
        data = JSON.parse(data);
        setClasscoursedata({
          ...class_course,
          classId: data.classId,
          courseId: data.courseId,
          action: data.action,
          className: data.className,
          courseName: data.courseName,
        });
      }
    }
  }, []);

  useEffect(() => {
    let values = {
      classId: "",
      courseId: "",
      action: "",
      className: "",
      courseName: "",
    };
    if (typeof window != "undefined") {
      values.classId = classcoursedata.classId;
      values.courseId = classcoursedata.courseId;
      values.action = classcoursedata.action;
      values.className = classcoursedata.className;
      values.courseName = classcoursedata.courseName;
      return window.localStorage.setItem(
        "FLIP_CLASSROOM_STATE_TEACHER",
        JSON.stringify(values)
      );
    }
  }, [classcoursedata]);

  const value = {
    notification,
    toggle_notification,
    class_course,
    toggle_class_course,
    sidebar,
    toggle_menu,
    shelf2,
    shelf3,
    setShelf2,
    setShelf3,
    notetype,
    setNotetype,
    create,
    setCreate,
    notecontent,
    setNotecontent,
    editablecontent,
    setEditablecontent,
    setNotelink,
    noteLink,
    savenote,
    setSavenote,
    notetitle,
    setNotetitle,
    sidebartype,
    setSidebartype,
    topbaraction,
    setTopbaraction,
    teacherprofile,
    setTeacherprofile,
    classcoursedata,
    setClasscoursedata,
    setClass_course,
    teacherid,
    setTeacherid,
    createtype,
    setCreatetype,
    creatednoteid,
    setCreatednoteid,
    bookshelfbuttons,
    setBookshelfbuttons,
    notedata,
    setNotedata,
    updatenotechecker,
    setUpdatenotechecker,
    action,
    setAction,
    ccdaction,
    setCcdaction,
    teachername,
    setTeachername,
    importnote,
    setImportnote,
  };

  return (
    <TeacherContext.Provider value={value}>{children}</TeacherContext.Provider>
  );
}

export { Teachercontextprovider, TeacherContext };
