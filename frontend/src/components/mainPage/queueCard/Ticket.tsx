export const Ticket = ({ticketName, setTicketOpen}) => {
    return (
        <li
            className="p-4 flex items-center gap-4 bg-gray-200 rounded-lg"
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
            <button
                className="btn btn-ghost bg-accent ml-auto shadow-lg"
                onClick={() => setTicketOpen(true)}
            >
                <div className="text-xs uppercase font-semibold text-base-100 ">
                    Resolve
                </div>
            </button>
        </li>
    );
};
