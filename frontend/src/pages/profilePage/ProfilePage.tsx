import { StudentTickets } from "@/components";
import { authStore } from "@/store";

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
  return (
    <div className="flex w-full gap-4 p-4">
      {/* Profile Card (1/2) */}
      <div className="w-1/2">
        <div className="card bg-base-300 rounded-box flex flex-row items-center p-4 shadow-lg gap-4">
          {/* Profile Picture on the Left */}
          <div className="avatar w-1/3">
            <div className="w-full h-full rounded-full">
              <img
                src={userItems.profilePic || bruh.userPic}
                alt={bruh.userName}
              />
            </div>
          </div>

          {/* Profile Details on the Right */}
          <div className="flex flex-col text-left w-2/3">
            <h1 className="text-lg font-bold">Name:</h1>
            <p>
              {userItems.firstName} {userItems.lastName}
            </p>

            <h1 className="text-lg font-bold mt-2">Email:</h1>
            <p>{userItems.email}</p>

            <h1 className="text-lg font-bold mt-2">Role:</h1>
            <p>{bruh.userRole}</p>

            <h1 className="text-lg font-bold mt-2">Outfit:</h1>
            <input
              type="text"
              placeholder="Type here"
              className="input"
              defaultValue={bruh.userOutfit}
            />
          </div>
        </div>
      </div>

      {/* Resolved Tickets Card (1/2) */}
      <div className="w-1/2">
        <StudentTickets tickets={bruh.currentQueue} />
      </div>
    </div>
  );
};
