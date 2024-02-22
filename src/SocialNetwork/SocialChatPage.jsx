import React, { useState, useEffect, useRef } from "react";
import "./Css/SocialChatPage.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderLayout from "../Layout/HeaderLayout";
import SocialFollowList from "./List/SocialFollowList";
import SocialChatRoomList from "./List/SocialChatRoomList";
import SocialChatRoomMessageList from "./List/SocialChatRoomMessageList";
import { useLocation } from "react-router-dom";

function SocialChatPage() {
  let memberId = localStorage.getItem("memberId");
  let target = memberId;
  const [isFollowing, setIsFollowing] = useState(true);
  const [followData, setFollowData] = useState([]);
  const [chatRoomData, setChatRoomData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState({
    memberId: "",
    memberProfileImage: "",
    chatMessageDTOList: [],
  });
  const [selectChatRoomChk, setSelectChatRoomChk] = useState("");
  const location = useLocation();
  const locationStateRef = useRef();

  const UseLocationChk = () => {
    if (
      location.state &&
      location.state.chatMemberId !== locationStateRef.current
    ) {
      console.log("useLocationChk");
      const chatMemberId = location.state.chatMemberId;
      console.log(chatMemberId);
      selectMember(chatMemberId);
    }

    locationStateRef.current = location.state
      ? location.state.chatMemberId
      : locationStateRef.current;

    window.onbeforeunload = () => {
      navigate(location.pathname, { state: {} });
    };
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8102/getChatRoom", {
        params: {
          memberId,
        },
      });
      if (response.data) {
        setChatRoomData(response.data);
      }
    } catch (error) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (
      chatRoomData.length > 0 &&
      location.state &&
      location.state.chatMemberId
    ) {
      if (
        location.state &&
        location.state.chatMemberId !== locationStateRef.current
      ) {
        UseLocationChk();
      }
    }
  }, [chatRoomData]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFollowClick = async (followType) => {
    let response;

    try {
      const url = followType
        ? "http://localhost:8102/followList"
        : "http://localhost:8102/followerList";
      const method = "get";
      const params = {
        target,
      };

      response = await axios({
        method,
        url,
        params,
      });

      if (response.data) {
        setFollowData(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    handleFollowClick(isFollowing);
  }, [isFollowing]);

  const followBtn = (followType) => {
    setIsFollowing(followType); // 클릭한 버튼에 따라 상태 업데이트
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const selectMember = async (memberId2) => {
    // 더블클릭 이벤트 처리 로직

    const formData = new FormData();

    formData.append("memberId", memberId);
    formData.append("memberId2", memberId2);

    try {
      const response = await axios.post(
        "http://localhost:8102/createChatRoom",
        formData,
      );

      if (response.data) {
        setChatRoomData((prevComments) => [response.data, ...prevComments]);
        selectChatRoom(response.data.chatRoomId);
      } else {
        const existingChatRoom = chatRoomData.find(
          (chatRoom) => chatRoom.memberId === memberId2,
        );

        if (existingChatRoom) {
          selectChatRoom(existingChatRoom.chatRoomId);
        }
      }
    } catch (error) {
      alert("채팅방 생성 실패");
      console.error(error);
    }
  };

  const selectChatRoom = async (chatRoomId) => {
    try {
      const response = await axios.get("http://localhost:8102/getChatMessage", {
        params: {
          chatRoomId,
          memberId,
        },
      });
      if (response.data) {
        setChatData(response.data);
        setSelectChatRoomChk(chatRoomId);
      }
    } catch (error) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const sendMessage = async (chatRoomId, message) => {
    const formData = new FormData();

    formData.append("chatRoomId", chatRoomId);
    formData.append("memberId", memberId);
    formData.append("chatMessage", message);

    try {
      const response = await axios.post(
        "http://localhost:8102/sendChatMessage",
        formData,
      );

      if (response.data) {
        setChatData({
          ...chatData,
          chatMessageDTOList: [...chatData.chatMessageDTOList, response.data],
        });

        let updatedChatRoomData = chatRoomData.map((room) => {
          if (room.chatRoomId === chatRoomId) {
            return { ...room, lastUseDate: formatDate(new Date()) };
          } else {
            return room;
          }
        });

        let sortedChatRoomData = [...updatedChatRoomData].sort((a, b) => {
          return new Date(b.lastUseDate) - new Date(a.lastUseDate);
        });

        setChatRoomData(sortedChatRoomData);
      }
    } catch (error) {
      alert("업로드 실패");
      console.error(error);
    }
  };

  return (
    <div>
      <HeaderLayout></HeaderLayout>
      <hr className="mt-0 " />
      <div className="container mt-5">
        <div className="d-flex justfiy-content-center">
          <div className="col-1"></div>
          <div className="col-2 border ms-1 divHeight rounded">
            <div className="align-items-center flex-column">
              <div className="d-flex justify-content-center mt-1">
                <div
                  className={`col-6 text-center border-end ${
                    isFollowing ? "bg-primary text-white" : "" // 팔로우 상태에 따라 배경색 변경
                  }`}
                  onClick={() => followBtn(true)}
                >
                  <small className="fw-bold">팔로우</small>
                </div>
                <div
                  className={`col-6 text-center border-end ${
                    !isFollowing ? "bg-primary text-white" : "" // 팔로우 상태에 따라 배경색 변경
                  }`}
                  onClick={() => followBtn(false)}
                >
                  <small className="fw-bold">팔로워</small>
                </div>
              </div>
              <hr className="mt-1 mb-1" />
              <div className="scroll2 p-0">
                <SocialFollowList
                  followListInitial={followData}
                  followType={isFollowing}
                  authority={false}
                  selectMember={selectMember}
                ></SocialFollowList>
              </div>
            </div>
          </div>

          <div className="col-2 ms-1 border">
            <div className="align-items-center">
              <div className="text-center">
                <small className="fw-bold">현재 채팅방</small>
              </div>
              <hr className="mt-1 mb-1" />
              <SocialChatRoomList
                chatRoomData={chatRoomData}
                selectChatRoom={selectChatRoom}
                selectChatRoomChk={selectChatRoomChk}
              ></SocialChatRoomList>
            </div>
          </div>

          <div className="col-6 ms-1 border rounded">
            <SocialChatRoomMessageList
              chatData={chatData}
              sendMessage={sendMessage}
            ></SocialChatRoomMessageList>
          </div>

          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
}

export default SocialChatPage;
