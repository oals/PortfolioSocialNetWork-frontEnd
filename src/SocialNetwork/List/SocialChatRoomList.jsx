import React from "react";

function SocialChatRoomList({
  chatRoomData,
  selectChatRoom,
  selectChatRoomChk,
}) {
  const chatRoomClick = (chatRoomId, e) => {
    selectChatRoom(chatRoomId);
  };

  return (
    <div className="scroll1 p-0">
      {chatRoomData.map((chatRoom) => (
        <div
          key={chatRoom.chatRoomId}
          className={`align-items-center flex-column mt-2 border rounded p-1 ${
            chatRoom.chatRoomId === selectChatRoomChk
              ? "bg-primary text-white"
              : ""
          }`}
          onDoubleClick={chatRoomClick.bind(this, chatRoom.chatRoomId)}
        >
          <div className="d-flex justify-content-start mt-2 ms-2">
            <div className="col-2">
              <img
                src={`http://localhost:8102/imageMapping?imageName=${chatRoom.memberProfileImage}`}
                width="30px"
                height="30px"
                className=" rounded-circle"
              ></img>
            </div>
            <div className="col-7 ms-3">
              <small className="fw-bold ">{chatRoom.memberId}</small>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SocialChatRoomList;
