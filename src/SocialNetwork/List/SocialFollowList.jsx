import React, { useState, useEffect } from "react";
import "../Css/SocialChatPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function SocialFollowList({
  followListInitial,
  followType,
  onFollow,
  authority,
  selectMember,
}) {
  const [followList, setFollowList] = useState([]);
  let memberId = localStorage.getItem("memberId");

  useEffect(() => {
    setFollowList(followListInitial);
  }, [followListInitial]);

  const selectClick = (memberId, e) => {
    selectMember(memberId);
  };

  const handleFollow = (opt, followItem, e) => {
    if (opt) {
      onFollow(followItem.memberId, memberId, true);
      followItem.followingBackChk = true;
    } else {
      onFollow(followItem.memberId, memberId, false);
      const updatedFollowList = followList.filter(
        (item) => item.memberId !== followItem.memberId,
      );
      setFollowList(updatedFollowList);
    }
  };

  return (
    <div>
      {followList.map((followItem) => (
        <div
          key={followItem.memberId}
          className="d-flex justify-content-start mt-2 ms-1 border rounded p-1"
          onDoubleClick={selectClick.bind(this, followItem.memberId)}
        >
          <div className="col-1">
            <img
              src={`http://localhost:8102/imageMapping?imageName=${followItem.memberProfileImage}`}
              width="30px"
              height="30px"
              className=" rounded-circle"
            ></img>
          </div>
          <div className="col-8 ms-4 mt-1">
            <Link
              to={`/socialPage/${followItem.memberId}`}
              className="followMember"
            >
              <small className="fw-bold">{followItem.memberId}</small>
            </Link>
          </div>
          <div className="col-3">
            {authority ? (
              followType ? (
                <button
                  className="btn btn-light fw-bold"
                  onClick={handleFollow.bind(null, false, followItem)}
                >
                  <small>언팔로우</small>
                </button>
              ) : followItem.followingBackChk ? ( //팔로워 리스트
                <button
                  className="btn btn-light fw-bold"
                  onClick={handleFollow.bind(null, false, followItem)}
                >
                  <small>언팔로우</small>
                </button>
              ) : (
                <button
                  className="btn btn-light fw-bold"
                  onClick={handleFollow.bind(null, true, followItem)}
                >
                  <small>맞팔하기</small>
                </button>
              )
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SocialFollowList;
