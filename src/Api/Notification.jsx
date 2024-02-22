import React, { useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import HeaderLayout from "../Layout/HeaderLayout";

function Notification({ onNotification }) {
  let client;

  const connectWebSocket = () => {
    client = new W3CWebSocket("ws://localhost:8102/websocketpath");

    client.onopen = () => {
      console.log("WebSocket Client Connected");
      client.send("Hello from React");
    };

    client.onmessage = (message) => {
      //알림을 받을 사람
      let memberId = localStorage.getItem("memberId");
      let messageData = JSON.parse(message.data);

      if (messageData.sendMemberId !== messageData.readMemberId) {
        if (memberId === messageData.readMemberId) {
          onNotification();
        }
      }
    };

    client.onclose = (e) => {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason,
      );
      setTimeout(() => {
        // connectWebSocket();
      }, 3000);
    };

    // client.onerror = (err) => {
    //   console.error(
    //     "Socket encountered error: ",
    //     err.message,
    //     "Closing socket",
    //   );
    //   client.close();
    // };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      client.close();
    };
  }, []);

  return <div></div>;
}

export default Notification;
