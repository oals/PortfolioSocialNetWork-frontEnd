import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SocialFormModal from "../SocialNetwork/Modal/SocialForm";
import SocialNotificationModal from "../SocialNetwork/SocialNotification";
import "../SocialNetwork/Css/SocialPage.css";
import Notification from "../Api/Notification";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HeaderLayout({ newFeed }) {
  const location = useLocation();
  const isSocialPage = location.pathname.includes("/socialPage/");
  let memberId = localStorage.getItem("memberId");

  const [SocialFormOpen, setSocialFormOpen] = useState(false);
  const [SocialNotificationOpen, setSocialNotificationOpen] = useState(false);

  const [notificationEvent, setNotificationEvent] = useState(false);

  const socialFormModal = () => setSocialFormOpen(true);
  const closeFormModal = () => setSocialFormOpen(false);

  const [searchTag, setSearchTag] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8102/notificationChk",
          {
            params: {
              memberId,
            },
          },
        );
        if (response.data) {
          setNotificationEvent(response.data);
        }
      } catch (error) {
        console.log(error);
        alert("잠시 후에 다시 시도해주세요.");
      }
    };

    if (localStorage.getItem("isLoggedIn")) {
      fetchData();
    }
  }, []);

  const socialNotificationModal = () => {
    const notificationViewUpdate = async () => {
      try {
        const response = await axios.put(
          "http://localhost:8102/notificationViewUpdate",
          {
            memberId,
          },
        );
      } catch (error) {
        console.log(error);
        alert("잠시 후에 다시 시도해주세요.");
      }
    };
    if (SocialNotificationOpen) {
      notificationViewUpdate();
    }

    setSocialNotificationOpen(!SocialNotificationOpen);
    setNotificationEvent(false);
  };

  const memberFeed = () => {
    let memberId = localStorage.getItem("memberId");
    navigate(`/socialPage/` + memberId, { state: {} });
  };

  const search = (tagName, e) => {
    if (tagName.length === 0) {
      alert("검색어를 입력해주세요.");
    } else {
      if (tagName.includes("#")) {
        tagName = tagName.replace("#", "");
      }

      navigate(`/socialPage/` + tagName, {
        state: { tagName: tagName },
      });
    }
  };

  const handleOutsideClick = (e) => {
    if (SocialFormOpen == true) {
      closeFormModal();
    }
  };

  const notificationEventListener = () => {
    setNotificationEvent(!notificationEvent);
  };

  const renderIcon = () => {
    if (isSocialPage) {
      // 소셜 페이지 일떄 -> 내 페이지 / 남의 페이지

      if (
        localStorage.getItem("memberId") ===
        location.pathname.replace("/socialPage/", "")
      ) {
        return (
          //내 페이지
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="primary"
            onClick={socialFormModal}
            className="bi bi-plus-square"
            viewBox="0 0 25 25"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        );
      } else {
        return (
          //남의 페이지

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            className="bi bi-person"
            viewBox="0 0 25 25"
            onClick={memberFeed}
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
          </svg>
        );
      }
    } else {
      return (
        //다른 페이지

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          className="bi bi-person"
          viewBox="0 0 25 25"
          onClick={memberFeed}
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>
      );
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {SocialFormOpen && (
        <div className="modalPopUp">
          <SocialFormModal
            onClose={handleOutsideClick}
            newFeed={newFeed}
          ></SocialFormModal>
        </div>
      )}

      {SocialNotificationOpen && (
        <div className="modalPopUp2 index">
          <SocialNotificationModal
            onClose={socialNotificationModal}
          ></SocialNotificationModal>
        </div>
      )}
      <div className="col-3 mt-4 ms-2">
        <Link to="/main" className="headerLogo">
          <span className="fw-bold">SocialStarGram</span>
        </Link>
      </div>

      <div className="col-3 mt-3">
        <input
          type="search"
          className="form-control"
          placeholder="search"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
        ></input>
      </div>
      <div className="col-2 mt-3 ms-1">
        <button
          type="button"
          className="btn btn-light"
          onClick={search.bind(this, searchTag)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            fill="gray"
            className="bi bi-search mb-1"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </div>
      <div className="col-2 mt-3">
        <div>
          <div className=" mt-1">
            {renderIcon()}

            {notificationEvent ? (
              <svg
                onClick={socialNotificationModal}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-bell-fill"
                viewBox="0 0 25 25"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg>
            ) : (
              <svg
                onClick={socialNotificationModal}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-bell ms-1"
                viewBox="0 0 25 25"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
            )}

            <Link to="/socialChatPage" className="text-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-send ms-1"
                viewBox="0 0 25 25"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <Notification onNotification={notificationEventListener} />
    </div>
  );
}
export default HeaderLayout;
