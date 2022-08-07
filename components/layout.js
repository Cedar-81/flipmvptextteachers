import React, { useContext, useEffect } from "react";
import Notifications from "./nav/minicomponents/notifications";
import Sidenav from "./nav/sidenav";
import Topnav from "./nav/topnav";
import { TeacherContext } from "./contexts/teachercontext";
import Class_course from "./nav/minicomponents/class_course";
import Sidenav2 from "./nav/minicomponents/sidenav2";
import Sidenav3 from "./nav/minicomponents/sidenav3";
import Sidebar from "./nav/minicomponents/sidebar";
import Sidebar2 from "./nav/minicomponents/sidebar2";
import Sidebar3 from "./nav/minicomponents/sidebar3";
import Newclass from "./nav/minicomponents/newclass";
import Note_deletor from "./bookshelf/minicomponents/note_deletor";
import Newcourse from "./nav/minicomponents/newcourse";
import Deleteclass from "./nav/minicomponents/deleteclass";
import Deletecourse from "./nav/minicomponents/deletecourse";
import Shareclass from "./nav/minicomponents/shareclass";
import Note_share from "./bookshelf/minicomponents/note_share";
import { AuthContext } from "./contexts/authcontext";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const Auth = gql`
  query Query {
    auth
  }
`;

function Layout({ children }) {
  const router = useRouter();
  const {
    notification,
    class_course,
    shelf2,
    shelf3,
    sidebar,
    sidebartype,
    classcoursedata,
    notedata,
    ccdaction,
    toggle_menu,
  } = useContext(TeacherContext);

  const { auth, setIsAuth, isAuth, authType, setAuth } =
    useContext(AuthContext);

  const { data, error, loading, refetch } = useQuery(Auth, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  refetch();

  useEffect(() => {
    if (data) {
      if (data && !router.pathname.includes("/auth")) {
        if (data.auth === "authorized") {
          setIsAuth(true);
          return;
        } else if (data.auth === "unauthorized") {
          setIsAuth(false);
          router.push("/auth/signin");
          return;
        }
      }
    }
  }, [data]);

  return (
    <div className="flex w-[100%] max-w-[100%] h-[100vh] ">
      {isAuth && (
        <div className="contents border-2">
          <div className="sidebar_displays md:none z-40 w-max top-0 h-full absolute bg-main_color">
            {sidebartype == "bar2" && <Sidebar2 />}
            {sidebartype == "bar3" && <Sidebar3 />}
            {sidebar && <Sidebar />}
          </div>
          <div className="md:flex hidden">
            <Sidenav />
            {shelf2 && <Sidenav2 />}
            {shelf3 && <Sidenav3 />}
          </div>
        </div>
      )}
      <div className="w-[100vw] md:w-[95%] overflow-y-hidden">
        {isAuth && <Topnav />}
        <div className=" h-full pb-4">
          {isAuth && (
            <>
              {notification && <Notifications />}
              {class_course && <Class_course />}
              {classcoursedata.action === "new_class" && <Newclass />}
              {classcoursedata.action === "new_course" && <Newcourse />}
              {ccdaction === "delete_class" && <Deleteclass />}
              {ccdaction === "delete_course" && <Deletecourse />}
              {ccdaction === "share_class" && <Shareclass />}
              {ccdaction === "share_note" && <Note_share />}
              {notedata.deleteNote && <Note_deletor />}
            </>
          )}
          <div className=" bg-accent_bkg_color relative h-full overflow-y-auto w-full md:static md:top-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
