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
  gap: 0.5rem;
  width: 300px;
`;

const BoardForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    notice: "",
    ownerId: 38, // 실제 로그인한 사용자 ID로 설정해야 함
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/boards", formData);
      console.log("생성된 게시판:", res.data);
      setMessage(`✅ 게시판 생성 성공! ❗게시판 ID: ${res.data.boardId}`);
    } catch (err) {
      console.error("❌ 게시판 생성 실패:", err.response?.data || err.message);
      setMessage("❌ 게시판 생성 실패!");
    }
  };

  return (
    <Main>
      <h2>게시판 생성</h2>
      <StyledForm onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="게시판 제목"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="게시판 설명"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="notice"
          placeholder="공지사항"
          value={formData.notice}
          onChange={handleChange}
          required
        />
        <button type="submit">생성하기</button>
      </StyledForm>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </Main>
  );
};

export default BoardForm;
