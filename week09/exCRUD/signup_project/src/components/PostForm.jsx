import React, { useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
`;

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;
`;

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    anonymous: false,
    writerId: 38,
    boardId: 48,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //res 로 post 보내기
      console.log("전송 직전 데이터:", formData);
      const res = await axiosInstance.post("/posts", formData);
      setMessage("✅글이 등록되었습니다.");
      console.log(res.data);
    } catch (err) {
      setMessage("❌ 글 작성에 실패하였습니다!");
      console.error(err);
    }
  };

  return (
    <Main>
      <h2>게시글 작성</h2>
      <StyledForm onSubmit={handleSubmit}>
        <label style={{ width: "100%" }}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
          />
        </label>
        <label style={{ width: "100%" }}>
          <textarea
            style={{ height: "15rem" }}
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            required
          />
        </label>
        <SubmitContainer>
          <label>
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  anonymous: e.target.checked,
                }))
              }
            />
            익명
          </label>
          <label>
            <button type="submit">글 등록</button>
          </label>
        </SubmitContainer>
      </StyledForm>

      {message && (
        <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
      )}
    </Main>
  );
};

export default PostForm;
