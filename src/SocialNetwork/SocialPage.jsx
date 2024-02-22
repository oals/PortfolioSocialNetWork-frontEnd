import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/SocialPage.css";
import axios from "axios";
import SocialModal from "./Modal/SocialPageItem";
import SocialFollowModal from "./Modal/SocialFollow";
import SocialProfileUpdateModal from "./Modal/SocialProfileUpdateModal";
import HeaderLayout from "../Layout/HeaderLayout";
import { useNavigate } from "react-router-dom";
import SocialPageList from "./List/SocialPageList";

import SocialMyFeedPage from "./SocialMyFeedPage";
import SocialSearchFeedPage from "./SocialSearchFeedPage";

function SocialPage() {
  const [SocialOpen, setSocialOpen] = useState(false);
  const [SocialFollowOpen, setSocialFollowOpen] = useState(false);
  const [SocialProfileUpdateOpen, setSocialProfileUpdateOpen] = useState(false);
  const [feedKey, setFeedKey] = useState("");
  const [searchPageChk, setSearchPageChk] = useState(false);
  const [socialPageData, setSocialPageData] = useState("");
  const [feedData, setFeedData] = useState([]);
  const [authority, setAuthority] = useState(false);
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const target = location.pathname.replace("/socialPage/", "");
  let memberId = localStorage.getItem("memberId");

  useEffect(() => {
    if (location.state) {
      const notificationValue = location.state.feedId;
      if (notificationValue) {
        closeModal();
        closeFollowModal();
        setSocialOpen(true);
        setFeedKey(notificationValue);
      }
      const tagSearchValue = location.state.tagName;
      if (tagSearchValue) {
        setSearchPageChk(true);

        setTag(location.state.tagName);
      } else {
        setSearchPageChk(false);
      }
    }

    window.onbeforeunload = () => {
      navigate(location.pathname, { state: {} });
    };
  }, [location.state]);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      if (target === localStorage.getItem("memberId")) {
        setAuthority(true);
      } else {
        setAuthority(false);
      }
      handleOutsideClick();

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8102/getFeedInfo",
            {
              params: {
                target,
                memberId,
              },
            },
          );
          if (response.data != null) {
            setFeedData(response.data.feedListDTOS);
            setSocialPageData(response.data);
          }
        } catch (error) {
          alert("잠시 후에 다시 시도해주세요.");
        }
      };

      const fetchSearchData = async (tagName) => {
        try {
          const response = await axios.get("http://localhost:8102/searchTag", {
            params: {
              tagName,
            },
          });
          if (response.data != null) {
            setFeedData(response.data);
          }
        } catch (error) {
          alert("잠시 후에 다시 시도해주세요.");
        }
      };

      if (location.state && location.state.tagName) {
        fetchSearchData(location.state.tagName);
      } else {
        fetchData();
      }
    } else {
      navigate("/");
    }
  }, [target]);

  const socialModal = (feedKey) => {
    setSocialOpen(true);
    setFeedKey(feedKey);
  };

  const closeModal = () => setSocialOpen(false);

  const socialFollowModal = () => setSocialFollowOpen(true);
  const closeFollowModal = () => setSocialFollowOpen(false);

  const socialProfileUpdateModal = () => setSocialProfileUpdateOpen(true);
  const closeSocialProfileUpdateModal = () => setSocialProfileUpdateOpen(false);

  const onUpdate = (
    memberName,
    memberJobTitle,
    memberSchoolName,
    memberProfileImage,
  ) => {
    const updatedData = {
      ...socialPageData,
      memberName: memberName ? memberName : socialPageData.memberName,
      memberJobTitle: memberJobTitle
        ? memberJobTitle
        : socialPageData.memberJobTitle,
      memberSchoolName: memberSchoolName
        ? memberSchoolName
        : socialPageData.memberSchoolName,
      memberProfileImage: memberProfileImage
        ? memberProfileImage
        : socialPageData.memberProfileImage,
    };

    setSocialPageData(updatedData);
    closeSocialProfileUpdateModal();
  };

  const handleOutsideClick = (e) => {
    if (SocialOpen == true) {
      closeModal();
    }

    if (SocialFollowOpen == true) {
      closeFollowModal();
    }

    if (SocialProfileUpdateOpen == true) {
      closeSocialProfileUpdateModal();
    }
  };

  const uploadFeedListUpdate = (newFeed) => {
    setFeedData((prevFeed) => [...prevFeed, newFeed]);
  };

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

        //로그인된 계정과 현재 페이지의 아이디가 같을 때 if else 문
        if (authority) {
          if (opt) {
            setSocialPageData({
              ...socialPageData,
              followCount: socialPageData.followCount + 1,
            });
          } else {
            setSocialPageData({
              ...socialPageData,
              followCount: socialPageData.followCount - 1,
            });
          }
        } else {
          if (opt) {
            // 다른 페이지의 팔로우 시해당 계정의 팔로워 + 혹은 언팔시 - 기능
            setSocialPageData({
              ...socialPageData,
              followerCount: socialPageData.followerCount + 1,
              followChk: opt,
            });
          } else {
            setSocialPageData({
              ...socialPageData,
              followerCount: socialPageData.followerCount - 1,
              followChk: opt,
            });
          }
        }
      }
    } catch (error) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const sendMessage = (e, memberId) => {
    navigate(`/socialChatPage`, {
      state: { chatMemberId: memberId },
    });
  };

  const onComment = (feedId, opt) => {
    setFeedData(
      feedData.map((feed) =>
        feed.feedId === feedId
          ? {
              ...feed,
              feedCommentCount: opt
                ? feed.feedCommentCount + 1
                : feed.feedCommentCount - 1,
            }
          : feed,
      ),
    );
  };

  const onLike = (feedId, opt) => {
    console.log("onlike 실행");
    setFeedData(
      feedData.map((feed) =>
        feed.feedId === feedId
          ? {
              ...feed,
              feedLikeCount: opt
                ? feed.feedLikeCount + 1
                : feed.feedLikeCount - 1,
            }
          : feed,
      ),
    );
  };

  return (
    <div>
      {SocialOpen && (
        <div className="modalPopUp">
          <SocialModal
            feedKey={feedKey}
            onLike={onLike}
            onComment={onComment}
            pageChk={false}
          ></SocialModal>
        </div>
      )}

      {SocialFollowOpen && (
        <div className="modalPopUp3">
          <SocialFollowModal
            onFollow={followClick}
            authority={authority}
          ></SocialFollowModal>
        </div>
      )}

      {SocialProfileUpdateOpen && (
        <div className="modalPopUp3">
          <SocialProfileUpdateModal
            profileImage={socialPageData.memberProfileImage}
            name={socialPageData.memberName}
            job={socialPageData.memberJobTitle}
            school={socialPageData.memberSchoolName}
            onUpdate={onUpdate}
            onClose={closeSocialProfileUpdateModal}
          ></SocialProfileUpdateModal>
        </div>
      )}

      <div>
        {searchPageChk ? (
          <SocialSearchFeedPage
            handleOutsideClick={handleOutsideClick}
            socialModal={socialModal}
            tagName={tag}
            feedData={feedData}
          ></SocialSearchFeedPage>
        ) : (
          <SocialMyFeedPage
            sendMessage={sendMessage}
            followClick={followClick}
            uploadFeedListUpdate={uploadFeedListUpdate}
            handleOutsideClick={handleOutsideClick}
            socialProfileUpdateModal={socialProfileUpdateModal}
            socialFollowModal={socialFollowModal}
            socialModal={socialModal}
            feedData={feedData}
            socialPageData={socialPageData}
            authority={authority}
          ></SocialMyFeedPage>
        )}
      </div>
    </div>
  );
}

export default SocialPage;
