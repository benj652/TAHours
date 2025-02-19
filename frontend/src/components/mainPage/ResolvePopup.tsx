export const ResolvePopup = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    if (!isOpen) return null;
    return (
        <div>
            <h1>ResolvePopup</h1>
            <button className="btn btn-error" onClick={() => setIsOpen(false)}>Close my son</button>
        </div>
    );
};
