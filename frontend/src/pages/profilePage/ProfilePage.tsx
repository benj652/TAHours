/*
 * ProfilePage.tsx
 *
 * Profile page for the TA Queue application.
 */
import { StudentTickets } from "@/components";
import { useUpdateUserDesc, useUserTickets } from "@/hooks";
import { authStore } from "@/store";
import { useEffect, useState } from "react";

// Some random mock data used for testing. Now we use this as data in case there is
// missing data, such as a profile pic.
const bruh = {
  userName: "glasses emoji",
  userEmail: "glassesemoji@gmail.com",
  userPic: "https://robohash.org/hriewuhrq2u3iht",
  userRole: "TA",
  resolvedTickets: ["dumb ticket", "dumb ticket 2"],
  userOutfit: "Blue shirt",
  currentQueue: [
    "dumb ticket",
    "dumb ticket 2",
    "dumb ticket 3",
    "dumb ticket 4",
  ],
};

/*
 * ProfilePage component
 * This component displays the user's profile information and their tickets.
 * It includes a profile card with the user's name, email, role, and outfit,
 * as well as a list of tickets.
 */
export const ProfilePage: React.FC = () => {
  const { userItems } = authStore(); // Get the user items from the auth store
  const { loading: descLoading, error, updateUserDesc } = useUpdateUserDesc(); // unpack the update user desc hook
  const { userTickets, tickets, loading: ticketsLoading } = useUserTickets(); //  unpack the user tickets hook
  const [outfit, setOutfit] = useState(userItems.description); // State to track the user's outfit

  // Effect to set the initial outfit state when userItems changes
  useEffect(() => {
    if (userItems?._id) {
      userTickets(userItems._id);
    }
  }, [userItems?._id]);

  /*
   * Function to handle changes to the outfit input field.
   *
   * When the user types in the input field, this function updates the outfit state.
   */
  const handleOutfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutfit(e.target.value);
  };

  /*
   * Function to handle when the outfit input field loses focus.
   *
   * So when the user clicks off the outfit thing, this happens
   */
  const handleOutfitBlur = async () => {
    if (userItems?._id && outfit) {
      await updateUserDesc(userItems._id, outfit);
    }
    userItems.description = outfit;
  };

  return (
    <div className="flex w-full gap-4 p-4">
      {/* Profile Card */}
      <div className="w-1/2">
        <div className="card bg-base-300 rounded-box flex flex-row items-center p-4 shadow-lg gap-4">
          <div className="avatar w-1/3">
            <div className="w-full h-full rounded-full">
              <img
                src={userItems.profilePic || bruh.userPic}
                alt={bruh.userName}
              />
            </div>
          </div>

          <div className="flex flex-col text-left w-2/3">
            <h1 className="text-lg font-bold">Name:</h1>
            <p>
              {userItems.firstName} {userItems.lastName}
            </p>

            <h1 className="text-lg font-bold mt-2">Email:</h1>
            <p>{userItems.email}</p>

            <h1 className="text-lg font-bold mt-2">Role:</h1>
            <p>{userItems.roles}</p>

            <h1 className="text-lg font-bold mt-2">Outfit:</h1>
            <input
              type="text"
              placeholder="How could someone find you in the room?"
              className="input"
              value={outfit}
              onChange={handleOutfitChange}
              onBlur={handleOutfitBlur}
              disabled={descLoading}
            />
            {descLoading && (
              <p className="text-sm text-gray-500">Updating...</p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      {/* Tickets Card */}
      <div className="w-1/2">
        {ticketsLoading ? (
          <div className="card bg-base-200 rounded-box p-4 shadow">
            <p>Loading tickets...</p>
          </div>
        ) : (
          <StudentTickets tickets={tickets} />
        )}
      </div>
    </div>
  );
};
