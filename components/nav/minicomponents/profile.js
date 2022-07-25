import React, { useContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

function Profile() {
  return (
    <div className="nav_displays fixed bg-main_color md:right-[6rem] md:pt-0 md:mt-4 md:h-max md:w-max md:rounded-md md:shadow-md top-[10%] h-[90%] w-[100vw] ">
      <div className="class_course w-full md:w-[20rem] pt-4 md:pt-0 bg-accent_bkg_color md:bg-main_color md:h-[20rem] md:rounded-md items-center h-full">
        <div className="profileimage"></div>
        <div className="details">
          <p className="name">Kyle</p>
          <p className="">Class</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
