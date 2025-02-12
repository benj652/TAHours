interface UserProps {
  userName: string;
  userEmail: string;
  userPic: string;
  currentClasses: string[];
  resolvedTickets: string[];
}
const bruh = {userName: "glasses emoji", userEmail: "glassesemoji@gmail.com", userPic: "https://robohash.org/hriewuhrq2u3iht", currentClasses: ["CS150"], resolvedTickets: ["dumb ticket", "dumb ticket 2"], userOutfit: "shirtless ;)"};
const ProfilePage: React.FC<UserProps> = () => {
  return (
    <div className="flex w-full gap-4 p-4">
      {/* User Info Card */}
      <div className="card bg-base-300 rounded-box flex flex-col items-center p-4">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={bruh.userPic} alt={bruh.userName} />
          </div>
        </div>
        <h1 className="text-lg font-bold mt-2">Name: </h1>
        <p>{bruh.userName}</p>
        <h1 className="text-lg font-bold mt-2">Email:</h1>
        <p>{bruh.userEmail}</p>
        <h1 className="text-lg font-bold mt-2">Outfit:</h1>
        <input type="text" placeholder="Type here" className="input" defaultValue={bruh.userOutfit}/>
      </div>

      {/* Divider */}
      <div className="divider divider-horizontal"></div>

      {/* Classes Card */}
      <div className="card bg-base-300 rounded-box flex flex-col items-center p-4 w-full">
        <h1 className="text-lg font-bold">Classes:</h1>
        <ul className="list-none w-full">
          {bruh.currentClasses.length > 0 ? (
            bruh.currentClasses.map((className, index) => (
              <li key={index} className="border-b border-gray-500 p-4 flex items-center gap-4">
                <div>
                  <div className="font-semibold">{className}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">Lab TA</div>
                </div>
                <div>
                  <div className="text-xs font-normal opacity-60">Room 105</div>
                </div>
              </li>
            ))
          ) : (
            <p>No Tickets Resolved</p>
          )}
        </ul>
      </div>
      {/* Resolved Tickets Card */}
      <div className="card bg-base-300 rounded-box flex flex-col items-center p-4 w-full">
        <h1 className="text-lg font-bold">Resolved Tickets:</h1>
        <ul className="list-none w-full">
          {bruh.resolvedTickets.length > 0 ? (
            bruh.resolvedTickets.map((ticketName, index) => (
              <li key={index} className="border-b border-gray-500 p-4 flex items-center gap-4">
                <div className="size-10 rounded-full overflow-hidden">
                  <img src="https://img.daisyui.com/images/profile/demo/1@94.webp" alt="Ticket Icon" />
                </div>
                <div>
                  <div className="font-semibold">{ticketName}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">CS150</div>
                </div>
                <div>
                  <div className="text-xs font-normal opacity-60">Debugging help on project 2</div>
                </div>
                <button className="btn btn-square btn-ghost">
                <div className="text-xs uppercase font-semibold opacity-60">Open</div>
                </button>
              </li>
            ))
          ) : (
            <p>No Tickets Resolved</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;