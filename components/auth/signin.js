import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { AuthContext } from "../contexts/authcontext";
import { useRouter } from "next/router";
import { gql, useMutation } from "@apollo/client";

const loginTeacher = gql`
  mutation SignIn($input: signInInput) {
    signIn(input: $input)
  }
`;

function Signin() {
  const styles = {
    input:
      "flex h-[3rem] text-lg font-medium rounded-md focus:shadow-lg focus:bg-main_color focus:focus:border-accent_color text-dark_color bg-accent_bkg_color py-1 my-4 w-full md:w-[70%] pl-3 outline-none",
  };

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [unverified, setUnverified] = useState(false);

  const router = useRouter();

  const { setIsAuth, isAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isAuth) {
      router.push("/student/bookshelf");
    }
  }, []);

  const [login_teacher, { data, loading, error }] = useMutation(loginTeacher);
  const [btntxt, setBtntxt] = useState("Sign In");
  const [err_msg, setErrorMsg] = useState("");

  const checker = () => {
    if (email.trim().length == 0 || password.trim().length == 0) {
      setErrorMsg("*All fields must be filled");
      return "failed";
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      setErrorMsg("*Please enter a valid email");
      return "failed";
    } else {
      setErrorMsg(" ");
      signin();

      return "passed";
    }
  };

  const signin = async () => {
    console.log(process.env.NEXT_PUBLIC_JWT_COOKIE_TOKEN);
    const inputVal = {
      email,
      password,
    };
    setErrorMsg("...Signing In. Please wait.");
    setBtntxt("...Checking");
    const login = await login_teacher({
      variables: { input: inputVal },
    });

    if (login.data.signIn === "Failed") {
      return (
        setErrorMsg("Invalid email or password, please try again"),
        setBtntxt("Sign In")
      );
    }

    if (login.data.signIn === "Unverified Email") {
      return (
        setUnverified(true),
        setErrorMsg("Please verify email and try again"),
        setBtntxt("Sign In")
      );
    }

    setUnverified(false);
    setErrorMsg("Verified");
    setBtntxt("Verified");

    setPassword("");
    setEmail("");
    return setIsAuth(true), router.push("/teacher");

    setTimeout(() => {
      setErrorMsg("");
      setBtntxt("Sign In");
    }, 5000);
  };

  return (
    <div className="w-full fixed overflow-y-auto h-[100vh] min-h-[100vh] md:h-[100vh] flex bg-main_color p-4">
      <div className="hidden md:flex flex-col w-[30%] relative px-7 h-full bg-cover blur-xs bg-no-repeat bg-center bg-[url(/assets/signin.png)] rounded-xl text-main_color bg-accent_color">
        <div className="overlay absolute rounded-xl opacity-80 mix-blend-multiply bg-blend-multiply top-0 left-0 w-full h-full bg-accent_color"></div>
        <div className="mt-[20%] relative z-10 px-2">
          <Image src="/assets/logolight.png" width={67} height={28} />
        </div>
        <h1 className="ctatxt relative z-10 text-3xl w-[80%] mt-[20%] ">
          {`Welcome back, let's keep going.`}
        </h1>
        <p className="text-md relative z-10 w-[80%] text-[#f7f7f7] mt-[1rem]">
          {`Being the best is something you can achieve all you need is a winning
          mindset and you're good to go.`}
        </p>
      </div>
      <div className="px-[5%] pt-[5%] w-full md:w-[70%]">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-sm mt-2 font-medium">
          {`Don't have an account already? `}
          <span
            onClick={() => router.push("/auth/signup")}
            className="text-accent_color cursor-pointer font-semibold"
          >
            Sign up
          </span>
        </p>
        <p className="errormsg text-accent_color font-extrabold">{err_msg}</p>
        {unverified && (
          <p className="font-extrabold">
            Click here to verify email{" "}
            <span
              onClick={() => router.push("/auth/verification")}
              className="text-accent_color cursor-pointer"
            >
              Verify Email
            </span>
          </p>
        )}
        <div className="mt-10">
          <input
            className={`input ${styles.input}`}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <input
            className={`input mt-8 ${styles.input}`}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
        </div>

        <div className="w-full flex justify-start">
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

export default Signin;
