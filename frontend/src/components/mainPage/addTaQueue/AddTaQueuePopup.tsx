import {
    useCreateTaQueue,
    useGetActiveClasses,
    useGetAllTaQueues,
} from "@/hooks";
import { authStore } from "@/store";
import { AddPopUpProps, TaQueue, TaQueueCreateResponse } from "@/types";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";

type AddTaQueuePopupProps = AddPopUpProps & {
    curTaQueues: TaQueue[] | null;
    setTaQueues: (taQueues: TaQueue[]) => void;
};
export const AddTaQueuePopup: React.FC<AddTaQueuePopupProps> = ({
    isOpen,
    setIsOpen,
    curTaQueues,
    setTaQueues,
}) => {
    const { createTaQueue, loading: createLoading } = useCreateTaQueue();
    const { userItems } = authStore();

    // const [fetched, setFetched] = useState<boolean>(false); // State for fetching class data

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

    // const { setTaQueues, data: taQueues } = useGetAllTaQueues();

    /** Function to handle the form submission */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // @ts-ignore
        const classObject = selectedClass as ObjectId;
        if (!userItems?._id) return "error";
        const res = (await createTaQueue(
            [userItems._id],
            classObject,
            directions,
        )) as TaQueueCreateResponse;
        //@ts-ignore
        setTaQueues([...curTaQueues, res.taQueue]);
        // setTaQueues([...(taQueues || []), res.taQueue]);
        // console.log("new quesues", taQueues);
        console.log(res.taQueue);
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
