import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./login/Register";
import SocialPage from "./SocialNetwork/SocialPage";
import MainPage from "./SocialNetwork/MainPage";
import SocialChatPage from "./SocialNetwork/SocialChatPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/socialPage/*" element={<SocialPage />} />
        <Route path="/socialChatPage" element={<SocialChatPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
