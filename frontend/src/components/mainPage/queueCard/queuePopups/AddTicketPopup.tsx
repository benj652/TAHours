/*
 * AddTicketPopup.tsx
 * This file contains the popup used to input a new ticket
 */
import { useCreateTicket } from "@/hooks";
import { taQueueStore, ticketStore } from "@/store";
import { Modals, PROBLEM_TYPES, Ticket } from "@/types";
import { ObjectId } from "mongodb";
import { useState } from "react";

// type AddTicketPopupProps = {
//     classId: ObjectId;
//     taQueueId: ObjectId;
//     tickets: ObjectId[];
//     setTickets: React.Dispatch<React.SetStateAction<ObjectId[]>>;
// };

type AddTicketPopupProps = {
  classId: ObjectId | undefined;
  taQueueId: ObjectId | undefined;
};

export const AddTicketPopup: React.FC<AddTicketPopupProps> = ({
  classId,
  taQueueId,
}) => {
  // We unpack a bunch of caching stuff so no reloads are needed
  const { loading, createTicket, error } = useCreateTicket();
  const { addTicketToCache } = ticketStore();
  const { allTaQueues, setAllTaQueues } = taQueueStore();

  /**
   * Function to handle adding a new ticket
   * It updates all caches associated with the process
   * Web sockets will need to be implemented with this maybe
   *
   * @returns nothing bruh
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: work out a way to display errors.
    if (!taQueueId) return;
    if (!classId) return;
    const res = (await createTicket(
      classId,
      taQueueId.toString(),
      curDescription,
      curProblem,
      curType,
      curAttachments
    )) as Ticket;
    //need to toast this or something
    if (!res) return;
    if (!res._id) return;

    // the following lines up to line #44 will/should likely reside in thier own function at somepoint
    addTicketToCache(res);

    // It is saying that tickets needs some object tytpe iterator or whatever but I always just ignore that error and it all works out
    // setTickets([...tickets || [], res._id]);
    const updatedTaQueues = allTaQueues.map((queue) => {
      if (queue._id === taQueueId) {
        return {
          ...queue,
          tickets: [...(queue.tickets || []), res._id],
        };
      }
      return queue;
    });
    setAllTaQueues(updatedTaQueues);

    // Updates the cached queue to have the new id
    const targetQueue = allTaQueues.find((queue) => queue._id === taQueueId);

    if (!targetQueue) return;
    targetQueue.tickets.push(res._id);
    console.log(res);

    // Closes the popup
    // setIsExpanded(false);
    document.getElementById(`${Modals.QueuePopup}${taQueueId}`)?.close();

    // reset fields
    setCurProblem("");
    setCurDescription("");
    setCureType(PROBLEM_TYPES.DEBUGGING);
    setCurAttachments([]);
    setCurAttatchment("");
  };

  // Trackers to see what is netered in the form
  const [curProblem, setCurProblem] = useState<string>("");
  const [curDescription, setCurDescription] = useState<string>("");
  const [curType, setCureType] = useState<string>(PROBLEM_TYPES.DEBUGGING);

  // Tracker for uploaded screenshots
  const [curAttachments, setCurAttachments] = useState<string[]>([]);
  const [curAttatchment, setCurAttatchment] = useState<string>("");

  // Function to handle file uploads
  const [fileError, setFileError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(false); // Reset error on file selection
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) return;
      setCurAttatchment(e.target.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Function to upload selected file
  const handleFileUpload = () => {
    if (!curAttatchment) {
      setFileError(true); // Show error if no file is chosen
      return;
    }
    setCurAttachments([...curAttachments, curAttatchment]);
    setCurAttatchment("");
    setFileError(false);
  };

  //function to handle deleting an attachment
  const handleDeleteAttachment = async (index: number) => {
    const newAttachments = curAttachments.filter((_, i) => i !== index);
    console.log(newAttachments.length);
    setCurAttachments(newAttachments);
  };

  return (
    <form
      className="rounded-field bg-base-100 px-4 py-4 mb-4 flex flex-col gap-4"
      onSubmit={handleSubmit} //popup will close on submit
    >
      {/* input to describe problem */}
      <label> Problem </label>
      <input
        type="text"
        value={curProblem}
        onChange={(e) => setCurProblem(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      {/* input to describe description */}
      <label> Description </label>
      <textarea
        value={curDescription}
        onChange={(e) => setCurDescription(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      {/* drop down list of problem type options */}
      <label>Problem Type</label>
      <select
        onChange={(e) => setCureType(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value={PROBLEM_TYPES.DEBUGGING}>Debugging</option>
        <option value={PROBLEM_TYPES.SYNTAX}>Syntax</option>
        <option value={PROBLEM_TYPES.LOGIC}>Logic</option>
        <option value={PROBLEM_TYPES.RUNTIME}>Runtime</option>
        <option value={PROBLEM_TYPES.INSTALLATION}>Installation</option>
        <option value={PROBLEM_TYPES.OTHER}>Other</option>
      </select>

      {/* place to upload attachments */}
      <label> Attachments </label>
      <div>
        {curAttachments.map((attachment, index) => (
          <div key={index} className="flex items-center gap-2">
            <img className="w-32 h-auto rounded-md" src={attachment} />
            <button
              type="button"
              onClick={() => handleDeleteAttachment(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded-md"
        />
        {fileError && <p className="text-accent text-sm">No file chosen</p>}
        <button
          onClick={handleFileUpload}
          type="button"
          className="bg-accent hover:bg-red-900 text-white px-3 py-2 rounded-md mt-3"
        >
          Upload
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-gray-300 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
      {error}
    </form>
  );
};
