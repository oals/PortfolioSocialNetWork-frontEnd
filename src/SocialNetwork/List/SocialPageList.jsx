import React, { useState } from "react";
import "../Css/SocialPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SocialPageList({ feedList, onModal }) {
  const handleModalClick = (feedId) => {
    onModal(feedId);
  };

  return (
    <div className="d-flex flex-wrap justify-content-start mb-2">
      {feedList.map((feed) => (
        <div
          key={feed.feedId}
          className="flex-grow-1 div1 border itemHover d-flex align-items-center justify-content-center"
          style={{ maxWidth: "33.33%" }}
          onClick={() => handleModalClick(feed.feedId)}
        >
          <img
            src={`http://localhost:8102/imageMapping?imageName=${feed.feedThumnailImage}`}
            alt="Feed Thumbnail"
            className="rounded align-center h-100 w-100 "
          />
          <div className="hiddenItemHover">
            <div className="align-items-center d-flex justify-content-center">
              <div className="itemText fw-bold mx-2">
                <svg
                  className="mx-2 bi bi-heart-fill"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
                <span>{feed.feedLikeCount}</span>
              </div>
              <div className="itemText fw-bold ms-2">
                <svg
                  className="mx-2 bi bi-chat-right-fill"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 0a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                </svg>
                <span>{feed.feedCommentCount}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SocialPageList;
