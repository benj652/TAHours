import { useGetActiveClasses, useGetClassQueues } from "@/hooks";
import { analyticsPageStore, csClassStore } from "@/store";
import { CSClass } from "@/types";
import { useEffect, useState } from "react";
import CuteStar from "../../../assets/star.svg";
import { AddClassForm } from "./AddClassForm";

export const ClassList = () => {
  const { getActiveClasses } = useGetActiveClasses();
  const { getActiveCSClassesData } = csClassStore();
  useEffect(() => {
    getActiveClasses();
  }, []);

  const { getClassQueues } = useGetClassQueues();
  useEffect(() => {
    if (selectedClass) {
      getClassQueues(selectedClass._id);
    }
  }, []);

  const {
    selectedClass,
    selectedClassQueues,
    setSelectedClass,
    setSelectedClassQueues,
  } = analyticsPageStore();

  const [animatingClass, setAnimatingClass] = useState<CSClass | null>(null);

  const handleSelect = (csClass: CSClass) => {
    // If clicking the same class, it should collapse, else it opens
    if (csClass === selectedClass) {
      setAnimatingClass(csClass);
      setSelectedClass(null);
      setSelectedClassQueues(null);
    } else {
      setAnimatingClass(csClass);
      setSelectedClass(csClass);
      setSelectedClassQueues(null);
    }
  };

  return (
    <div className="mr-4 w-36 lg:w-56 flex flex-col h-full">
      <ul className="list-none w-full space-y-4 flex-1 overflow-auto">
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
                  onClick={() => handleSelect(csClass)} // Handle click to toggle selection
                >
                  <input
                    type="checkbox"
                    className="peer"
                    checked={csClass === selectedClass} // Make sure it's checked if selected
                    readOnly // Prevent user from interacting with the checkbox directly
                  />
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
                  {/* Add animation to collapse content */}
                  <div
                    className={`collapse-content overflow-hidden transition-all duration-300 ease-in-out ${
                      csClass === selectedClass
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    style={{
                      maxHeight: csClass === selectedClass ? "500px" : "0",
                      opacity: csClass === selectedClass ? "1" : "0",
                    }}
                  >
                    <ul className="list-none">
                      <li> Semester: {csClass.semester}</li>
                      <li> Year: {csClass.year}</li>
                      <li> Active: {csClass.isActive ? "Yes" : "No"}</li>
                      <li> Total Sessions: {csClass.queues.length}</li>
                    </ul>
                    {/* Deactivate button at the center bottom */}
                    <div className="flex justify-center mt-auto">
                      <button
                        type="button"
                        className="btn btn-primary bg-accent border-accent hover:rbg-red hover:border-red transition-colors duration-300 cursor-pointer"
                      >
                        deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
        ) : (
          <p>No classes running</p>
        )}
      </ul>
      <AddClassForm />
    </div>
  );
};
