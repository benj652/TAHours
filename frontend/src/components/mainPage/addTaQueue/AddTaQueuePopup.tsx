import { useCreateTaQueue, useGetActiveClasses } from "@/hooks";
import { authStore } from "@/store";
import { AddPopUpProps } from "@/types";
import { ObjectId } from "mongodb";
import { useEffect, useState, useCallback } from "react";

export const AddTaQueuePopup: React.FC<AddPopUpProps> = ({
    isOpen,
    setIsOpen,
}) => {
    const { createTaQueue, loading: createLoading } = useCreateTaQueue();
    const { userItems } = authStore();

    const [fetched, setFetched] = useState<boolean>(false); // State for fetching class data

    const {
        getActiveClasses,
        loading: activeClassesLoading,
        data: activeClasses,
    } = useGetActiveClasses();

    // Fetches the classsses if they have not been fetched
    // const fetchClasses = useCallback(() => {
    //     if (!fetched) {
    //         getActiveClasses();
    //         setFetched(true);
    //     }
    // }, [fetched]);

    // useEffect(() => {
    //     fetchClasses();
    // }, [fetchClasses]);

    useEffect(() => {
        getActiveClasses();
    }, []);
    // Form state variables and values
    const [selectedClass, setSelectedClass] = useState<string>("");
    const [directions, setDirections] = useState<string>("");

    /** Function to handle the form submission */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // @ts-ignore
        const classObject = selectedClass as ObjectId;
        if (!userItems?._id) return "error";
        const res = await createTaQueue([userItems._id], classObject, directions);
        console.log(res);
        setIsOpen(false);
    };

    // If the popup is not open, do nothing
    if (!isOpen) return null;
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Class</label>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="" disabled>
                        Select a class
                    </option>
                    {activeClasses?.map((csClass, index) => (
                        <option key={index} value={csClass._id?.toString()}>
                            {csClass.name}
                        </option>
                    ))}
                </select>
                <label> Directions</label>
                <input
                    type="text"
                    value={directions}
                    onChange={(e) => setDirections(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-pink-500 hover:bg-green-500"
                    disabled={activeClassesLoading || createLoading}
                >
                    Confirm
                </button>
            </form>
        </div>
    );
};
