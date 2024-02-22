import React, { useState, useEffect } from "react";

import "../Css/SocialChatPage.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SocialFollowList from "../List/SocialFollowList";

function SocialFollow({ onFollow, authority }) {
  const [isFollowing, setIsFollowing] = useState(true); // 초기 상태는 팔로우하지 않은 상태
  const target = location.pathname.replace("/socialPage/", "");
  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    handleFollowClick(true);
  }, []);

  const handleFollowClick = async (followType) => {
    setIsFollowing(followType); // 클릭한 버튼에 따라 상태 업데이트

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
        setFollowList(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  return (
    <div className="container bg-light border border-3 rounded div">
      <div className="align-items-center flex-column">
        <div className="d-flex justify-content-center">
          <div
            className={`col-6 text-center border-end p-1 ${
              isFollowing ? "bg-primary text-white rounded" : ""
            }`}
            onClick={() => handleFollowClick(true)}
          >
            <small className="fw-bold">팔로우</small>
          </div>
          <div
            className={`col-6 text-center p-1 ${
              !isFollowing ? "bg-primary text-white rounded" : ""
            }`}
            onClick={() => handleFollowClick(false)}
          >
            <small className="fw-bold">팔로워</small>
          </div>
        </div>
        <hr className="mt-0" />
        <div className="align-items-center flex-column scroll">
          <SocialFollowList
            followListInitial={followList}
            followType={isFollowing}
            onFollow={onFollow}
            authority={authority}
          />
        </div>
      </div>
    </div>
  );
}

export default SocialFollow;
