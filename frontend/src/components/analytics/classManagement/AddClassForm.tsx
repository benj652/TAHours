//AddClassForm.tsx form placed under class list that allows user to add a class to the active classes
import { useCreateCSClass } from "@/hooks";
import { Modals, SEMESTER_NAMES } from "@/types";
import { useState } from "react";

export const AddClassForm = () => {
  const [name, setName] = useState<string>("");
  const [semester, setSemester] = useState<string>("Fall");
  const [year, setYear] = useState<number>(0);
  const { createCSClass } = useCreateCSClass();

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createCSClass({ name, semester, year });
    document.getElementById(Modals.CreateClass)?.close();
  };

  const handleShowModal = () => {
    // Show modal only when valid data is entered
    if (name && year > 0) {
      document.getElementById(Modals.CreateClass)?.showModal();
    }
  };

  return (
    <>
      <form
        onSubmit={handleCreate} //creates the class on submit
        className="mt-6 p-4 bg-gray-300 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-semibold mb-3">Add a Class</h2>
        <input
          type="text"
          placeholder="Class Name"
          className="w-full p-2 mb-2 border-base-200 rounded-md bg-base-200"
          onChange={(e) => setName(e.target.value)} // automatically changes the class name when form is clicked off of
        />
        <div className="flex gap-2">
          <select
            className="w-1/2 p-2 border border-base-200 rounded-md bg-base-200"
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value={SEMESTER_NAMES.FALL}>Fall</option>
            <option value={SEMESTER_NAMES.SPRING}>Spring</option>
          </select>
          <input
            type="number"
            placeholder="Year"
            className="w-full p-2 border-base-200 rounded-md bg-base-200"
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </div>
      </form>

      <button
        type="button"
        className="mt-3 w-full btn btn-primary hover:bg-accent border hover:border-accent"
        onClick={handleShowModal}
      >
        Add Class
      </button>

      <dialog id={Modals.CreateClass} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create Class?</h3>
          <p className="py-4">Name: {name}</p>
          <p className="py-4">Semester: {semester}</p>
          <p className="py-4">Year: {year}</p>

          <div className="modal-action">
            <form onSubmit={handleCreate}>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
            <form method="dialog">
              {/* Close button */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
