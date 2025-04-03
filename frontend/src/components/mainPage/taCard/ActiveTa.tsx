import { useGetUser } from "@/hooks/user/useGetUser";
import { forceUpdateStore } from "@/store";
import { ObjectId } from "mongodb";
import { useEffect } from "react";

type ActiveTaProps = {
  curTa: ObjectId;
};
export const ActiveTa: React.FC<ActiveTaProps> = ({ curTa }) => {
  const { loading, getUser, user } = useGetUser();
 const { forceRenderKey } = forceUpdateStore();

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
        />
      </div>
      <div className="text-sm font-normal flex-1 text-left">
        {user?.firstName} {user?.lastName} ---{" "}
        {user?.description ? user.description : "No Description Provided"}{" "}
      </div>
    </div>
  );
};
