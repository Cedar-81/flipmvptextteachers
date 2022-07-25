import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/teacher/bookshelf");
  }, []);
  return <div className=" bg-accent_bkg_color h-full ">Home</div>;
}

export default Home;
