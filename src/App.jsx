import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

function App() {
  const [memberId, setMemberId] = useState("");
  const [memberPswd, setMemberPswd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8102/login", {
        memberId,
        memberPswd,
      });
      if (response.data) {
        alert("로그인 성공");
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("memberId", memberId);

        navigate("/main");
      } else {
        alert("아이디 혹은 비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mt-3 w-100 h-100">
        <span className="text-center fw-bold">SocialStarGram</span>
        <hr className="mb-5" />
        <div className="align-items-center flex-column">
          <div className="mt-5 mb-5">
            <div className="d-flex justify-content-center mt-5 mt-5 heigth">
              <div className="col-3"></div>
              <div className="col-3  text-center mt-5">
                <img src="../screenshot3.png" className="border rounded" />
              </div>

              <div className="col-3 border rounded text-center mt-5">
                <div className="align-items-center flex-column container">
                  <div className="mt-5 mb-3">
                    <h3 className="fw-bold text-center">SocialStarGram</h3>
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="전화번호, 사용자 이름 또는 이메일"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                    />
                    <input
                      type="password"
                      className="form-control w-100 mt-2"
                      placeholder="비밀번호"
                      value={memberPswd}
                      onChange={(e) => setMemberPswd(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="btn btn-outline-primary w-100"
                    >
                      로그인
                    </button>
                  </div>
                  <hr />

                  <div className="d-flex justify-content-center">
                    <div className="col-6">
                      <span>아이디 찾기</span>
                    </div>
                    <div className="col-6">
                      <span>비밀번호 찾기</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span>
                      계정이 없으신가요?
                      <Link to="/register">가입하기</Link>
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-3"></div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </form>
  );
}

export default App;
