import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import "../Css/SocialForm.css";

function SocialForm({ onClose, newFeed }) {
  const fileInput = useRef();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [feedContent, setFeedContent] = useState("");
  const [feedContentTag, setFeedContentTag] = useState("");

  const [imageGroups, setImageGroups] = useState([]);

  const handleButtonClick = () => {
    fileInput.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedContent) {
      const formData = new FormData();

      if (files.length !== 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("imageFiles", files[i]);
        }
      }

      let memberId = localStorage.getItem("memberId");

      formData.append("memberId", memberId);
      formData.append("feedContent", feedContent);
      formData.append("feedContentTag", feedContentTag);

      try {
        const response = await axios.post(
          "http://localhost:8102/uploadFeed",
          formData,
        );

        console.log(response.data);
        if (response.data != null) {
          alert("업로드 성공");
          onClose();
          newFeed(response.data);
        }
      } catch (error) {
        alert("업로드 실패");
        console.error(error);
      }
    } else {
      alert("내용을 입력해주세요.");
    }
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
    const files = Array.from(event.target.files);
    console.log(files);

    const imagePromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)

      .then((images) => {
        setImages(images);

        const newImageGroups = [];
        for (let i = 0; i < images.length; i += 5) {
          newImageGroups.push(images.slice(i, i + 5));
        }

        setImageGroups(newImageGroups); // 이미지 그룹을 새로운 상태로 설정합니다.
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border border-3 rounded div4 bg-light">
        <div className="d-flex justify-content-center">
          <div className="col-6 text-center ">
            <div className="align-itmes-center flex-column">
              <div className="mt-2">
                <span className="fw-bold">피드 업로드</span>
              </div>
              <hr className="mt-3 mb-3" />

              <div>
                <div className="div2"></div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    fill="currentColor"
                    className="bi bi-images"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
                  </svg>
                </div>

                <div className="mt-3 mb-2">
                  <small>사진과 동영상을 올려보세요.</small>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="btn btn-primary"
                  >
                    사진 올리기
                  </button>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInput}
                    multiple
                    className="hiddenInput"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 ">
            <div className="align-items-center flex-column ">
              <div>
                <div className="d-flex justify-content-center">
                  <div className="col-1 mt-1 ms-3"></div>
                  <div className="col-7 ms-1 mt-2"></div>
                  <div className="col-4 mt-1  ">
                    <button type="submit" className="btn btn-primary">
                      업로드
                    </button>
                    <button className="btn btn-primary ms-1" onClick={onClose}>
                      닫기
                    </button>
                  </div>
                </div>
                <hr className="mt-1" />
              </div>
              <div>
                {images.length == 0 ? (
                  <div className="border rounded div2 d-flex justify-content-center align-items-center">
                    <span className="fw-bold textGray">IMAGE</span>
                  </div>
                ) : (
                  <div className="border rounded div2">
                    <Carousel className="p-1">
                      {imageGroups.map((group, groupIndex) => (
                        <Carousel.Item key={groupIndex}>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            {group.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Selected ${groupIndex * 5 + index}`}
                                className="d-block selectImage ms-2"
                              />
                            ))}
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                )}
              </div>

              <div className="mt-3">
                <textarea
                  rows="7"
                  className="w-100 textarea form-control"
                  placeholder="일상을 공유해보세요."
                  value={feedContent}
                  onChange={(e) => setFeedContent(e.target.value)}
                ></textarea>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="#일상 #음악"
                  className="w-100 form-control"
                  value={feedContentTag}
                  onChange={(e) => setFeedContentTag(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default SocialForm;
