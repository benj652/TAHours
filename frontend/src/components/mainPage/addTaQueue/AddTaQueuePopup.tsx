import { AddPopUpProps } from "@/types";

export const AddTaQueuePopup: React.FC<AddPopUpProps> = ({
    isOpen,
    setIsOpen,
}) => {
    if (!isOpen) return null;
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitted");
    };
    console.log(setIsOpen); // will need this to close on confirm
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Class </label>
                <select>
                    <option>CS 101</option>
                    <option>CS 420</option>
                </select>
                <button type="submit" className="bg-pink-500 hover:bg-green-500">Confirm</button>
            </form>
        </div>
    );
};
