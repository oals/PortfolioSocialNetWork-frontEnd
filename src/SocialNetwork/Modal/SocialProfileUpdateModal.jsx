import React, { useState, useRef } from "react";
import "../Css/SocialForm.css";
import axios from "axios";

function SocialProfileUpdateModal({
  profileImage,
  name,
  job,
  school,
  onUpdate,
  onClose,
}) {
  const fileInput = useRef();
  const [profileImageUpdateChk, setProfileImageUpdateChk] = useState(false);
  const [files, setFiles] = useState(null);
  const [images, setImages] = useState(
    `http://localhost:8102/imageMapping?imageName=${profileImage}`,
  );

  const [memberName, setMemberName] = useState(name);
  const [memberJobTitle, setMemberJobTitle] = useState(job);
  const [memberSchoolName, setMemberSchoolName] = useState(school);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (profileImageUpdateChk) {
      formData.append("memberProfileImage", files);
    }

    let memberId = localStorage.getItem("memberId");

    formData.append("memberId", memberId);
    formData.append("memberName", memberName);
    formData.append("memberJobTitle", memberJobTitle);
    formData.append("memberSchoolName", memberSchoolName);

    try {
      const response = await axios.put(
        "http://localhost:8102/updateProfileImage",
        formData,
      );

      if (response.data) {
        alert("프로필 변경 성공");
        onUpdate(memberName, memberJobTitle, memberSchoolName, response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files[0]);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages(reader.result);
      setProfileImageUpdateChk(true);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="border rounded bg-light p-3">
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center">
          <div className="col-6">
            <div className="align-items-center flex-column">
              <div className="d-flex justify-content-center">
                <img
                  src={images}
                  width="150px"
                  height="150px"
                  className="rounded-circle"
                />
              </div>

              <input
                type="file"
                multiple
                className="hiddenInput"
                onChange={handleFileChange}
                ref={fileInput}
              />

              <div className="d-flex justify-content-center mt-2">
                <span className="text-center" onClick={handleButtonClick}>
                  <button
                    type="button"
                    className="btn btn-light border rounded"
                  >
                    프로필 이미지 변경
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="align-items-center flex-column">
              <div>
                <input
                  type="text"
                  className="form-control w-100 mt-2"
                  placeholder="이름"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control w-100 mt-2"
                  placeholder="직업"
                  value={memberJobTitle}
                  onChange={(e) => setMemberJobTitle(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="form-control w-100 mt-2"
                  placeholder="학교"
                  value={memberSchoolName}
                  onChange={(e) => setMemberSchoolName(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-end mt-2">
                <button type="submit" className="btn btn-primary">
                  번경
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={onClose}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SocialProfileUpdateModal;
