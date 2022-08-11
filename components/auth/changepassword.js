import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";

const updatePassword = gql`
  mutation UpdatePassword($input: updatePasswordInput) {
    updatePassword(input: $input)
  }
`;

function Change_password() {
  const router = useRouter();
  const [update_password, { data, loading, error }] =
    useMutation(updatePassword);
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [btntxt, setBtntxt] = useState("Change");
  const [err_msg, setErrorMsg] = useState("");

  const checker = () => {
    if (new_password.trim() !== confirm_password.trim()) {
      setErrorMsg("*Passwords don't match. Please re-enter them");
      return "failed";
    } else {
      setErrorMsg(" ");
      change();
      return "passed";
    }
  };

  const change = async () => {
    const inputVal = {
      link: router.query.userId,
      newPassword: new_password,
    };
    setErrorMsg("...Updating. Please wait.");
    setBtntxt("...Updating");
    const create = await update_password({
      variables: { input: inputVal },
    });
    if (create.data.updatePassword === "Failed") {
      setNew_password("");
      setConfirm_password("");
      setErrorMsg("Server error"), setBtntxt("Retry");
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
      return "Error";
    }

    setErrorMsg("Done");
    setBtntxt("Done");

    router.push("/auth/signin");
  };

  return (
    <div className="w-full h-[100vh] fixed top-0 z-50 bg-main_color">
      <div className="w-[20rem] relative min-h-[11rem] h-max mt-[13%] bg-accent_bkg_color pt-[1rem] rounded-lg shadow-lg px-[1rem] mx-auto my-auto ">
        <p className="text-xl text-center mx-auto max-w-full overflow-hidden">
          Change password
        </p>
        <p className="text-xs text-center mt-4 mb-1 font-semibold text-accent_color">
          {err_msg}
        </p>
        <input
          type={"password"}
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
          className="w-full h-10 px-2 focus:shadow-lg focus:bg-main_color rounded-md outline-none"
          placeholder="Enter new password"
        />
        <input
          type={"password"}
          value={confirm_password}
          onChange={(e) => setConfirm_password(e.target.value)}
          className="w-full h-10 px-2 mt-4 focus:shadow-lg focus:bg-main_color rounded-md outline-none"
          placeholder="Confirm new password"
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

export default Change_password;
