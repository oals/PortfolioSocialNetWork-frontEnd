import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function SocialFeedCommentList({ feedCommentList, memberFeed }) {
  const feedMove = (memberId, e) => {
    memberFeed(memberId, e);
  };

  return (
    <div className="text-wrap">
      {feedCommentList.map((feedCommentItem) => (
        <div
          key={feedCommentItem.feedCommentId}
          className="d-flex justify-content-end"
        >
          <div className="col-1 mt-1 ms-3 text-center">
            <img
              src={`http://localhost:8102/imageMapping?imageName=${feedCommentItem.memberProfileImage}`}
              width="30px"
              height="30px"
              className="rounded-circle"
            />
          </div>
          <div className="col-11 mt-2 ms-1 ">
            <small
              className="fw-bold"
              onClick={feedMove.bind(this, feedCommentItem.memberId)}
            >
              {feedCommentItem.memberId}
            </small>

            <span className="ms-2 mx-2 ">
              {feedCommentItem.feedCommentContent}
            </span>

            <br />
            <small>
              {feedCommentItem.feedCommentDate}

              <span className="ms-1">답글 달기</span>
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SocialFeedCommentList;
