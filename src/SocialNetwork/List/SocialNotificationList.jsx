import React from "react";
import { useNavigate } from "react-router-dom";

function SocialNotificationList({ notificationList, onClose }) {
  const navigate = useNavigate();

  const notificationTextMessage = (typeNo) => {
    let notificationMessage = "";
    if (typeNo == 1) {
      notificationMessage = "님이 좋아요를 눌렀습니다.";
    } else if (typeNo == 2) {
      notificationMessage = "님이 댓글을 남겼습니다.";
    } else if (typeNo == 3) {
      notificationMessage = "님이 팔로우 하였습니다.";
    } else if (typeNo == 4) {
      notificationMessage = "님이 메세지를 보냈습니다.";
    }

    return notificationMessage;
  };

  const notificationItem = (notificationItem, e) => {
    console.log(notificationItem);

    if (notificationItem.notificationMessageType === 1) {
      onClose();
      navigate(`/socialPage/${notificationItem.readMemberId}`, {
        state: { feedId: notificationItem.likeFeedId },
      });
    } else if (notificationItem.notificationMessageType === 2) {
      onClose();
      navigate(`/socialPage/${notificationItem.readMemberId}`, {
        state: { feedId: notificationItem.commentFeedId },
      });
    } else if (notificationItem.notificationMessageType === 3) {
      onClose();
      navigate(`/socialPage/${notificationItem.followMemberId}`);
    } else if (notificationItem.notificationMessageType === 4) {
      onClose();
      navigate(`/socialChatPage`, {
        state: { chatMemberId: notificationItem.sendMemberId },
      });
    }
  };

  return (
    <div>
      {notificationList.map((notification) => (
        <div
          key={notification.notificationNo}
          className="d-flex justify-content-center mb-3"
          onClick={notificationItem.bind(this, notification)}
        >
          <div className="col-12">
            <img
              src={`http://localhost:8102/imageMapping?imageName=${notification.sendMemberProfileImage}`}
              width="27px"
              height="27px"
              className=" ms-2 mb-1 rounded-circle"
            ></img>
            <small className="ms-1 fw-bold">{notification.sendMemberId}</small>
            {notification.viewChk == true ? (
              <small className="text-secondary">
                {notificationTextMessage(notification.notificationMessageType)}
              </small>
            ) : (
              <small className="fw-bold">
                {notificationTextMessage(notification.notificationMessageType)}
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SocialNotificationList;
