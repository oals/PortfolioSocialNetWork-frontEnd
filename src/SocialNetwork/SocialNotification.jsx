import React, { useState, useEffect } from "react";
import "./Css/SocialNotification.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import SocialNotificationList from "./List/SocialNotificationList";

function SocialNotification({ onClose }) {
  let memberId = localStorage.getItem("memberId");
  const [notificationList, setNotificationList] = useState([]);

  const myNotification = async () => {
    try {
      const response = await axios.get("http://localhost:8102/myNotification", {
        params: {
          memberId,
        },
      });
      if (response.data) {
        console.log(response.data);
        setNotificationList(response.data);
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    myNotification();
  }, []);

  //해당 멤버의 알림창에 있는 내용 다 가져오기

  return (
    <div className="border rounded scroll bg-light">
      <div className="align-items-center flex-column">
        <div className="text-center">
          <span className="fw-bold">알림</span>
        </div>
        <hr className="mt-1 mb-1" />
        <SocialNotificationList
          notificationList={notificationList}
          onClose={onClose}
        ></SocialNotificationList>
      </div>
    </div>
  );
}

export default SocialNotification;
