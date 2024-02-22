import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "../Css/SocialPage.css";
import axios from "axios";
import SocialFeedCommentList from "../List/SocialFeedCommentList";
import Notification from "../../Api/Notification";
import { useNavigate } from "react-router-dom";

function SocialPageItem({ feedKey, onLike, onComment, pageChk }) {
  let memberId = localStorage.getItem("memberId");
  const [feedItemData, setFeedItemData] = useState("");
  const [feedLikeChk, setFeedLikeChk] = useState(true); // 초기값을 null로 설정
  const [feedCommentContent, setFeedCommentContent] = useState("");
  const [feedCommentList, setFeedCommentList] = useState([]);
  const navigate = useNavigate();

  const searchTag = (tagName, e) => {
    navigate(`/socialPage/` + tagName, {
      state: { tagName: tagName },
    });
  };

  const memberFeed = (memberId, e) => {
    navigate(`/socialPage/` + memberId, { state: {} });
  };

  const getFeedItem = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8102/getFeedItemInfo",
        {
          params: {
            feedKey,
            memberId,
          },
        },
      );
      if (response.data) {
        setFeedItemData(response.data);
        setFeedLikeChk(response.data.feedLikeChK);
        setFeedCommentList(response.data.feedCommentList);
      }
    } catch (error) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    getFeedItem();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트가 마운트될 때 한 번만 호출

  const uploadComment = async (feedId, memberId, feedCommentContent) => {
    try {
      const response = await axios.post(
        "http://localhost:8102/uploadFeedComment",
        {
          feedId,
          memberId,
          feedCommentContent,
        },
      );
      if (response.data != null) {
        alert("댓글 작성 완료");
        setFeedCommentContent("");
        onComment(feedId, true);

        setFeedCommentList((prevComments) => [...prevComments, response.data]);
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const likeFeed = async (feedId, opt) => {
    let response;
    try {
      const url = opt
        ? "http://localhost:8102/FeedLike"
        : "http://localhost:8102/delFeedLike";
      const method = opt ? "post" : "delete";
      const data = {
        feedId,
        memberId,
      };

      response = await axios({
        method,
        url,
        data,
      });

      if (response.data) {
        setFeedLikeChk(opt);
        if (opt) {
          setFeedItemData({
            ...feedItemData,
            feedLikeCount: feedItemData.feedLikeCount + 1,
          });
          onLike(feedItemData.feedId, opt);
        } else {
          setFeedItemData({
            ...feedItemData,
            feedLikeCount: feedItemData.feedLikeCount - 1,
          });
          onLike(feedItemData.feedId, opt);
        }
      }
    } catch (error) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  return (
    <div>
      {pageChk ? (
        <div className="align-items-center mb-5 flex-column border rounded">
          <div className="d-flex justfiy-content-center">
            <div className="col-4 mt-2">
              <img
                src={`http://localhost:8102/imageMapping?imageName=${feedItemData.memberProfileImage}`}
                width="30px"
                height="30px"
                className="ms-2 rounded-circle"
              ></img>

              <small
                className="fw-bold ms-2"
                onClick={memberFeed.bind(this, feedItemData.memberId)}
              >
                {feedItemData.memberId}
              </small>
            </div>
            <div className="col-8"></div>
          </div>
          <hr className="mt-1" />
          <div>
            <Carousel>
              {feedItemData.feedImageList &&
                feedItemData.feedImageList.map((image, index) => (
                  <Carousel.Item key={image.feedImageNo}>
                    <img
                      src={`http://localhost:8102/imageMapping?imageName=${image.feedImage}`}
                      className="w-100"
                      height="500px"
                    ></img>
                  </Carousel.Item>
                ))}
            </Carousel>
          </div>
          <hr className="mt-1" />
          <div className="ms-2">
            <div className="align-itmes-center flex-column">
              <div>
                <div className="d-flex justify-content-center">
                  <div className="col-2">
                    {feedLikeChk ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="red"
                        className="bi bi-heart-fill"
                        viewBox="0 0 25 25"
                        onClick={() => likeFeed(feedItemData.feedId, false)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-heart"
                        viewBox="0 0 25 25"
                        onClick={() => likeFeed(feedItemData.feedId, true)}
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                    )}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-chat-right"
                      viewBox="0 0 25 25"
                    >
                      <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      className="bi bi-send"
                      viewBox="0 0 25 25"
                    >
                      <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                    </svg>
                  </div>

                  <div className="col-10"></div>
                </div>
              </div>
              <div>
                <small className="fw-bold">
                  좋아요 {feedItemData.feedLikeCount}개
                </small>
              </div>
              <hr className="mt-1" />
              <div className="p-2 pt-0 scroll2">
                <div className="w-100">
                  <div className="d-flex justify-content-end">
                    <div className="col-1 mt-1 ms-1 text-center">
                      <img
                        src={`http://localhost:8102/imageMapping?imageName=${feedItemData.memberProfileImage}`}
                        width="30px"
                        height="30px"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-11 mt-2 ms-1">
                      <small
                        className="fw-bold"
                        onClick={memberFeed.bind(this, feedItemData.memberId)}
                      >
                        {feedItemData.memberId}
                      </small>
                      <span className="ms-2 mx-2">
                        {feedItemData.feedContent}
                      </span>

                      {feedItemData.feedTagList &&
                        feedItemData.feedTagList.map((tag, index) => (
                          <span
                            className="text-primary"
                            key={index}
                            onClick={searchTag.bind(this, tag.feedTagName)}
                          >
                            #{tag.feedTagName}{" "}
                          </span>
                        ))}

                      <br />
                      <small>
                        {feedItemData.feedDate}

                        <span className="ms-1">답글 달기</span>
                      </small>
                    </div>
                  </div>
                </div>
                <div className="w-100 ">
                  <SocialFeedCommentList
                    feedCommentList={feedCommentList}
                    memberFeed={memberFeed}
                  ></SocialFeedCommentList>
                </div>
              </div>
              <hr className="mb-0" />
              <div>
                <div className="input-group mb-0 p-1">
                  <input
                    type="text"
                    className="form-control inputForm"
                    placeholder="댓글 달기..."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={feedCommentContent}
                    onChange={(e) => setFeedCommentContent(e.target.value)}
                  ></input>
                  <button
                    className="btn btn-light border text-primary"
                    type="button"
                    id="button-addon2"
                    onClick={() =>
                      uploadComment(
                        feedItemData.feedId,
                        memberId,
                        feedCommentContent,
                      )
                    }
                  >
                    작성
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-3 rounded">
          <div className="d-flex justify-content-center">
            <div className="col-6 text-center bg-dark d-flex align-items-center justify-content-center">
              <Carousel>
                {feedItemData.feedImageList &&
                  feedItemData.feedImageList.map((image, index) => (
                    <Carousel.Item key={image.feedImageNo}>
                      <img
                        src={`http://localhost:8102/imageMapping?imageName=${image.feedImage}`}
                      ></img>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <div className="col-6 bg-light">
              <div className="align-items-center flex-column ">
                <div>
                  <div className="d-flex justify-content-center">
                    <div className="col-1 mt-1 ms-3">
                      <img
                        src={`http://localhost:8102/imageMapping?imageName=${feedItemData.memberProfileImage}`}
                        width="30px"
                        height="30px"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-11 mt-2 ms-1">
                      <small
                        className="fw-bold ms-2"
                        onClick={memberFeed.bind(this, feedItemData.memberId)}
                      >
                        {feedItemData.memberId}
                      </small>
                    </div>
                  </div>
                </div>
                <hr className="mb-0" />

                <div className="scroll1 border">
                  <div className="align-items-center flex-column">
                    <div>
                      <div className="d-flex justify-content-end">
                        <div className="col-1 mt-1 ms-3 text-center">
                          <img
                            src={`http://localhost:8102/imageMapping?imageName=${feedItemData.memberProfileImage}`}
                            width="30px"
                            height="30px"
                            className="rounded-circle"
                          />
                        </div>
                        <div className="col-11 mt-2 ms-1">
                          <small
                            className="fw-bold "
                            onClick={memberFeed.bind(
                              this,
                              feedItemData.memberId,
                            )}
                          >
                            {feedItemData.memberId}
                          </small>
                          <span className="ms-2 mx-2">
                            {feedItemData.feedContent}
                          </span>

                          {feedItemData.feedTagList &&
                            feedItemData.feedTagList.map((tag, index) => (
                              <span
                                className="text-primary"
                                key={index}
                                onClick={searchTag.bind(this, tag.feedTagName)}
                              >
                                #{tag.feedTagName}{" "}
                              </span>
                            ))}

                          <br />
                          <small>
                            {feedItemData.feedDate}

                            <span className="ms-1">답글 달기</span>
                          </small>
                        </div>
                      </div>
                    </div>

                    <SocialFeedCommentList
                      feedCommentList={feedCommentList}
                      memberFeed={memberFeed}
                    />
                  </div>
                </div>

                <div className="align-itmes-center flex-column">
                  <div>
                    <div className="d-flex justify-content-center ms-2 mt-2">
                      <div className="col-12">
                        {feedLikeChk ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="red"
                            className="bi bi-heart-fill"
                            viewBox="0 0 25 25"
                            onClick={() => likeFeed(feedItemData.feedId, false)}
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            className="bi bi-heart"
                            viewBox="0 0 25 25"
                            onClick={() => likeFeed(feedItemData.feedId, true)}
                          >
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                          </svg>
                        )}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-chat-right"
                          viewBox="0 0 25 25"
                        >
                          <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                        </svg>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-send"
                          viewBox="0 0 25 25"
                        >
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <small className="fw-bold ms-2">
                      좋아요 {feedItemData.feedLikeCount}개
                    </small>
                  </div>
                  <hr className="mt-1 mb-0" />

                  <div>
                    <div className="input-group mb-0 p-1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="댓글 달기..."
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        value={feedCommentContent}
                        onChange={(e) => setFeedCommentContent(e.target.value)}
                      ></input>
                      <button
                        className="btn btn-light border text-primary"
                        type="button"
                        id="button-addon2"
                        onClick={() =>
                          uploadComment(
                            feedItemData.feedId,
                            memberId,
                            feedCommentContent,
                          )
                        }
                      >
                        작성
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SocialPageItem;
