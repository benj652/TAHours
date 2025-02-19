export const WritePost = () => {
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Enter message..."
          className="border text-sm rounded-lg block w-full p-2 bg-base-300"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {" "}
          Icon{" "}
        </button>
      </div>
    </form>
  );
};
