import { Replies } from "@/components"
export const Post = () => {
  return (
    <div>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="chat-header">
          Slump Gorb
          <time className="text-xs opacity-50">4:20</time>
        </div>
        <div className="chat-bubble">RAHHH I HATE COMPUTERS</div>
        <div className="chat-footer">
          <div
            tabIndex={0}
            className="collapse collapse-plus border-base-300 bg-base-200 border"
          >
            <input type="checkbox" />
            <div className="collapse-title ">Replies</div>
            <div className="collapse-content">
              <Replies />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// poopoo bad code that is terrible
{
  /* // const Post = () => {
//     return (
//         <div className={cn("flex chat chat-start p-6")}>
//             <div className={cn("flex flex-col")}>
//                 <div className={cn("chat-image avatar")}>
//                     <div className={cn("w-30 rounded-full")}>
//                         <img src="https://avatar.iran.liara.run/public?username=$420" alt = "avatar" />
//                     </div>
//                 </div>
//             </div>
//             <div className={cn("flex flex-col p-2")}>
//                 <div className={cn("chat-bubble text-white bg-blue-400 p-2")}>
//                     Erm... What the Sigma skibidi.lang skibidi.lang skibidi.lang skibidi.lang skibidi.lang skibidi.lang skibidi.lang skibidi.lang
//                 </div>
//                 <div className={cn("flex")}>
//                     <div className={cn("chat-footer text-sx items-center p-2")}>
//                         Sent at: 5:57 PM
//                     </div>
//                     <button className={cn("btn btn-rectangle bg-red-500 justify")}>
//                         Delete
//                     </button>
//                 </div>
//                 <div tabIndex={0} className={cn("collapse collapse-plus border border-base-300 bg-base-200 rounded-box")}>
//                     <input type="checkbox" />
//                     <div className={cn("collapse-title text-sm font-medium text-gray-100")}> Replies 
//                     </div>
//                     <div className={cn("collapse-content")}>
//                         <Reply />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// } */
}
