import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/MainPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MainPageFollowList({ followList, followClick }) {
  const [followingBackChk, setFollowingBackChk] = useState(false);

  const followOrUnfollow = (followItem, opt, e) => {
    let memberId = localStorage.getItem("memberId");

    followClick(followItem.memberId, memberId, opt);

    setFollowingBackChk((prevState) => ({
      ...prevState,
      [followItem.memberId]: opt,
    }));
  };

  return (
    <div>
      {followList.map((followItem) => (
        <div
          key={followItem.memberId}
          className="d-flex justify-content-cetner"
        >
          <div className="col-2">
            <img
              src={`http://localhost:8102/imageMapping?imageName=${followItem.memberProfileImage}`}
              width="30px"
              height="30px"
              className="mt-1 ms-2 rounded-circle"
            ></img>
          </div>
          <div className="col-8">
            <div className="align-items-center flex-column">
              <div className="mt-1 mb-0">
                <Link
                  to={`/socialPage/${followItem.memberId}`}
                  className="followMember"
                >
                  <small className="fw-bold ">{followItem.memberId}</small>
                </Link>
              </div>
              <div className="mt-0">
                <small className="fw-bold text-secondary">
                  오민규님 외 4명과 팔로우
                </small>
              </div>
            </div>
          </div>
          <div className="col-2 mt-2">
            {!followingBackChk[followItem.memberId] ? (
              <small
                className="text-center align-items-center text-primary fw-bold followhover"
                onClick={followOrUnfollow.bind(this, followItem, true)}
              >
                팔로우
              </small>
            ) : (
              <small
                className="text-center align-items-center text-primary fw-bold followhover"
                onClick={followOrUnfollow.bind(this, followItem, false)}
              >
                언팔로우
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainPageFollowList;
