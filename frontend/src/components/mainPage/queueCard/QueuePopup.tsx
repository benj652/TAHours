export const QueuePopup= ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    if (!isOpen) return null;
    return (
        <div>
            <h1>Pop Up</h1>
            <button className="btn btn-error" onClick={() => setIsOpen(false)}>Close my son</button>
        </div>
    );
};
