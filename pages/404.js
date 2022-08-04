import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Error() {
  const router = useRouter();
  useEffect(() => {
    router.push("/teacher/bookshelf");
  }, []);
  return <div className=" bg-accent_bkg_color h-full ">404 page</div>;
}

export default Error;
