import { StudentTickets } from "@/components";
import { authStore } from "@/store";

const bruh = {
  userName: "glasses emoji",
  userEmail: "glassesemoji@gmail.com",
  userPic: "https://robohash.org/hriewuhrq2u3iht",
  currentClasses: ["CS150"],
  resolvedTickets: ["dumb ticket", "dumb ticket 2"],
  userOutfit: "Blue shirt",
  classesRunning: ["CS150", "CS232", "CS400"],
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
      {/* Profile Card (1/3) */}
      <div className="w-1/3">
        <div className="card bg-base-300 rounded-box flex flex-col items-center p-4">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                src={userItems.profilePic || bruh.userPic}
                alt={bruh.userName}
              />
            </div>
          </div>
          <h1 className="text-lg font-bold mt-2">Name: </h1>
          <p>
            {userItems.firstName} {userItems.lastName}
          </p>
          <h1 className="text-lg font-bold mt-2">Email:</h1>
          <p>{userItems.email}</p>
          <h1 className="text-lg font-bold mt-2">Outfit:</h1>
          <input
            type="text"
            placeholder="Type here"
            className="input"
            defaultValue={bruh.userOutfit}
          />
        </div>
      </div>

      {/* Classes Card (1/3) */}
      <div className="w-1/3">
        <div className="card bg-base-300 rounded-box flex flex-col items-center p-4">
          <h1 className="text-lg font-bold">Classes:</h1>
          <ul className="list-none w-full">
            {bruh.currentClasses.length > 0 ? (
              bruh.currentClasses.map((className, index) => (
                <li
                  key={index}
                  className="border-b border-gray-500 p-4 flex items-center gap-4"
                >
                  <div>
                    <div className="font-semibold">{className}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      Lab TA
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-normal opacity-60">
                      Room 105
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No Classes</p>
            )}
          </ul>
        </div>
      </div>

      {/* Resolved Tickets Card (1/3) */}
      <div className="w-1/3">
        <StudentTickets tickets={bruh.currentQueue} />
      </div>
    </div>
  );
};
