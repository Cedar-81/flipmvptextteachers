import React, { useContext, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../contexts/authcontext";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

const createTeacher = gql`
  mutation CreateTeacher($input: createTeacherInput) {
    createTeacher(input: $input)
  }
`;

function Signup() {
  const styles = {
    input:
      "flex h-[3rem] text-lg font-medium rounded-md focus:shadow-lg focus:bg-main_color focus:focus:border-accent_color text-dark_color bg-accent_bkg_color py-1 my-4 w-full md:w-[47%] pl-3 outline-none",
  };

  const router = useRouter();
  const { setTeacherinfo, teacherinfo, setIsAuth } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [btntxt, setBtntxt] = useState("Sign Up");

  const get_teacher_info = (e) => {
    setTeacherinfo({ ...teacherinfo, [e.target.name]: e.target.value });
  };

  setIsAuth(false);

  const [createteacherprofile, { data, loading, error }] = useMutation(
    createTeacher,
    {
      update(_, result) {
        console.log(result);
      },
    }
  );

  if (loading) console.log("Updating...");
  if (error) console.log(JSON.stringify(error, null, 2));

  const checker = () => {
    const {
      firstname,
      lastname,
      address,
      email,
      tel,
      country,
      state,
      postal_code,
      new_password,
      confirm_password,
    } = teacherinfo;
    if (
      firstname.trim().length == 0 ||
      lastname.trim().length == 0 ||
      address.trim().length == 0 ||
      email.trim().length == 0 ||
      tel.trim().length == 0 ||
      country.trim().length == 0 ||
      state.trim().length == 0 ||
      postal_code.trim().length == 0 ||
      new_password.trim().length == 0 ||
      confirm_password.trim().length == 0
    ) {
      setErrorMsg("*All fields must be filled");
      return "failed";
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      setErrorMsg("*Please enter a valid email");
      return "failed";
    } else if (
      new_password.length > 6 == false ||
      /[0-9]/.test(new_password) == false
    ) {
      setErrorMsg(
        "*Password must be longer that 6 characters and must contain at least one number"
      );
      return "failed";
    } else if (new_password.trim() !== confirm_password.trim()) {
      setErrorMsg("*Passwords don't match. Please re-enter them");
      return "failed";
    } else {
      setErrorMsg(" ");
      signup();
      return "passed";
    }
  };

  const signup = async () => {
    const inputVal = {
      firstName: teacherinfo.firstname,
      lastName: teacherinfo.lastname,
      address: teacherinfo.address,
      state: teacherinfo.state,
      country: teacherinfo.country,
      postalCode: teacherinfo.postal_code,
      email: teacherinfo.email,
      image: teacherinfo.image,
      phoneNo: teacherinfo.tel,
      password: teacherinfo.new_password,
    };
    setErrorMsg("...Creating Profile. Please wait.");
    setBtntxt("...Creating");
    const create = await createteacherprofile({
      variables: { input: inputVal },
    });
    if (create.data.createTeacher === "Duplicate Email") {
      return (
        setErrorMsg(
          "Email already exists, please try a new one or login to existing account"
        ),
        setBtntxt("Sign Up")
      );
    }
    if (create.data.createTeacher === "Server Error") {
      return setErrorMsg("Server Error"), setBtntxt("Sign Up");
    }

    setErrorMsg("New Profile Created Successfully");
    setBtntxt("Created");
    router.push(`/auth/verification/${create.data.createTeacher}`);

    setTimeout(() => {
      setErrorMsg("");
      setBtntxt("Sign Up");
    }, 5000);

    setTeacherinfo({
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
  };

  return (
    <div className="w-full fixed overflow-y-auto h-[100vh] min-h-[100vh] md:h-[100vh] flex bg-main_color p-4">
      <div className="hidden md:flex flex-col w-[30%] relative px-7 h-full bg-cover blur-xs bg-no-repeat bg-center bg-[url(/assets/signup.png)] rounded-xl text-main_color bg-accent_color">
        <div className="overlay absolute rounded-xl opacity-80 mix-blend-multiply bg-blend-multiply top-0 left-0 w-full h-full bg-accent_color"></div>
        <div className="mt-[20%] relative z-10 px-2">
          <Image src="/assets/logolight.png" width={67} height={28} />
        </div>
        <h1 className="ctatxt relative z-10 text-3xl w-[80%] mt-[20%] ">
          Start your journey with us.
        </h1>
        <p className="text-md relative z-10 w-[80%] text-[#f7f7f7] mt-[1rem]">
          {`Learning is and should always be fun, so buckle up cause you're in for
          a ride`}
        </p>
      </div>
      <div className="px-[5%] pt-[3%] w-full md:w-[70%]">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <p className="text-sm mt-2 font-medium">
          Have an account already?{" "}
          <span
            onClick={() => router.push("/auth/signin")}
            className="text-accent_color cursor-pointer font-semibold"
          >
            Sign in
          </span>
        </p>
        <p className="errormsg text-accent_color font-extrabold">{errorMsg}</p>
        <div className="name flex flex-wrap justify-between mt-5 w-full">
          <input
            onChange={get_teacher_info}
            className={`input ${styles.input}`}
            type="text"
            name="firstname"
            value={teacherinfo?.firstname}
            placeholder="Firstname*"
          />
          <input
            onChange={get_teacher_info}
            className={`input ${styles.input}`}
            type="text"
            name="lastname"
            value={teacherinfo?.lastname}
            placeholder="Lastname*"
          />
        </div>
        <div className="contact flex flex-wrap justify-between w-full">
          <input
            onChange={get_teacher_info}
            className={`input ${styles.input}`}
            onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
            type="email"
            name="email"
            value={teacherinfo?.email}
            placeholder="Email*"
          />
          <input
            onChange={get_teacher_info}
            className={`input ${styles.input}`}
            onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
            type="tel"
            name="tel"
            value={teacherinfo?.tel}
            placeholder="Phone no*"
          />
        </div>
        <div className="address">
          <div className=" flex flex-wrap justify-between w-full">
            <input
              onChange={get_teacher_info}
              className={`input ${styles.input}`}
              onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
              type="text"
              name="address"
              value={teacherinfo?.address}
              placeholder="Address*"
            />
            <input
              onChange={get_teacher_info}
              className={`input ${styles.input}`}
              onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
              type="number"
              name="postal_code"
              value={teacherinfo?.postal_code}
              placeholder="Postal Code*"
            />
          </div>
          <div className=" flex flex-wrap justify-between w-full">
            <input
              onChange={get_teacher_info}
              className={`input ${styles.input}`}
              onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
              type="text"
              name="country"
              value={teacherinfo?.country}
              placeholder="Country*"
            />
            <input
              onChange={get_teacher_info}
              className={`input ${styles.input}`}
              onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
              type="text"
              name="state"
              value={teacherinfo?.state}
              placeholder="State*"
            />
          </div>
        </div>
        <div className="password flex flex-wrap justify-between w-full">
          <input
            onChange={get_teacher_info}
            className={`input ${styles.input}`}
            onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
            type="password"
            name="new_password"
            value={teacherinfo?.new_password}
            placeholder="New Password*"
          />
          <input
            onChange={get_teacher_info}
            className={`input ${styles.input}`}
            onKeyUp={(e) => (e.key === "Enter" ? checker() : null)}
            type="password"
            name="confirm_password"
            value={teacherinfo?.confirm_password}
            placeholder="Confirm Password*"
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={() => checker()}
            className="bg-accent_color h-[2.5rem] w-[7rem] cursor-pointer hover:shadow-md text-main_color px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            {btntxt}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
