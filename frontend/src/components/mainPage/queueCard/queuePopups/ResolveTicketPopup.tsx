import { useResolveTicket } from "@/hooks/tickets/useResolveTicket";
import { useGetUser } from "@/hooks/user/useGetUser";
import { MainPageStoreProps, Modals, PROBLEM_TYPES } from "@/types";
import { useEffect, useState } from "react";

// type ResolveTicketPopupProps = {
//     ticket: ObjectId | undefined;
// };
//

/**
 * Popup to resolve tickets
 *
 * Triggered when the TA presses reesovle on a ticket
 * might want to add some checks to make sure normie users
 * can not see this by mistake
 */
export const ResolveTicketPopup: React.FC<MainPageStoreProps> = ({
  curStore,
}) => {
  // Gets the currently selected ticket from the local store
  const { curTicket, setIsExpanded, taQueueId } = curStore();

  // Unpacks the getUser hook as we would like to display information
  // about the sender of the ticket
  const { getUser, user } = useGetUser();

  // Use the hook to get the user info
  useEffect(() => {
    if (!curTicket || !curTicket._id) return;
    getUser(curTicket.studentId);
  }, [curTicket]);

  // State to handle what the TA puts in as their resolution message
  const [taMessage, setTaMessage] = useState<string>("");

  // Unpacks use resolve ticket hook
  const { resolveTicket, loading } = useResolveTicket();

  /**
   * Function to handle resolving the ticket
   * This will update all instances of the cached ticket
   * to mark it as having a TA which should mark it as resolved
   * in the queue
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission
    e.preventDefault();

    // Validate that there is a ticket
    if (!curTicket) return;

    // Make sure the TA has put in a message
    if (!taMessage || taMessage === "") return;

    // Make sure the ticket has an id
    if (!curTicket._id) return;

    // Call the resolve ticket function from the hook
    const res = await resolveTicket(curTicket._id, taMessage, curType);

    console.log(res);
    setIsExpanded(false);
    document.getElementById(`${Modals.QueuePopup}${taQueueId}`)?.close();

    // reset fields
    setTaMessage("");
  };

  // Const for whether or not the ticket has screenshots
  const screenShotsShow =
    curTicket?.screenshots && curTicket.screenshots.length > 0;

  // State to handle the problem type
  const [curType, setCureType] = useState<string>(curTicket?.problemtype);
  useEffect(() => {
    setCureType(curTicket?.problemtype);
  }, [curTicket]);

  // Returns a loading message if the ticket is still loading
  if (!curTicket) return <div>WAIIIIITTTTT</div>;

  return (
    <div className="bg-base-100 rounded-field px-2 py-2">
      <h1 className="font-bold">Resolve Ticket</h1>

      {/* TA Details Card */}
      <div className="bg-base-300 p-4 rounded-md mt-4 mb-6 flex items-center space-x-4">
        {/* TA Information Text */}
        <div>
          <h2 className="">{user?.email}</h2>
          <h3 className="text-lg">
            {user?.firstName} <span>{user?.lastName}</span>
          </h3>
        </div>

        {/* Profile Image on the Right */}
        <img
          src={user?.profilePic}
          alt="TA Profile"
          className="rounded-full w-16 h-16 ml-auto" // 'ml-auto' pushes the image to the right
        />
      </div>

      {/* Issue Details */}
      <p className="font-semibold">The issue:</p>
      <h2 className="">{curTicket.problem}</h2>
      <p>{curTicket.description}</p>

      {/* Problem Type Dropdown */}
      <h2 className="mt-2 font-semibold">Problem Type</h2>
      <select onChange={(e) => setCureType(e.target.value)} value={curType}>
        <option value={PROBLEM_TYPES.DEBUGGING}>Debugging</option>
        <option value={PROBLEM_TYPES.SYNTAX}>Syntax</option>
        <option value={PROBLEM_TYPES.LOGIC}>Logic</option>
        <option value={PROBLEM_TYPES.RUNTIME}>Runtime</option>
        <option value={PROBLEM_TYPES.INSTALLATION}>Installation</option>
        <option value={PROBLEM_TYPES.OTHER}>Other</option>
      </select>

      {/* Screenshots (if any) */}
      {screenShotsShow && (
        <div>
          <h2 className="mt-2 font-semibold">Screenshots:</h2>
          {curTicket.screenshots.map((screenshot, index) => (
            <img key={index} src={screenshot} className="max-w-96 h-auto" />
          ))}
        </div>
      )}

      {/* Form to resolve ticket */}
      <form onSubmit={handleSubmit}>
        {/* Notes On Resolution Label */}
        <label className="mt-2 font-semibold mb-2 block">
          Notes On Resolution:
        </label>

        {/* Textarea for TA message */}
        <textarea
          value={taMessage}
          onChange={(e) => setTaMessage(e.target.value)}
          className="w-full h-32 p-2 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-300 hover:bg-accent px-2 rounded-box hover:text-white mt-4"
        >
          Resolve
        </button>
      </form>
    </div>
  );
};
