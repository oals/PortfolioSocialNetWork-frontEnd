import React, { useState, useRef, useEffect } from "react";

function SocialChatRoomMessageList({ chatData, sendMessage }) {
  const [message, setMessage] = useState("");
  let memberId = localStorage.getItem("memberId");

  const scrollRef = useRef();

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    sendMessage(chatData.chatRoomId, message);
    setMessage("");
  };

  return (
    <div>
      <div className="align-items-center flex-column">
        <div className="mt-1">
          <img
            src={`http://localhost:8102/imageMapping?imageName=${chatData.memberProfileImage}`}
            width="30px"
            height="30px"
            className="mt-0 ms-2 rounded-circle"
          ></img>
          <span className="mt-5 ms-2 fw-bold">{chatData.memberId}</span>
        </div>
        <hr className="mt-1 mb-0" />
        <div className="scroll p-3" ref={scrollRef}>
          {chatData.chatMessageDTOList &&
            chatData.chatMessageDTOList.map((message) => (
              <div
                key={message.chatMessageNo}
                className="align-items-center flex-column mt-2"
              >
                {message.memberId === memberId ? (
                  <div className="d-flex justify-content-end">
                    <span className="bg-white p-1 rounded fw-bold">
                      {message.chatMessage}
                    </span>
                  </div>
                ) : (
                  <div className="d-flex justify-content-start">
                    <span className="bg-light p-1 rounded fw-bold">
                      {message.chatMessage}
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>

        <hr className="mt-0" />
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-group mt-0 mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="메세지를 입력해보세요."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></input>
              <button
                className="btn btn-light text-primary"
                type="submit"
                id="button-addon2"
              >
                보내기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SocialChatRoomMessageList;
