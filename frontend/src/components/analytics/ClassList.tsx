import { useGetActiveClasses } from "@/hooks";
import { useEffect, useState } from "react";
import CuteStar from "../../assets/star.svg";

export const ClassList = () => {
  const { getActiveClasses, data: getActiveCSClassesData } =
    useGetActiveClasses();
  useEffect(() => {
    getActiveClasses();
  }, []);
  const [newClass, setNewClass] = useState({
    name: "",
    semester: "Fall",
    year: "",
  });

  return (
    <div className="mr-4">
      <ul className="list-none w-full space-y-4">
        {getActiveCSClassesData && getActiveCSClassesData.length > 0 ? (
          getActiveCSClassesData.map((csClass, index) => (
            <li key={index}>
              <button className="flex items-center gap-4 w-full p-3 bg-gray-300 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
                <div className="size-10 rounded-full overflow-hidden">
                  <img src={CuteStar} alt="Class Icon" />
                </div>
                <div className="font-semibold flex-1 text-left">
                  {csClass.name}
                </div>
              </button>
            </li>
          ))
        ) : (
          <p>No classes running</p>
        )}
      </ul>

      {/* Add Class Form */}
      <div className="mt-6 p-4 bg-gray-300 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Add a Class</h2>
        <input
          type="text"
          placeholder="Class Name"
          className="w-full p-2 mb-2 border-base-200 rounded-md bg-base-200"
        />
        <div className="flex gap-2">
          <select className="w-1/2 p-2 border border-base-200 rounded-md bg-base-200">
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
          </select>
          <input
            type="number"
            placeholder="Year"
            className="w-1/2 p-2 border-base-200 rounded-md bg-base-200"
          />
        </div>
        <button className="mt-3 w-full bg-accent text-white p-2 rounded-md hover:bg-base-100 transition">
          Add Class
        </button>
      </div>
    </div>
  );
};
