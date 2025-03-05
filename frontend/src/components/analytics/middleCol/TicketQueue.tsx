export const TicketQueue = ({ tickets }) => {
  return (
    <div className="bg-gray-300 rounded-lg p-4 shadow-lg">
      <ul className="list-none w-full space-y-2">
        {tickets.length > 0 ? (
          tickets.map((ticketName, index) => (
            <li
              key={index}
              className="p-4 flex items-center gap-4 bg-base-100 rounded-lg"
            >
              <div className="size-10 rounded-full overflow-hidden">
                <img
                  src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                  alt="Ticket Icon"
                />
              </div>
              <div className="font-semibold">{ticketName}</div>
              <div className="text-xs font-normal opacity-60">
                Debugging help on project 2
              </div>
            </li>
          ))
        ) : (
          <p>No Unresolved Tickets</p>
        )}
      </ul>
    </div>
  );
};
