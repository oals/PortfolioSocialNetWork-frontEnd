import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./Register.css";
import AddressComponent from "../Api/AddressApi";

function Register() {
  const [memberId, setMemberId] = useState("");
  const [memberPswd, setMemberPswd] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberJobTitle, setMemberJobTitle] = useState("");
  const [memberSchoolName, setMemberSchoolName] = useState("");
  const [memberAddressZoneCode, setMemberAddressZoneCode] = useState("");
  const [memberAddressRoad, setMemberAddressRoad] = useState("");
  const [memberAddressInfo, setMemberAddressInfo] = useState("");

  const [memberDate, setMemberDate] = useState("");
  const [showPostcode, setShowPostcode] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let memberAddress =
        memberAddressZoneCode +
        " " +
        memberAddressRoad +
        " " +
        memberAddressInfo;

      const response = await axios.post("http://localhost:8102/register", {
        memberId,
        memberPswd,
        memberEmail,
        memberName,
        memberPhone,
        memberAddress,
        memberJobTitle,
        memberSchoolName,
        memberDate,
      });

      if (response.data) {
        alert("회원가입 되었습니다.");

        navigate("/");
      } else {
        alert("ㅁㄴ럼ㄴㄻㄹ");
      }
    } catch (error) {
      console.log(error);
      alert("잠시 후에 다시 시도해주세요.");
    }
  };

  const saveAddress = (zoneCode, address) => {
    setMemberAddressZoneCode(zoneCode);
    setMemberAddressRoad(address);
    setShowPostcode(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="w-100 border">
          <div className="d-flex justify-content-center">
            <div className="col-4"></div>
            <div className="col-3 border div rounded text-center mt-5">
              <div className="align-items-center flex-column container">
                <div className="mt-3 mb-3">
                  <h3 className="fw-bold text-center">SocialStarGram</h3>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control w-100"
                    placeholder="사용자 이름 또는 이메일"
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

                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="이메일"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="성명"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="생년월일"
                    value={memberDate}
                    onChange={(e) => setMemberDate(e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="직업"
                    value={memberJobTitle}
                    onChange={(e) => setMemberJobTitle(e.target.value)}
                  />

                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="학교"
                    value={memberSchoolName}
                    onChange={(e) => setMemberSchoolName(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control w-100 mt-2"
                      placeholder="우편번호"
                      value={memberAddressZoneCode}
                      onChange={(e) => setMemberAddressZoneCode(e.target.value)}
                    />
                  </div>
                  <div className="col-6 mt-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setShowPostcode(!showPostcode)}
                    >
                      주소 검색
                    </button>
                    {showPostcode && (
                      <div>
                        <AddressComponent onInput={saveAddress} />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="도로명 주소"
                    value={memberAddressRoad}
                    onChange={(e) => setMemberAddressRoad(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="상세 주소"
                    value={memberAddressInfo}
                    onChange={(e) => setMemberAddressInfo(e.target.value)}
                  />
                </div>

                <hr />
                <div>
                  <input
                    type="text"
                    className="form-control w-100 mt-2"
                    placeholder="전화번호"
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                  />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-dark w-100 mt-2 mb-2"
                  >
                    인증번호 받기
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="col-6">
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-6">
                    <button type="button" className="btn btn-primary ms-4 w-75">
                      인증하기
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="fw-bold">
                    저희 서비스를 이용하는 사람이 회원님의 연락처 정보를
                    Instagram에 업로드했을 수도 있습니다. 더 알아보기
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <button type="submit" className="btn btn-outline-primary w-100">
                  가입하기
                </button>
              </div>
            </div>

            <div className="col-4"></div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
