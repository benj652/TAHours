import { StudentTickets } from "@/components";
import { useUpdateUserDesc, useUserTickets } from "@/hooks";
import { authStore } from "@/store";
import { useEffect, useState } from "react";

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

export const ProfilePage: React.FC = () => {
  const { userItems } = authStore();
  const { loading: descLoading, error, updateUserDesc } = useUpdateUserDesc();
  const { userTickets, tickets, loading: ticketsLoading } = useUserTickets();
  const [outfit, setOutfit] = useState(userItems.description);

  useEffect(() => {
    if (userItems?._id) {
      userTickets(userItems._id);
    }
  }, [userItems?._id]);

  const handleOutfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOutfit(e.target.value);
  };

  const handleOutfitBlur = async () => {
    if (userItems?._id) {
      await updateUserDesc(userItems._id, outfit);
    }
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
              placeholder="Type here"
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
