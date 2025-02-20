import { ActiveTa } from "./ActiveTa";
import { JoinSessionButton } from "./JoinSessionButton";

export const ActiveTas = ({ curQueue }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-lg p-4 w-1/4 min-w-[100px] self-start">
            <h1 className="text-lg font-bold">Active TAs</h1>
            <ul className="list-none w-full space-y-4">
                {curQueue.activeTas.length > 0 ? (
                    curQueue.activeTas.map((taName, index) => (
                        <ActiveTa key={index} curTa={taName} />
                    ))
                ) : (
                    <p>No Active TAs</p>
                )}
            </ul>
            <JoinSessionButton />
        </div>
    );
};
