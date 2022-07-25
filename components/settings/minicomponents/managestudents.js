import React, { useContext } from "react";
import { TeacherContext } from "../../contexts/teachercontext";

function Managestudents() {
  const { setTopbaraction } = useContext(TeacherContext);

  return (
    <>
      <div
        onClick={() => setTopbaraction("Settings")}
        className="back cursor-pointer mb-8 "
      >
        <span className="material-icons text-accent_color">arrow_back_ios</span>
      </div>
      <div className="w-full border-2 border-[#a5b4df5e] rounded-xl overflow-hidden shadow-md">
        <table className="table-fixed w-full">
          <thead className="shadow-md">
            <tr>
              <th className="font-semibold ">No</th>
              <th className="font-semibold ">Profile Image</th>
              <th className="font-semibold">Name</th>
              <th className="font-semibold">Class</th>
              <th className="font-semibold">Courses</th>
              <th className="font-semibold">Verify</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td>
                <div className="w-10 mx-auto h-10 bg-cover bg-center bg-no-repeat rounded-full bg-[url('/assets/profileimg.jpg')]"></div>
              </td>
              <td className="w-max mx-auto text-center ">
                Ugwuanyi, Divinewisdom
              </td>
              <td className="text-center ">SS2A</td>
              <td>
                <div className=" mx-auto my-8 w-[8rem] max-h-[9rem] overflow-y-scroll">
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Mathematics</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>English</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Biochemistry</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Physics</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Geography</span>
                  </label>
                </div>
              </td>
              <td className="text-center">
                <input
                  className="mx-auto w-4 cursor-pointer h-4"
                  type={"checkbox"}
                  name="verify"
                />
              </td>
            </tr>

            <tr>
              <td className="text-center">2</td>
              <td>
                <div className="w-10 mx-auto h-10 bg-cover bg-center bg-no-repeat rounded-full bg-[url('/assets/profileimg.jpg')]"></div>
              </td>
              <td className="w-max mx-auto text-center ">Alfie, Jukes</td>
              <td className="text-center ">SS3Z</td>
              <td>
                <div className=" mx-auto my-8 w-[8rem] max-h-[9rem] overflow-y-scroll">
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Biology</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>English</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Futhermaths</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Physics</span>
                  </label>
                  <label className="block py-1">
                    <input
                      className="mr-2 w-4 cursor-pointer h-4"
                      type={"checkbox"}
                      name="course"
                    />
                    <span>Catering and Craft</span>
                  </label>
                </div>
              </td>
              <td className="text-center">
                <input
                  className="mx-auto w-4 cursor-pointer h-4"
                  type={"checkbox"}
                  name="verify"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="h-[5rem]"></div>
    </>
  );
}

export default Managestudents;
