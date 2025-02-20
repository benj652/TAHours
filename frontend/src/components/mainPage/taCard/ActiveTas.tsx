import { ObjectId } from "mongodb";
import { ActiveTa } from "./ActiveTa";
import { JoinSessionButton } from "./JoinSessionButton";

type ActiveTasProps = {
    tas: ObjectId[];
}
export const ActiveTas:React.FC<ActiveTasProps> = ({ tas }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-lg p-4 w-1/4 min-w-[100px] self-start">
            <h1 className="text-lg font-bold">Active TAs</h1>
            <ul className="list-none w-full space-y-4">
                {tas && tas.length > 0 ? (
                    tas.map((taId, index) => (
                        <ActiveTa key={index} curTa={taId} />
                    ))
                ) : (
                    <p>No Active TAs</p>
                )}
            </ul>
            <JoinSessionButton />
        </div>
    );
};
