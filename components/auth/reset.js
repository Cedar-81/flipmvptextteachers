import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";

const sendReset = gql`
  mutation UpdatePassword($input: createPasswordLinkInput) {
    createPasswordLink(input: $input)
  }
`;

function Reset() {
  const [send_reset, { data, loading, error }] = useMutation(sendReset);
  const [err_msg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [btntxt, setBtntxt] = useState("Reset");

  const checker = () => {
    if (email.trim().length == 0) {
      setErrorMsg("Email field must be filled");
      setInterval(() => {
        setErrorMsg("");
      }, 5000);
      return "failed";
    } else if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      setErrorMsg("*Please enter a valid email");
      setInterval(() => {
        setErrorMsg("");
      }, 5000);
      return "failed";
    } else {
      setErrorMsg(" ");
      reset();
      return "passed";
    }
  };

  const reset = async () => {
    const inputVal = {
      email,
    };
    setErrorMsg("...Sending. Please wait.");
    setBtntxt("...Sending");
    const create = await send_reset({
      variables: { input: inputVal },
    });
    if (create.data.createPasswordLink === "Failed") {
      return setErrorMsg("Invalid email, please try again"), setBtntxt("Reset");
    }

    setErrorMsg("Sent");
    setBtntxt("Done");

    setTimeout(() => {
      setErrorMsg(
        "Click link in your email inbox to change password or click resend button if you couldn't find it"
      );
      setBtntxt("Resend");
    }, 5000);
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-50 bg-main_color">
      <div className="w-[20rem] relative min-h-[11rem] h-max mt-[13%] bg-accent_bkg_color pt-[1rem] rounded-lg shadow-lg px-[1rem] mx-auto my-auto ">
        <p className="text-xl text-center mx-auto max-w-full overflow-hidden">
          Password Reset
        </p>
        <p className="text-xs text-center mt-1 text-accent_color">
          {`Please do check your spam if you can't find the reset link email
            from us.`}
        </p>
        <p className="text-xs text-center mt-8 mb-1 font-semibold text-accent_color">
          {err_msg}
        </p>
        <input
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-10 px-2 focus:shadow-lg focus:bg-main_color rounded-md outline-none"
          placeholder="Enter email"
        />
        <div className="w-full flex justify-end">
          <button
            onClick={() => checker()}
            className="bg-accent_color cursor-pointer hover:shadow-md text-main_color px-4 relative mt-5 mb-5 py-1 rounded-md text-base"
          >
            {btntxt}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reset;
