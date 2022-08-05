import React, { createContext, useState } from "react";

const AuthContext = createContext();

function Authcontextprovider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [auth, setAuth] = useState(false);
  const [authType, setAuthType] = useState("");
  const [teacherinfo, setTeacherinfo] = useState({
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

  const value = {
    teacherinfo,
    setTeacherinfo,
    isAuth,
    setIsAuth,
    authType,
    setAuthType,
    setAuth,
    auth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { Authcontextprovider, AuthContext };
