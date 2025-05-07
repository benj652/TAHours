/*
 * ActiveTa.tsx
 * This file contains the active ta component
 * It shows the active ta
 * It is a button that allows the user to navigate to the active ta page
 */
import { useGetUser } from "@/hooks/user/useGetUser";
import { forceUpdateStore } from "@/store";
import { Mode } from "@/types";
import { ObjectId } from "mongodb";
import { useEffect } from "react";

type ActiveTaProps = {
  curTa: ObjectId;
};
/**
 * The ActiveTa component is a button that shows the active TA
 * It uses the useGetUser hook to fetch the user data
 * It shows the TA's profile picture and name
 * It also shows a description of the TA
 * The component is a button that can be clicked to navigate to the active ta page
 * @param {ObjectId} curTa - the ID of the current TA
 * @returns a JSX element that displays the active TA
 */
export const ActiveTa: React.FC<ActiveTaProps> = ({ curTa }) => {
  const { loading, getUser, user } = useGetUser();
  const { forceRenderKey } = forceUpdateStore();
  const MODE = import.meta.env.VITE_RUN_MODE;
  /**
   * Logs the user object to the console when the ActiveTa component is clicked
   * This is only done in development mode
   */
  const handleClick = async () => {
    if (MODE === Mode.development) console.log("USER: ", user);
  };

  useEffect(() => {
    getUser(curTa);
  }, [forceRenderKey]);
  // console.log(user);
  if (loading) {
    return (
      <div className="flex items-center gap-4 w-full p-3 bg-base-100 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
        <div className="size-10 rounded-full shadow-lg overflow-hidden">
          <div className="animate-pulse bg-gray-300 h-full w-full"></div>
        </div>
        <div className="text-sm font-normal flex-1 text-left">Loading...</div>
      </div>
    );
  }
  // console.log(user);
  return (
    <div className="flex items-center gap-4 w-full p-3 bg-base-100 text-black rounded-lg hover:bg-primary-dark focus:outline-none">
      <div className="size-10 rounded-full shadow-lg overflow-hidden">
        <img
          src={user ? user.profilePic : "https://robohash.org/dsfaasdf.jpeg"}
          alt="TA Avatar"
          onClick={handleClick}
        />
      </div>
      <div className="text-sm font-normal flex-1 text-left">
        {user?.firstName} {user?.lastName} ---{" "}
        {user?.description ? user.description : "No Description Provided"}{" "}
      </div>
    </div>
  );
};
