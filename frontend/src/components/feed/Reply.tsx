const Reply = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://avatar.iran.liara.run/public?username=$420"
            alt="avatar"
          />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">
        Erm... What the Sigma
      </div>
      <div className="chat-footer opacity-50 text-sx flex gap-1 items-center">
        5:57
      </div>
    </div>
  );
};

export default Reply;
