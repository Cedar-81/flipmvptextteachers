import React, { useContext, useEffect } from "react";
import { TeacherContext } from "../../components/contexts/teachercontext";
import Settingcon from "../../components/settings/settingcon";

function Settings() {
  const { setTopbaraction } = useContext(TeacherContext);

  useEffect(() => {
    setTopbaraction("Settings");
  }, []);

  return (
    <div className="w-full h-full">
      <Settingcon />
    </div>
  );
}

export default Settings;
