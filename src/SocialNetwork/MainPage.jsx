import React, { useState, useEffect } from "react";
import "./Css/MainPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import HeaderLayout from "../Layout/HeaderLayout";
import SocialPageItem from "./Modal/SocialPageItem";
import axios from "axios";
import ResizedImage from "../Api/ResizedImage";
import MainPageFollowList from "./List/MainPageFollowList";
// import imagePath from "./screenshot3.png";

function MainPage() {
  const [mainFeedLimit, setMainFeedLimit] = useState(5);
  const [mainFeedList, setMainFeedList] = useState([]);
  const [mainFollowList, setMainFollowList] = useState([]);

  let memberId = localStorage.getItem("memberId");
  const MainFeed = async () => {
    try {
      const response = await axios.get("http://localhost:8102/mainFeed", {
        params: {
          mainFeedLimit,
          memberId,
        },
      });
      if (response.data != null) {
        console.log(response.data);
        setMainFeedList(response.data);
      } else {
        console.log("데이터 없음");
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const mainFollow = async () => {
    try {
      const response = await axios.get("http://localhost:8102/mainFollow", {
        params: {
          memberId,
        },
      });
      if (response.data != null) {
        console.log(response.data);
        setMainFollowList(response.data);
      } else {
        console.log("데이터 없음");
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    MainFeed();
    mainFollow();
  }, []);

  const followClick = async (followMember, followerMember, opt, e) => {
    let response;
    try {
      const url = opt
        ? "http://localhost:8102/followMember"
        : "http://localhost:8102/unFollowMember";
      const method = opt ? "post" : "delete";
      const data = {
        followMember,
        followerMember,
      };

      response = await axios({
        method,
        url,
        data,
      });

      if (response.data != null) {
        alert("성공");
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const onComment = (feedId, opt) => {};
  const onLike = (feedId, opt) => {};

  return (
    <div>
      <HeaderLayout></HeaderLayout>

      <hr className="mt-0" />
      <div className="container">
        <div className="d-flex justfiy-content-center">
          <div className="col-9">
            {mainFeedList.map((mainFeed) => (
              <div key={mainFeed}>
                <SocialPageItem
                  feedKey={mainFeed}
                  onLike={onLike}
                  onComment={onComment}
                  pageChk={true}
                />
              </div>
            ))}
          </div>

          <div className="col-3 border rounded ms-3 divHeight">
            <div className="align-items-center flex-column">
              <div className="text-center p-1">
                <small className="fw-bold">회원님을 위한 팔로우 추천</small>
              </div>
              <hr className="mt-0 mb-0 " />
              <div className="divHeight2">
                <div className="align-items-center flex-column">
                  <MainPageFollowList
                    followList={mainFollowList}
                    followClick={followClick}
                  ></MainPageFollowList>
                </div>
              </div>
              <hr className="mt-0 mb-0" />
              <div className="text-center p-1">
                <small className="fw-bold ">SocialStarGram</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
