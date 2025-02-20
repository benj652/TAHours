export const ActiveTa = ({ curTa }) => {
    return (
        <div className="flex items-center gap-4 w-full p-3 bg-base-100 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
            <div className="size-10 rounded-full shadow-lg overflow-hidden">
                <img src="https://robohash.org/dsfaasdf.jpeg" alt="TA Avatar" />
            </div>
            <div className="text-sm font-normal flex-1 text-left">{curTa}</div>
        </div>
    );
};
