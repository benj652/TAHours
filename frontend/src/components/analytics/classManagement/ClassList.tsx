import { useGetActiveClasses } from "@/hooks";
import { useEffect } from "react";
import CuteStar from "../../../assets/star.svg";
import { AddClassForm } from "./AddClassForm";
import { analyticsPageStore, csClassStore } from "@/store";
import { CSClass } from "@/types";

export const ClassList = () => {
  const { getActiveClasses } = useGetActiveClasses();
  const { getActiveCSClassesData } = csClassStore();
  useEffect(() => {
    getActiveClasses();
  }, []);
  // const [newClass, setNewClass] = useState({
  //   name: "",
  //   semester: "Fall",
  //   year: "",
  // });

  const { selectedClass, setSelectedClass } = analyticsPageStore();
  const handleSelect = (csClass: CSClass) => {
    setSelectedClass(csClass);
  };

  return (
    <div className="mr-4 w-36 lg:w-56">
      <ul className="list-none w-full space-y-4">
        {getActiveCSClassesData && getActiveCSClassesData.length > 0 ? (
          getActiveCSClassesData
            .slice()
            .reverse()
            .map((csClass, index) => (
              <li key={index}>
                <div
                  className={`collapse text-black ${
                    csClass === selectedClass ? "bg-blue-200" : "bg-gray-300"
                  }`}
                >
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title">
                    <div className="font-semibold flex flex-row">
                      <img
                        src={CuteStar}
                        alt="Class Icon"
                        className="w-8 h-auto"
                      />
                      <div className="mt-1 ml-1">{csClass.name}</div>
                    </div>
                  </div>
                  <div className="collapse-content">
                    <ul className="list-none">
                      <li> Semester: {csClass.semester}</li>
                      <li> Year: {csClass.year}</li>
                      <li> Active: {csClass.isActive ? "Yes" : "No"}</li>
                      <li> Total Sessions: {csClass.queues.length}</li>
                      <li>
                        <button
                          onClick={() => handleSelect(csClass)}
                          type="button"
                          className="btn btn-primary"
                          disabled={selectedClass === csClass}
                        >
                          select
                        </button>
                        <button type="button" className="btn btn-primary">
                          deactivate
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))
        ) : (
          <p>No classes running</p>
        )}
      </ul>
      <AddClassForm />
      {/* Add Class Form */}
    </div>
  );
};
